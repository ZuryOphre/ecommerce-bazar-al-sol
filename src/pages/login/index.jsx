import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import './index.css'; // Importa los estilos personalizados
import '@/app/globals.css';
import Login from '@/components/login';
import SignUp from '@/components/signUp';
import Header from '@/components/header';

const LoginPage = () => {
    const [mostrarComponente1, setMostrarComponente1] = useState(true);

    const alternarComponente = () => {
        setMostrarComponente1(!mostrarComponente1);
    };

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

    return (
        <>
        <Header />
        <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-80 flex items-center justify-between p-2 bg-white rounded shadow">
                <label className="font-bold text-gray-700 text-sm">Iniciar Sesion</label>
                <Toggle 
                    defaultChecked={mostrarComponente1} 
                    icons={false} 
                    onChange={alternarComponente} 
                />
                <label className="font-bold text-gray-700 text-sm">Crear Cuenta</label>
            </div>
            <motion.div
                className="w-64"
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5 }}
            >
                {mostrarComponente1 ? <SignUp /> : <Login />}
            </motion.div>
        </div>
        </>
    );
};

export default LoginPage;