'use client';

import React, { useEffect, useState } from 'react';
import { app } from '@/config/firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { motion } from 'framer-motion';
import Image from 'next/image';

const flipTransition = { type: "spring", stiffness: 400, damping: 20 };
const flipVariants = {
  flipped: { rotateY: 180 },
  unflipped: { rotateY: 0 },
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

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
              isFlipped: false,
            });
          });
          const selectedProducts = productsData.slice(0, 4);
          setProducts(selectedProducts);
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleFlip = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, isFlipped: !product.isFlipped } : product
    ));
  };

  return (
    <div className="flex justify-center">
      {products.map((product, index) => (
        <div className="w-64 h-64 m-2">
          <motion.div
            key={product.id}
            className={`w-full h-full bg-white rounded-lg shadow-md p-2 flex flex-col justify-center items-center`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={product.isFlipped ? 'flipped' : 'unflipped'}
            variants={flipVariants}
            transition={flipTransition}
            onClick={() => handleFlip(product.id)}
          >
            {!product.isFlipped ? (
              <>
                <div className="mb-4 flex justify-center items-center relative w-full h-64">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <h2 className="text-gray-600 text-xl font-bold">{product.name}</h2>
              </>
            ) : (
              <motion.div
                animate={product.isFlipped ? 'flipped' : 'unflipped'}
                variants={flipVariants}
                transition={flipTransition}
              >
                <h2 className="text-gray-600 text-xl font-bold">{product.name}</h2>
                <p className="text-gray-500">{product.description}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;