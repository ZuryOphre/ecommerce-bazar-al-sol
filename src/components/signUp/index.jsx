// SignUp.js
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ref, push } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { database, authentication } from "@/config/firebase";
import CustomAlert from "@/components/customAlert";

const SignUp = () => {
  const auth = authentication;
  const router = useRouter(); // Obtener el router de Next.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Crear una entrada en la base de datos para el usuario
      const userRef = ref(database, `clientes/usuarios/${user.uid}`);
      push(userRef, {
        nombre: firstName,
        email: email,
      });

      // Mostrar mensaje de éxito
      setSuccessMessage("Registro exitoso. ¡Bienvenido!");

      // Redirigir al usuario a la página de productos
      router.push("/products");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Crear una entrada en la base de datos para el usuario
      const userRef = ref(database, `clientes/usuarios/${user.uid}`);
      push(userRef, {
        nombre: user.displayName,
        email: user.email,
      });

      // Mostrar mensaje de éxito
      setSuccessMessage("Registro exitoso. ¡Bienvenido!");

      // Redirigir al usuario a la página de productos
      router.push("/products");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const closeAlert = () => {
    setSuccessMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-1">
      {successMessage && (
        <CustomAlert message={successMessage} onClose={closeAlert} />
      )}
      <h2 className="mb-8 text-3xl font-bold text-gray-700">Crear cuenta</h2>
      <form className="w-64" onSubmit={handleSignUp}>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
            Nombre:
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Contraseña:
          </label>
          <input
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Crear cuenta
        </button>
      </form>
      <button
        className="w-64 px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
        onClick={handleGoogleSignUp}
      >
        Registrarse con Google
      </button>
    </div>
  );
};

export default SignUp;
