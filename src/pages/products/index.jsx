'use client';

import React, { useEffect, useState } from "react";
import { app } from "@/config/firebase";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "@/app/globals.css";
import Image from "next/image";
import Header from "@/components/header";
import CustomAlert from "@/components/CustomAlert";
import { motion } from "framer-motion";            
import { FiX, FiShoppingCart } from "react-icons/fi";
import Cart from "@/components/cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const uid = process.env.NEXT_PUBLIC_FIREBASE_UID;
        const db = getDatabase(app);
        const firebaseRef = ref(db, `clientes/${uid}/products`);
        onValue(firebaseRef, (snapshot) => {
          const productsData = [];
          snapshot.forEach((childSnapshot) => {
            productsData.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          setProducts(productsData);
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const uid = process.env.NEXT_PUBLIC_FIREBASE_UID;
        const db = getDatabase(app);
        const categoriesRef = ref(db, `clientes/${uid}/category`);
        onValue(categoriesRef, (snapshot) => {
          const categoriesData = [];
          snapshot.forEach((childSnapshot) => {
            categoriesData.push(childSnapshot.val().name);
          });
          setCategories(categoriesData);
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();

    // Suscripción a los cambios en el estado de autenticación
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setCart([]);
      }
    });

    // Desuscribirse cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(null);
  };

  const addToCart = () => {
    if (selectedProduct) {
      const updatedCart = [...cart, { id: selectedProduct.id, ...selectedProduct }];
      setCart(updatedCart);
      console.log("Producto agregado al carrito:", selectedProduct);

      // Actualiza el carrito en la base de datos
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getDatabase(app);
        const cartRef = ref(db, `clientes/usuarios/${user.uid}/carrito`);
        push(cartRef, { id: selectedProduct.id, ...selectedProduct }).then(() => {
          console.log("Producto agregado a la base de datos en tiempo real");
        }).catch((error) => {
          console.error("Error al agregar el producto a la base de datos en tiempo real:", error);
        });
      } else {
        setAlertMessage("Por favor, inicia sesión o crea tu cuenta para agregar productos al carrito.");
        setShowAlert(true);
      }
    }
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || product.category === selectedCategory)
  );

  return (
    <>
      <Header />
      <div className="flex justify-center mt-20">
        <div className="w-full max-w-lg">
          <input
            type="search"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center flex-wrap">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="w-1/4 h-64 bg-white rounded-lg shadow-md p-2 m-2 flex flex-col cursor-pointer relative"
            onClick={() => handleProductClick(product)}
          >
            <div className="mb-4 flex justify-center items-center relative w-full h-64">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="text-gray-600 text-xl font-bold text-center">
              {product.name}
            </h2>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-4 max-w-md relative mt-20 z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
          >
            <button
              className="absolute top-2 right-2"
              onClick={closeModal}
            >
              <FiX />
            </button>
            <h2 className="text-gray-800 text-xl font-bold mb-2">
              {selectedProduct.name}
            </h2>
            <Image
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              width={300}
              height={300}
              className="rounded-lg"
            />
            <p className="text-gray-700 mt-2">{selectedProduct.description}</p>
            <p className="text-gray-700">Precio: {selectedProduct.price}</p>
            <p className="text-gray-700">
              Cantidad disponible: {selectedProduct.quantity}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={addToCart}
            >
              <FiShoppingCart className="inline-block mr-2" />
              Agregar al carrito
            </button>
          </motion.div>
        </motion.div>
      )}
      {user && <Cart products={cart} />} {/* Renderiza el carrito solo si el usuario está autenticado */}
      {showAlert && <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
    </>
  );
};

export default Products;
