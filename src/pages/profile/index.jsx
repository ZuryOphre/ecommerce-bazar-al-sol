import React, { useState, useEffect } from 'react';
import { database, authentication } from '@/config/firebase';
import { ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import '@/app/globals.css';
import Header from '@/components/header';

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Escuchar los cambios en el estado de autenticación del usuario
        const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
            if (currentUser) {
                // Obtener los datos del usuario desde Realtime Database
                const userRef = ref(database, `clientes/usuarios/${currentUser.uid}`);
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        const userKey = Object.keys(userData)[0]; // Obtener la primera clave
                        setUser(userData[userKey]);
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        });

        return () => {
            // Cancelar la suscripción al listener de autenticación
            unsubscribe();
        };
    }, []);

    return (
        <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 space-y-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center">Perfil</h1>
                {user && (
                    <div>
                        <p className="text-lg font-semibold">Nombre: {user.nombre}</p>
                        <p className="text-lg font-semibold">Email: {user.email}</p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default ProfilePage;
