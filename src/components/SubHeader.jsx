import SearchUI from "../components/SearchUI";
import OrderByUI from "../components/OrderByUI";

const SubHeader = () => {
  return (
    <div className="bg-white  py-3 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto gap-4">
       
        <div className="ml-1">
          <h2 className="text-xl font-medium bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">
            Seja bem vindo!
          </h2>
          <p className="font-light bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text">Venha e confira os melhores produtos com os melhores preços.</p>
        </div>

  
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 sm:gap-4">
          <SearchUI />
          <OrderByUI />
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
