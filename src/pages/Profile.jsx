import React, { useEffect, useState } from "react";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt
} from "react-icons/fa";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("customerData");
    if (storedData) {
      const customerData = JSON.parse(storedData);
      setCustomer(customerData);
      setEditedCustomer({...customerData});
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer(prev => ({
      ...prev,
      [name]: value,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleSave = () => {
    setCustomer(editedCustomer);
    localStorage.setItem("customerData", JSON.stringify(editedCustomer));
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedCustomer({...customer});
    setEditMode(false);
  };

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <p className="text-gray-600 text-lg">Nenhum dado encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all hover:shadow-3xl">
        <div className="flex justify-between items-start">
          <div className="pt-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {editMode ? (
                <input
                  type="text"
                  name="fullName"
                  value={editedCustomer.fullName}
                  onChange={handleInputChange}
                  className="border-b-2 border-blue-500 focus:outline-none"
                />
              ) : (
                customer.fullName
              )}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Cliente cadastrado(a)</p>
          </div>
          <div className="flex space-x-2">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 text-green-500 hover:text-green-700 transition-colors"
                  title="Salvar"
                >
                  <FaSave size={18} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  title="Cancelar"
                >
                  <FaTimes size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                title="Editar"
              >
                <FaEdit size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4 text-gray-700">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FaPhone className="text-blue-500 flex-shrink-0" />
            {editMode ? (
              <input
                type="text"
                name="phoneNumber"
                value={editedCustomer.phoneNumber}
                onChange={handleInputChange}
                className="flex-grow border-b-2 border-blue-500 focus:outline-none bg-transparent"
              />
            ) : (
              <span>{customer.phoneNumber}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
            {editMode ? (
              <input
                type="text"
                name="cep"
                value={editedCustomer.address?.cep || ''}
                onChange={handleInputChange}
                className="flex-grow border-b-2 border-blue-500 focus:outline-none bg-transparent"
                placeholder="CEP"
              />
            ) : (
              <span>CEP: {customer.address?.cep || 'Não informado'}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FaHome className="text-blue-500 flex-shrink-0" />
            {editMode ? (
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  name="street"
                  value={editedCustomer.address?.street || ''}
                  onChange={handleInputChange}
                  className="border-b-2 border-blue-500 focus:outline-none bg-transparent mb-2"
                  placeholder="Rua"
                />
                <input
                  type="text"
                  name="number"
                  value={editedCustomer.address?.number || ''}
                  onChange={handleInputChange}
                  className="border-b-2 border-blue-500 focus:outline-none bg-transparent"
                  placeholder="Número"
                />
              </div>
            ) : (
              <span>
                {customer.address?.street || 'Rua não informada'}, {customer.address?.number || 's/n'}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
            <FaBuilding className="text-blue-500 flex-shrink-0" />
            {editMode ? (
              <input
                type="text"
                name="city"
                value={editedCustomer.address?.city || ''}
                onChange={handleInputChange}
                className="flex-grow border-b-2 border-blue-500 focus:outline-none bg-transparent"
                placeholder="Cidade"
              />
            ) : (
              <span>{customer.address?.city || 'Cidade não informada'}</span>
            )}
          </div>
          
          {(customer.address?.complement || editMode) && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-500 font-bold">+</span>
              {editMode ? (
                <input
                  type="text"
                  name="complement"
                  value={editedCustomer.address?.complement || ''}
                  onChange={handleInputChange}
                  className="flex-grow border-b-2 border-blue-500 focus:outline-none bg-transparent"
                  placeholder="Complemento"
                />
              ) : (
                <span>Complemento: {customer.address.complement}</span>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              localStorage.removeItem("customerData");
              window.location.reload();
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full shadow-md transition-all hover:shadow-lg cursor-pointer"
          >
            <FaSignOutAlt />
            <span >Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;