import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import {
  FiCheckCircle, FiShoppingBag, FiCreditCard, FiTruck,
  FiCopy, FiX
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';



const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [pickup, setPickup] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixKey] = useState(generateRandomPixKey());

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  function generateRandomPixKey() {
    const types = ['cpf', 'email', 'phone', 'random'];
    const type = types[Math.floor(Math.random() * types.length)];
    switch (type) {
      case 'cpf':
        return '***.' + Math.floor(100 + Math.random() * 900) + '.' +
          Math.floor(100 + Math.random() * 900) + '-**';
      case 'email':
        return 'pix@loja' + Math.floor(10 + Math.random() * 90) + '.com.br';
      case 'phone':
        return '+55 (' + Math.floor(10 + Math.random() * 90) + ') ' +
          Math.floor(90000 + Math.random() * 10000) + '-' +
          Math.floor(1000 + Math.random() * 9000);
      default:
        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'pix') {
      setShowPixModal(true);
      return;
    }
    finalizeOrder();
  };

  const finalizeOrder = () => {
    const orderData = {
      itens: cartItems,
      total: totalPrice,
      metodoPagamento: paymentMethod,
      retiradaNaLoja: pickup,
    };
    console.log('Pedido realizado:', orderData);
    setIsCompleted(true);
    clearCart();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey);
  };

  if (isCompleted) {
    return (
      <div className="max-w-md mx-auto p-10 text-center bg-white rounded-xl shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-50 rounded-full">
            <FiCheckCircle className="text-green-500" size={48} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Compra Finalizada!</h2>
        <p className="text-gray-600 mb-8 text-lg">Seu pedido foi registrado com sucesso.</p>
        <div className="space-y-4">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:opacity-90 transition-all duration-300 font-medium shadow-md"
          >
            Voltar à loja
          </button>
          <button
            onClick={() => window.location.href = '/order-tracking'}
            className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium"
          >
            Acompanhar pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      {/* Modal Pix */}
      {showPixModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Pagamento via Pix</h3>
              <button onClick={() => setShowPixModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">Escaneie o QR Code ou copie a chave Pix</p>
              <div className="mx-auto bg-gray-200 p-4 rounded-lg inline-block mb-4">
                <div className="grid grid-cols-10 gap-1 w-48 h-48">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-full h-full rounded-sm ${Math.random() > 0.3 ? 'bg-black' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="font-medium text-gray-800 mb-2">Chave Pix:</p>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 break-all">{pixKey}</p>
                  <button onClick={copyToClipboard} className="ml-2 text-blue-600 hover:text-blue-800" title="Copiar chave">
                    <FiCopy size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">Valor: <span className="font-bold">R$ {totalPrice.toFixed(2)}</span></p>
              <p className="text-sm text-gray-500">Após o pagamento, clique abaixo para confirmar.</p>
            </div>
            <div className="flex justify-between space-x-4">
              <button onClick={() => setShowPixModal(false)} className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Voltar
              </button>
              <button
                onClick={() => {
                  setShowPixModal(false);
                  finalizeOrder();
                  navigate('/order-tracking');
                }}
                className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-800 cursor-pointer text-white rounded-lg hover:opacity-90"
              >
                Já paguei
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Título */}
      <h2 className="text-3xl font-bold md:text-start text-center text-gray-800 mb-8">
        Finalizar Compra
      </h2>

      {/* Carrinho vazio */}
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <FiShoppingBag className="text-gray-400" size={36} />
          </div>
          <p className="text-gray-500 text-xl mb-6">Seu carrinho está vazio.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Continuar comprando
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resumo do Pedido */}
          <div className="lg:col-span-2 bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl text-center font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200">
              Resumo do Pedido
            </h3>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-5 flex justify-between items-center hover:bg-gray-100/50 transition-colors gap-10 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 mr-5 bg-white">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500 mt-1">Quantidade: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-800">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Frete</span>
                <span className="text-green-600 font-medium">Grátis</span>
              </div>
              <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-black">R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Pagamento */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                  <FiCreditCard className="mr-3 text-blue-900" size={20} />
                  Método de Pagamento
                </h3>
                <div className="space-y-4">
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'pix' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={paymentMethod === 'pix'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Pix</p>
                      <p className="text-sm text-gray-500 mt-1">Pagamento instantâneo</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'cartao' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cartao"
                      checked={paymentMethod === 'cartao'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Cartão de Crédito/Débito</p>
                      <p className="text-sm text-gray-500 mt-1">Parcelamento em até 12x</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'dinheiro' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="dinheiro"
                      checked={paymentMethod === 'dinheiro'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Dinheiro</p>
                      <p className="text-sm text-gray-500 mt-1">Pagamento na entrega/retirada</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Entrega */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                  <FiTruck className="mr-3 text-blue-600" size={20} />
                  Opção de Entrega
                </h3>
                <div className="space-y-4">
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${pickup === true ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input
                      type="radio"
                      name="pickup"
                      checked={pickup === true}
                      onChange={() => setPickup(true)}
                      className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Retirar na Loja</p>
                      <p className="text-sm text-gray-500 mt-1">Pronto em instantes</p>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${pickup === false ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input
                      type="radio"
                      name="pickup"
                      checked={pickup === false}
                      onChange={() => setPickup(false)}
                      className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Entrega em Casa</p>
                      <p className="text-sm text-green-600 mt-1">Frete grátis</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0d5f8f] to-[#05122e] text-white py-4 rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 font-bold text-lg flex items-center justify-center cursor-pointer"
              >
                Confirmar Pedido
                <FiCheckCircle className="ml-3" size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
