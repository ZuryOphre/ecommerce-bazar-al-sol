'use client';

// Cart.jsx

import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { getDatabase, ref, onValue, remove, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authentication, database } from "@/config/firebase";

const Cart = ({ products }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      setUser(user);
      if (user) {
        const cartRef = ref(database, `clientes/usuarios/${user.uid}/carrito`);
        onValue(cartRef, (snapshot) => {
          const cartData = [];
          snapshot.forEach((childSnapshot) => {
            cartData.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          setCartProducts(cartData);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const totalPriceValue = cartProducts.reduce((total, product) => total + parseFloat(product.price), 0);
    setTotalPrice(totalPriceValue);
  }, [cartProducts]);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const removeFromCartByName = async (productName) => {
    try {
      const user = authentication.currentUser;
      if (user) {
        const cartRef = ref(database, `clientes/usuarios/${user.uid}/carrito`);
        onValue(cartRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().name === productName) {
              const productRef = ref(database, `clientes/usuarios/${user.uid}/carrito/${childSnapshot.key}`);
              remove(productRef);
            }
          });
        });
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error);
      setErrorMessage("Error deleting product from cart. Please try again later.");
    }
  };

  const handlePay = async () => {
    const cartItems = cartProducts.map(product => ({
      id: product.id,
      title: product.name,
      quantity: 1,
      unit_price: product.price,
    }));
    const totalAmount = totalPrice;

    try {
      const response = await fetch('/api/mercadopago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, totalAmount }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.preferenceUrl) {
        window.location.href = data.preferenceUrl; // Redirigir a Mercado Pago checkout
      } else {
        console.error('Error creating payment preference');
        setErrorMessage("Error processing payment. Please try again later.");
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrorMessage("Error processing payment. Please try again later.");
    }
  };

  return (
    <div className={`fixed bottom-0 right-0 w-1/4 ${isMinimized ? 'h-12' : 'h-3/4'} bg-white border-l border-gray-200 overflow-y-auto transition-all duration-500`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <h2 className="text-gray-800 text-xl font-bold">Carrito de Compras</h2>
          <div className="ml-2 relative">
            <FiShoppingCart className="text-xl cursor-pointer" onClick={handleMinimize} />
            {cartProducts.length > 0 && (
              <span className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-3 h-3 flex justify-center items-center text-xs">
                {cartProducts.length}
              </span>
            )}
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none text-lg" onClick={handleMinimize}>
          {isMinimized ? '+' : '-'}
        </button>
      </div>
      {!isMinimized && (
        <div className="p-4">
          {cartProducts.map(product => (
            <div key={product.id} className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-800 font-bold">{product.name}</h3>
                <button onClick={() => removeFromCartByName(product.name)}><FiTrash2 className="text-red-600" /></button>
              </div>
              <p className="text-gray-600">Precio: {product.price}</p>
            </div>
          ))}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h3 className="text-gray-800 font-bold">Total</h3>
            <p className="text-gray-600">Precio Total: {totalPrice}</p>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none font-bold rounded-lg px-4 py-2 mt-4" onClick={handlePay}>Pagar con Mercado Pago</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
