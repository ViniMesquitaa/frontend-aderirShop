import { useNavigate } from "react-router-dom";

const Header = ({ onCartClick, cartItemCount, cartVisible = true }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <header className="bg-gradient-to-r from-[#0d5f8f] to-[#05122e] p-5 md:p-10 shadow-md relative z-40">
        <div className="flex flex-row items-center justify-between mx-auto max-w-7xl gap-4">
          <div className="flex items-center justify-between w-full md:w-auto cursor-pointer">
            <div className="group relative inline-block">
              <button onClick={() => navigate("/")}>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#ededf0] cursor-pointer">
                  MW SABÃO
                </h1>
              </button>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#ffffff] to-[#a9aaaf] transition-all duration-500 group-hover:w-full"></span>
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <button 
              onClick={() => navigate("/profile-user")} 
              className="cursor-pointer"
            >
              <img
                src="do-utilizador.png"
                alt="Perfil"
                className="w-12 lg:w-8 pointer-events-none"
              />
            </button>

            {cartVisible && (
              <button 
                onClick={onCartClick} 
                className="relative cursor-pointer"
              >
                <img
                  src="carrinho-de-compras.png"
                  alt="Carrinho"
                  className="w-12 lg:w-8 pointer-events-none"
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;