import SearchUI from "../components/SearchUI";
import OrderByUI from "../components/OrderByUI";

const SubHeader = () => {
  return (
    <div className="bg-white py-3 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto gap-4">
        
        {/* Título e descrição */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-wide">
            Todos os produtos
          </h1>
          
        </div>

        {/* Filtros e busca */}
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 sm:gap-4">
          <SearchUI />
          <OrderByUI />
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
