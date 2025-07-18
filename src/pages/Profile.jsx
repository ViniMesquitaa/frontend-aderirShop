import React, { useEffect, useState } from "react";
import NotFoundData from "../components/NotFoundData";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
  FaUser,
  FaIdCard,
  FaCity
} from "react-icons/fa";

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("customerData");
    if (storedData) {
      const customerData = JSON.parse(storedData);
      setCustomer(customerData);
      setEditedCustomer({ ...customerData });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({
      ...prev,
      [name]: value,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setCustomer(editedCustomer);
      localStorage.setItem("customerData", JSON.stringify(editedCustomer));
      setEditMode(false);
      setIsSubmitting(false);
    }, 800);
  };

  const handleCancel = () => {
    setEditedCustomer({ ...customer });
    setEditMode(false);
  };

  if (!customer) {
    return <NotFoundData />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:shadow-2xl">
        {/* Header Section */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <FaUser className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {editMode ? (
                  <input
                    type="text"
                    name="fullName"
                    value={editedCustomer.fullName}
                    onChange={handleInputChange}
                    className="border-b-2 border-blue-500 focus:outline-none bg-transparent w-full"
                  />
                ) : (
                  customer.fullName
                )}
              </h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <FaIdCard className="mr-1" />
                Cliente cadastrado(a)
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className={`p-2 rounded-full ${isSubmitting ? 'bg-green-200 text-green-700' : 'bg-green-100 text-green-600 hover:bg-green-200'} transition-colors`}
                  title="Salvar"
                >
                  <FaSave size={18} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  title="Cancelar"
                >
                  <FaTimes size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                title="Editar"
              >
                <FaEdit size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4">
          {/* Phone Number */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaPhone className="text-blue-600" />
            </div>
            <div className="flex-grow">
              {editMode ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedCustomer.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full border-b-2 border-blue-500 focus:outline-none bg-transparent py-1"
                  placeholder="Telefone"
                />
              ) : (
                <div>
                  <p className="text-xs text-gray-500">Telefone</p>
                  <p className="font-medium">{customer.phoneNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* CEP */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaMapMarkerAlt className="text-blue-600" />
            </div>
            <div className="flex-grow">
              {editMode ? (
                <input
                  type="text"
                  name="cep"
                  value={editedCustomer.address?.cep || ""}
                  onChange={handleInputChange}
                  className="w-full border-b-2 border-blue-500 focus:outline-none bg-transparent py-1"
                  placeholder="CEP"
                />
              ) : (
                <div>
                  <p className="text-xs text-gray-500">CEP</p>
                  <p className="font-medium">
                    {customer.address?.cep || "Não informado"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Street and Number */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaHome className="text-blue-600" />
            </div>
            <div className="flex-grow">
              {editMode ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="street"
                    value={editedCustomer.address?.street || ""}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-blue-500 focus:outline-none bg-transparent py-1"
                    placeholder="Rua"
                  />
                  <input
                    type="text"
                    name="number"
                    value={editedCustomer.address?.number || ""}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-blue-500 focus:outline-none bg-transparent py-1"
                    placeholder="Número"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-xs text-gray-500">Endereço</p>
                  <p className="font-medium">
                    {customer.address?.street || "Rua não informada"},{" "}
                    {customer.address?.number || "s/n"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* City */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaCity className="text-blue-600" />
            </div>
            <div className="flex-grow">
              {editMode ? (
                <input
                  type="text"
                  name="city"
                  value={editedCustomer.address?.city || ""}
                  onChange={handleInputChange}
                  className="w-full border-b-2 border-blue-500 focus:outline-none bg-transparent py-1"
                  placeholder="Cidade"
                />
              ) : (
                <div>
                  <p className="text-xs text-gray-500">Cidade</p>
                  <p className="font-medium">
                    {customer.address?.city || "Cidade não informada"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Complement (conditional) */}
          {(customer.address?.complement || editMode) && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-600 font-bold">+</span>
              </div>
              <div className="flex-grow">
                {editMode ? (
                  <input
                    type="text"
                    name="complement"
                    value={editedCustomer.address?.complement || ""}
                    onChange={handleInputChange}
                    className="w-full border-b-2 border-blue-500 focus:outline-none bg-transparent py-1"
                    placeholder="Complemento"
                  />
                ) : (
                  <div>
                    <p className="text-xs text-gray-500">Complemento</p>
                    <p className="font-medium">{customer.address.complement}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              localStorage.removeItem("customerData");
              window.location.reload();
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full shadow-md transition-all hover:shadow-lg cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;