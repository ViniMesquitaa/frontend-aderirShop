import { FiFilter } from "react-icons/fi";

const OrderByUI = () => {
  return (
    <div className="flex items-center justify-center w-full sm:w-auto">
      <div className="relative w-full sm:w-60">
        <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900" size={20} />

        <select
          id="orderBy"
          name="orderBy"
          className="w-full rounded-2xl border-1 border-gray-300 bg-white py-2 pl-10 pr-3 shadow-sm focus:border-blue-800 focus:outline-none   transition-all text-[15px] font-medium"
        >
          <option value="filtrar_produtos">Todos</option>
          <option value="sabao">Sabão</option>
          <option value="detergente">Detergente</option>
          <option value="amaciante">Amaciante</option>
          <option value="desinfetante">Desinfetante</option>
          <option value="alvejante">Alvejante</option>
        </select>
      </div>
    </div>
  );
};

export default OrderByUI;
