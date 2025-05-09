const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#127ee4] to-blue-900 p-4 md:p-8 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        <div className="flex items-center justify-between w-full md:w-auto cursor-pointer">
          <h1 className="relative inline-block group text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ffffff] to-[#d8d8d8] text-transparent bg-clip-text tracking-wide drop-shadow-sm">
            MW SABÃO
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
          </h1>

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

        <div className="relative w-full md:w-64 lg:w-80 xl:w-96">
          <input
            type="text"
            placeholder="Pesquisar produto..."
            className="w-full pl-12 pr-4 py-2 rounded-full bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <img
            src="lupa.png"
            alt="ícone de pesquisa"
            className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2"
          />
        </div>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <img
            src="do-utilizador.png"
            alt=""
            className="w-7 lg:w-8 cursor-pointer"
          />
          <img
            src="carrinho-de-compras.png"
            alt=""
            className="w-7 lg:w-8 cursor-pointer"
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
