const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">MW Sabão</h3>
            <p className="text-gray-600">
              Sabões artesanais feitos com carinho para cuidar da sua casa e da natureza.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Produtos</h4>
            <ul className="space-y-2">
         
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Sabão Líquido</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Alvejante</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Desinfetante</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Informações</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Como Comprar</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Entrega e Frete</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Perguntas Frequentes</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">contato@mwsabao.com</li>
              <li className="text-gray-600">(31) 90000-0000</li>
              <li className="text-gray-600">Fortaleza - CE</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} MW Sabão. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
