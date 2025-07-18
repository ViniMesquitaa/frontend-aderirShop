import { FiX, FiShoppingBag, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useEffect } from "react";

const CART_KEY = 'mw_sabao_cart';

const CartSide = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
}) => {
  // Persistir carrinho no localStorage sempre que houver mudanças
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } else {
      localStorage.removeItem(CART_KEY);
    }
  }, [cartItems]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    if (window.confirm("Tem certeza que deseja esvaziar o carrinho?")) {
      clearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden transition-all duration-300 ease-in-out">
      <div
        className="absolute inset-0 bg-black/50 bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex transform transition-transform duration-300 ease-in-out">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-[#0d5f8f] to-[#05122e]">
              <div className="flex items-center">
                <FiShoppingBag className="text-white mr-2" size={20} />
                <h2 className="text-xl font-semibold text-white">
                  Seu Carrinho ({cartItems.length})
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                {cartItems.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="p-2 rounded-full hover:bg-white/10 text-white hover:text-white transition-colors cursor-pointer"
                    title="Esvaziar carrinho"
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-white/10 text-white hover:text-white transition-colors cursor-pointer"
                  onClick={onClose}
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 py-2 overflow-y-auto px-4 sm:px-6">
              {cartItems.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex group">
                      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80?text=Produto';
                          }}
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                              {item.category}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex-1 flex items-end justify-between mt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className={`px-2 py-1 text-gray-600 hover:bg-gray-50 cursor-pointer ${
                                item.quantity <= 1
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:text-[#0d5f8f]"
                              }`}
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="px-3 text-sm text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="px-2 py-1 text-gray-600 hover:text-[#0d5f8f] hover:bg-gray-50 cursor-pointer"
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>

                          <button
                            type="button"
                            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <FiShoppingBag className="text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500 text-lg font-medium">
                    Seu carrinho está vazio
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Adicione itens para continuar
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2 bg-gradient-to-r from-[#0d5f8f] to-[#05122e] text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Continuar comprando
                  </button>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 py-6 px-4 sm:px-6 bg-gray-50">
                <div className="flex justify-between text-lg font-medium text-gray-900 mb-2">
                  <p>Subtotal</p>
                  <p>R$ {subtotal.toFixed(2)}</p>
                </div>
                <p className="text-sm text-green-600 mb-6 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Frete Grátis
                </p>
                <div className="mt-4">
                  <button className="w-full bg-gradient-to-r from-[#0d5f8f] to-[#05122e] hover:opacity-90 text-white py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center font-medium cursor-pointer">
                    Finalizar compra
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <button
                    onClick={onClose}
                    className="text-[#0d5f8f] hover:text-[#051f2edc] text-sm font-medium transition-colors cursor-pointer"
                  >
                    ou continuar comprando
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSide;