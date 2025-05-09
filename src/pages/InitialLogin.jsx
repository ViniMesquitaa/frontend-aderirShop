import { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { Link } from "react-router";

const ModernMultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      city: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validação do formulário
  const validate = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Nome completo é obrigatório";
      } else if (formData.fullName.trim().length < 3) {
        newErrors.fullName = "Nome deve ter pelo menos 3 caracteres";
      }

      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Telefone é obrigatório";
      } else if (formData.phoneNumber.replace(/\D/g, "").length < 10) {
        newErrors.phoneNumber = "Telefone inválido";
      }
    }

    if (step === 2) {
      if (!formData.address.cep) {
        newErrors["address.cep"] = "CEP é obrigatório";
      } else if (formData.address.cep.replace(/\D/g, "").length !== 8) {
        newErrors["address.cep"] = "CEP inválido";
      }

      if (!formData.address.street.trim()) {
        newErrors["address.street"] = "Rua é obrigatória";
      }

      if (!formData.address.number) {
        newErrors["address.number"] = "Número é obrigatório";
      }

      if (!formData.address.city.trim()) {
        newErrors["address.city"] = "Bairro é obrigatório";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Efeito para limpar erros quando os campos são alterados
  useEffect(() => {
    if (errors.fullName && formData.fullName.trim().length >= 3) {
      setErrors((prevErrors) => {
        const { fullName: _, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [formData.fullName, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (validate()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      console.log("Dados enviados: ", formData);
      // Aqui você pode adicionar a lógica de envio para o servidor
    } else {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-[#127ee4] to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-8 relative">
          <div
            className="absolute top-1/2 left-0 h-1 bg-[#fff] transform -translate-y-1/2 z-0 transition-all duration-500"
            style={{
              width:
                step === 1
                  ? "0%"
                  : step === 2
                  ? "50%"
                  : step === 3
                  ? "100%"
                  : "0%",
            }}
          ></div>

          {/* Etapa 1 */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 ${
              step >= 1
                ? "bg-[#FFA500] text-white"
                : "bg-white text-blue-400 border-2 border-white"
            }`}
          >
            1
          </div>

          {/* Etapa 2 */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 ${
              step >= 2
                ? "bg-[#FFA500] text-white"
                : "bg-white text-blue-400 border-2 border-white"
            }`}
          >
            2
          </div>

          {/* Etapa 3 */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 ${
              step === 3
                ? "bg-[#FFA500] text-white"
                : "bg-white text-blue-400 border-2 border-white"
            }`}
          >
            ✓
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {step === 1 && "Informações Pessoais"}
                {step === 2 && "Endereço"}
                {step === 3 && "Confirmação"}
              </h2>
              <p className="text-blue-500">
                {step === 1 && "Preencha seus dados básicos"}
                {step === 2 && "Informe onde você mora"}
                {step === 3 && "Revise e confirme seu cadastro"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      } focus:ring-2 focus:ring-blue-200 outline-none transition duration-200`}
                      placeholder="Seu nome completo"
                      required
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Telefone
                    </label>
                    <IMaskInput
                      mask={[
                        {
                          mask: "(00) 0000-0000",
                        },
                        {
                          mask: "(00) 00000-0000",
                        },
                      ]}
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onAccept={(value) =>
                        handleChange({ target: { name: "phoneNumber", value } })
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      } focus:ring-2 focus:ring-blue-200 outline-none transition duration-200`}
                      placeholder="(00) 00000-0000"
                      required
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="cep"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CEP
                    </label>
                    <IMaskInput
                      mask="00000-000"
                      type="text"
                      id="cep"
                      name="address.cep"
                      value={formData.address.cep}
                      onAccept={(value) =>
                        handleChange({ target: { name: "address.cep", value } })
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors["address.cep"]
                          ? "border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      } focus:ring-2 focus:ring-blue-200 outline-none transition duration-200`}
                      placeholder="00000-000"
                      required
                    />
                    {errors["address.cep"] && (
                      <p className="text-red-500 text-xs mt-1">{errors["address.cep"]}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Rua
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors["address.street"]
                            ? "border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                        } focus:ring-2 focus:ring-blue-200 outline-none transition duration-200`}
                        placeholder="Nome da rua"
                        required
                      />
                      {errors["address.street"] && (
                        <p className="text-red-500 text-xs mt-1">{errors["address.street"]}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Número
                      </label>
                      <input
                        type="number"
                        id="number"
                        name="address.number"
                        value={formData.address.number}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors["address.number"]
                            ? "border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                        } focus:ring-2 focus:ring-blue-200 outline-none transition duration-200`}
                        placeholder="Nº"
                        required
                      />
                      {errors["address.number"] && (
                        <p className="text-red-500 text-xs mt-1">{errors["address.number"]}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="complement"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Complemento
                    </label>
                    <input
                      type="text"
                      id="complement"
                      name="address.complement"
                      value={formData.address.complement}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
                      placeholder="Apto, bloco, etc. (opcional)"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bairro
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors["address.city"]
                          ? "border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      } focus:ring-2 focus:ring-blue-200 outline-none transition duration-200`}
                      placeholder="Seu bairro"
                      required
                    />
                    {errors["address.city"] && (
                      <p className="text-red-500 text-xs mt-1">{errors["address.city"]}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="font-medium text-lg text-gray-800 mb-4">
                      Resumo do Cadastro
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Nome</p>
                        <p className="font-medium">{formData.fullName}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Telefone</p>
                        <p className="font-medium">{formData.phoneNumber}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Endereço</p>
                        <p className="font-medium">
                          {formData.address.street}, {formData.address.number}
                          {formData.address.complement &&
                            `, ${formData.address.complement}`}
                        </p>
                        <p className="font-medium">
                          {formData.address.city} - {formData.address.cep}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
                    <div className="text-green-500 mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">
                        Tudo pronto!
                      </h4>
                      <p className="text-sm text-green-600">
                        Confira seus dados e confirme o cadastro
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 rounded-lg border bg-[#34414d] text-white font-medium transition duration-200 cursor-pointer hover:bg-[#34414d] hover:shadow-lg"
                  >
                    Voltar
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto px-6 py-3 rounded-lg bg-[#1e75e6] text-white font-medium hover:bg-blue-600 transition duration-200 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Continuar
                  </button>
                ) : (
                  <Link to={"/construction"}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`ml-auto px-6 py-3 rounded-lg ${
                        isSubmitting ? "bg-green-400" : "bg-green-600"
                      } text-white font-medium hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg cursor-pointer`}
                    >
                      {isSubmitting ? "Enviando..." : "Confirmar Cadastro"}
                    </button>
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernMultiStepForm;