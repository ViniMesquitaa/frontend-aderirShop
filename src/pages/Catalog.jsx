import SubHeader from "../components/SubHeader";
import Carrossel from "../components/Carrossel";

const sabaoProducts = [
  {
    id: 1,
    name: "Sabão em Pó Omo",
    description: "Sabão em pó para roupas brancas e coloridas.",
    price: 19.99,
    stock: 50,
  },
  {
    id: 2,
    name: "Sabão Líquido Ariel",
    description: "Sabão líquido concentrado para roupas delicadas.",
    price: 24.99,
    stock: 30,
  },{
      id: 1,
    name: "Sabão em Pó Omo",
    description: "Sabão em pó para roupas brancas e coloridas.",
    price: 19.99,
    stock: 50,
  }, {
    id: 2,
    name: "Sabão Líquido Ariel",
    description: "Sabão líquido concentrado para roupas delicadas.",
    price: 24.99,
    stock: 30,
  },  {
    id: 1,
    name: "Sabão em Pó Omo",
    description: "Sabão em pó para roupas brancas e coloridas.",
    price: 19.99,
    stock: 50,
  },
  {
    id: 2,
    name: "Sabão Líquido Ariel",
    description: "Sabão líquido concentrado para roupas delicadas.",
    price: 24.99,
    stock: 30,
  },{
      id: 1,
    name: "Sabão em Pó Omo",
    description: "Sabão em pó para roupas brancas e coloridas.",
    price: 19.99,
    stock: 50,
  }, {
    id: 2,
    name: "Sabão Líquido Ariel",
    description: "Sabão líquido concentrado para roupas delicadas.",
    price: 24.99,
    stock: 30,
  },
]

const Catalog = () => {
  return (
    <div className=" mx-auto">
      <div className="items-center bg-white shadow-md rounded-lg mb-6">
        <SubHeader />
      </div>
   
      <div className="mx-auto max-w-7xl  overflow-x-hidden ">
        <h2 className="text-2xl font-bold text-gray-800">Sabão</h2>
        <Carrossel products={sabaoProducts} />
      </div>

      <div className="mx-auto max-w-7xl  overflow-x-hidden">
        <Carrossel />
      </div>
      <div className="mx-auto max-w-7xl  overflow-x-hidden">
        <Carrossel />
      </div>
    </div>
  );
};

export default Catalog;
