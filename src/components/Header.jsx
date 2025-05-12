import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-to-r from-[#127ee4] to-blue-900 p-4 md:p-8 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        <div className="flex items-center justify-between w-full md:w-auto cursor-pointer">
          <button onClick={() => navigate("/catalog")}>
            <h1 className="relative inline-block group text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ffffff] to-[#d8d8d8] text-transparent bg-clip-text tracking-wide drop-shadow-sm cursor-pointer">
              MW SABÃO
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
            </h1>
          </button>

          <nav className="flex items-center space-x-4 md:hidden">
            <img
              src="do-utilizador.png"
              alt=""
              className="w-6 cursor-pointer"
            />
            <img
              src="carrinho-de-compras.png"
              alt=""
              className="w-6 cursor-pointer"
            />
          </nav>
        </div>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <button onClick={() => navigate("/profile-user")}>
            <img
              src="do-utilizador.png"
              alt=""
              className="w-7 lg:w-8 cursor-pointer"
            />
          </button>

          <button>
            <img
              src="carrinho-de-compras.png"
              alt=""
              className="w-7 lg:w-8 cursor-pointer"
            />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
