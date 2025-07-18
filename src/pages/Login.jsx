import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import InputPasswordUI from "../components/InputPasswordUI";
import InputUI from "../components/InputUI";

const Login = () => {
  const [formData] = useState({
    username: "",
    password: "",
  });

  const [setErrors] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = { phone: "", password: "" };

    const rawPhone = formData.phone.replace(/\D/g, "");

    if (rawPhone.length !== 11) {
      newErrors.phone = "Telefone deve ter 11 dígitos";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("Login realizado com:", formData);
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login com ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50  p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all hover:shadow-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Bem-vindo de volta
          </h1>
          <p className="text-gray-600 mt-2">Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <div>
              <InputUI
                nameLabel={"Nome de Usuario"}
                placeHolder={"Digite seu nome de usuário"}
              />
            </div>
          </div>

          <div className="mb-1">
            <InputPasswordUI label={"Senha"} placeholder={"Digite sua senha"} />
          </div>

          <div className="flex justify-end mb-6">
            <a
              href="#forgot-password"
              className="text-sm text-blue-900 hover:text-blue-900 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-gradient-to-r from-[#127ee4] to-blue-900 hover:opacity-90 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-800 focus:ring-opacity-50 transition-all ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">ou</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="grid mb-6 w-full">
          <button
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center py-2  border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all cursor-pointer"
          >
            <FaGoogle className="mr-2 text-red-700" /> Google
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <button onClick={() => navigate("/register")} className="cursor-pointer">
            <p className="text-blue-800 hover:text-blue-900 hover:underline font-medium">
              Cadastre-se
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
