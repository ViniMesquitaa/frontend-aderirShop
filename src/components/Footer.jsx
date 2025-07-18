const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0d5f8f] to-[#05122e] py-8 h-full ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">MW Sabão</h3>
            <p className="text-white">
              Sabões artesanais feitos com carinho para cuidar da sua casa e da natureza.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Produtos</h4>
            <ul className="space-y-2">
         
              <li><a href="#" className="text-white hover:underline">Sabão Líquido</a></li>
              <li><a href="#" className="text-white hover:underline">Alvejante</a></li>
              <li><a href="#" className="text-white hover:underline">Desinfetante</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Informações</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:underline">Como Comprar</a></li>
              <li><a href="#" className="text-white hover:underline">Entrega e Frete</a></li>
              <li><a href="#" className="text-white hover:underline">Perguntas Frequentes</a></li>
              <li><a href="#" className="text-white hover:underline">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-white">contato@mwsabao.com</li>
              <li className="text-white">(31) 90000-0000</li>
              <li className="text-white">Fortaleza - CE</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-white">
          <p>© {new Date().getFullYear()} MW Sabão. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
