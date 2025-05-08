const PreHeader = () => {
    return (
       <div className="bg-[#122d4d] h-[50px] md:h-[35px] flex items-center px-4 md:px-8 justify-between text-white flex-col md:flex-row">
        <h1 className=" font-light">Bem vindo a MWSABÃO SHOP</h1>

        <div className="flex items-center gap-3 ">
          <img src="entrega-rapida.png" className="w-8" alt="" />
          <p className="text-[#63b458]">Frete Grátis</p>
        </div>
      </div>
    )
}

export default PreHeader;