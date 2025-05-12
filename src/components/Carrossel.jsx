/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Carrossel = ({ products = []}) => {
  const [width, setWidth] = useState(0);
  const carrossel = useRef(null);

  useEffect(() => {
    if (carrossel.current) {
      const scrollWidth = carrossel.current.scrollWidth;
      const offsetWidth = carrossel.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth);
    }
  }, [products]);

  return (
    <div className="w-full overflow-hidden px-4 md:px-0 py-8">
      <motion.div
        ref={carrossel}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: "grabbing" }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-shrink-0 bg-white shadow-md rounded-xl border border-gray-100 p-5 w-64 sm:w-72 md:w-80 lg:w-96"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            <p className="text-blue-600 font-bold mb-1">
              Preço: R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
            <p className="text-sm text-gray-500">
              Estoque: {product.stock} unidades
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Carrossel;
