/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Carrossel = ({ products = [], name, onAddToCart }) => {
  const [width, setWidth] = useState(0);
  const carrossel = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (carrossel.current) {
        const scrollWidth = carrossel.current.scrollWidth;
        const offsetWidth = carrossel.current.offsetWidth;
        setWidth(scrollWidth - offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [products]);

  return (
    <div className="w-full overflow-hidden relative bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 md:px-6 mb-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{name}</h1>
          
        </div>

        <motion.div
          ref={carrossel}
          className="flex gap-8 cursor-grab active:cursor-grabbing pb-4"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.05}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 group relative w-[280px] md:w-[320px]"
              whileHover={!isDragging ? { y: -8, scale: 1.02 } : {}}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    draggable="false"
                  />
                  {product.discount && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-gray-900 font-bold text-xl">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#0d5f8f] to-[#05122e] text-white hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
                      onClick={() => onAddToCart(product)}
                      aria-label={`Adicionar ${product.name} ao carrinho`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {products.length > 4 && (
          <p className="text-center text-black mt-6 text-sm">
            Arraste para o lado →
          </p>
        )}
      </div>
    </div>
  );
};

function formatPrice(price) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export default Carrossel;
