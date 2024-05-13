'use client';

import React, { useEffect, useState } from 'react';
import { app } from '@/config/firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SlideInfoR = () => {
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
            });
          });
          const shuffledProducts = productsData.sort(() => 0.5 - Math.random());
          const selectedProducts = shuffledProducts.slice(0, 5);
          setProducts(selectedProducts);
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex justify-center">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          className="w-64 h-64 bg-white rounded-lg shadow-md p-2 m-2 flex flex-col"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ x: 0, opacity: 3 }}
          initial={{ x: 200, opacity: 0 }}
          transition={{ delay: 1 + index * 0.5 }}
        >
          <div className="mb-4 flex justify-center items-center relative w-full h-64">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2 className="text-gray-600 text-xl font-bold text-center">{product.name}</h2>
        </motion.div>
      ))}
    </div>
  );
};

export default SlideInfoR;