import { useNavigate } from "react-router-dom";

const NotFoundData = () => {
  const navigate = useNavigate();
    
    return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
        <div className="text-center space-y-3">
       
          <h2 className="text-2xl font-bold text-gray-800">Nenhum dado encontrado</h2>
          <p className="text-gray-500">Você precisa estar logado para acessar esta página.</p>
        </div>

        <div className="w-full space-y-4">
          <button
            className="group relative w-full bg-gradient-to-r from-[#127ee4] to-blue-900 text-white font-medium px-6 hover:opacity-90 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer" onClick={() => navigate("/login")}
          >
            <span className="flex items-center justify-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Faça seu Login agora!</span>
            </span>
           
          </button>

          <p className="text-gray-500 text-sm">
            Caso não possua login,{" "}
            <button  onClick={() => navigate("/register")} className="text-blue-00 hover:underline text-blue-600 font-medium cursor-pointer">
              cadastre aqui
            </button>
          </p>
        </div>
      </div>
    </div>
    );
}

export default NotFoundData;