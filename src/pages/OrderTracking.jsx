import React from 'react';
import {
  FiShoppingBag,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiCreditCard,
  FiArrowLeft
} from 'react-icons/fi';

const OrderTracking = () => {
  // Exemplo de pedidos mockados
  const orders = [
    {
      id: 10123,
      date: '18/07/2025',
      status: 'processing', // 'processing' | 'completed' | 'shipped'
      pickup: false,
      shippingAddress: 'Rua das Flores, 123 - Centro, Cidade/UF',
      shippingStatus: 'Saiu para entrega',
      paymentMethod: 'pix',
      paymentStatus: 'Aprovado',
      total: 45.00,
      items: [
        {
          id: 1,
          name: 'Sabão Líquido Omo 5L',
          price: 15.00,
          quantity: 2,
          img: 'https://cepel.vteximg.com.br/arquivos/ids/162938-410-410/sabonete-liquido-erva-doce-soft-plus.jpg?v=636317534993170000',
        },
        {
          id: 2,
          name: 'Amaciante Downy 2L',
          price: 15.00,
          quantity: 1,
          img: './sabaodopai.jpg',
        },
      ],
    },
  ];

  const renderStatus = (status) => {
    switch (status) {
      case 'processing':
        return (
          <div className="flex items-center text-yellow-600">
            <FiClock className="mr-2" />
            Em processamento
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center text-green-600">
            <FiCheckCircle className="mr-2" />
            Concluído
          </div>
        );
      case 'shipped':
        return (
          <div className="flex items-center text-blue-600">
            <FiTruck className="mr-2" />
            Enviado
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-600">
            <FiShoppingBag className="mr-2" />
            Recebido
          </div>
        );
    }
  };

  const renderPaymentMethod = (method) => {
    switch (method) {
      case 'pix':
        return 'Pix';
      case 'cartao':
        return 'Cartão';
      case 'dinheiro':
        return 'Dinheiro';
      default:
        return method;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
   

      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
       
        Meus Pedidos
      </h1>
      <p className="text-gray-600 mb-8">Acompanhe o status de seus pedidos recentes</p>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <div className="mx-auto bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <FiShoppingBag className="text-gray-400" size={36} />
          </div>
          <p className="text-gray-500 text-xl mb-6">Você ainda não fez nenhum pedido.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Ir para a loja
          </button>
        </div>
      ) : (
        <div className="space-y-6 mb-20">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold text-gray-800">Pedido #{order.id}</h2>
                    <p className="text-sm text-gray-500">Realizado em {order.date}</p>
                  </div>
                  <div className="flex items-center">
                    {renderStatus(order.status)}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="p-6">
                  <h3 className="font-medium text-gray-700 mb-4">Itens</h3>
                  <ul className="space-y-4">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex items-center">
                        <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 mr-4">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} × R$ {item.price.toFixed(2)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Informações de Entrega */}
                <div className="p-6">
                  <h3 className="font-medium text-gray-700 mb-4 flex items-center">
                    <FiTruck className="mr-2" />
                    Entrega
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-800">
                      <span className="font-medium">Método:</span> {order.pickup ? 'Retirada na loja' : 'Entrega em casa'}
                    </p>
                    {!order.pickup && (
                      <p className="text-gray-800">
                        <span className="font-medium">Endereço:</span> {order.shippingAddress}
                      </p>
                    )}
                    <p className="text-gray-800">
                      <span className="font-medium">Status:</span> {order.shippingStatus || 'Aguardando envio'}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-medium text-gray-700 mb-4 flex items-center">
                    <FiCreditCard className="mr-2" />
                    Pagamento
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-800">
                      <span className="font-medium">Método:</span> {renderPaymentMethod(order.paymentMethod)}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium">Total:</span> R$ {order.total.toFixed(2)}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium">Status:</span> {order.paymentStatus || 'Aprovado'}
                    </p>
                    <p className="font-light text-green-600">
                       <span className="font-medium text-gray-800">Frete: </span> 
                       Frete Grátis
                    </p>
                  </div>
                </div>
              </div>

             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
