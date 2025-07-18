import { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import InputPasswordUI from "../components/InputPasswordUI";

const InitialLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSucess, setShowSucess] = useState(false);

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
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    } if(step === 3) {
      if(!formData.username.trim()) {
        newErrors["username"] = "Nome de Usuário é obrigatório"
      }
      if(!formData.password.trim()){
        newErrors["password"] = "Senha é obrigatória"
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (errors.fullName && formData.fullName.trim().length >= 3) {
      setErrors((prev) => {
        const { fullName: _, ...rest } = prev;
        return rest;
      });
    }
  }, [formData.fullName, errors.fullName]);

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
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    const savedData = localStorage.getItem("customerData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      try {
        setShowSucess(true);
        localStorage.setItem("customerData", JSON.stringify(formData));
  
        setTimeout(() => {
          navigate("/catalog");
        }, 2000);
      } catch (error) {
        alert("Erro ao realizar o cadastro. Tente novamente.", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-8 relative">
          <div
            className="absolute top-1/2 left-0 h-1 bg-white transform -translate-y-1/2 z-0 transition-all duration-500"
            style={{
              width:
                step === 1
                  ? "0%"
                  : step === 2
                  ? "50%"
                  : step === 3
                  ? "75%"
                  : "100%",
            }}
          ></div>
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 ${
                step >= n
                  ? "bg-[#115ccc] text-white"
                  : "bg-white text-blue-400 border-2 border-white"
              }`}
            >
              {n === 4 ? "✓" : n}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {step === 1 && "Informações Pessoais"}
                {step === 2 && "Endereço"}
                {step === 3 && "Cadastro"}
                {step === 4 && "Confirmação"}
              </h2>
              <p className="text-blue-500">
                {step === 1 && "Preencha seus dados básicos"}
                {step === 2 && "Informe onde você mora"}
                {step === 3 && "Crie um usuário e uma senha"}
                {step === 4 && "Revise e confirme seu cadastro"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label
                      htmlFor="fullName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Seu nome completo"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="phoneNumber"
                      className="text-sm font-medium text-gray-700"
                    >
                      Telefone
                    </label>
                    <IMaskInput
                      mask={[
                        { mask: "(00) 0000-0000" },
                        { mask: "(00) 00000-0000" },
                      ]}
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onAccept={(value) =>
                        handleChange({ target: { name: "phoneNumber", value } })
                      }
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="(00) 00000-0000"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CEP
                    </label>
                    <IMaskInput
                      mask="00000-000"
                      name="address.cep"
                      value={formData.address.cep}
                      onAccept={(value) =>
                        handleChange({ target: { name: "address.cep", value } })
                      }
                      className={`w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all rounded-lg border ${
                        errors["address.cep"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="00000-000"
                    />
                    {errors["address.cep"] && (
                      <p className="text-red-500 text-xs">
                        {errors["address.cep"]}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Rua
                      </label>
                      <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all rounded-lg border ${
                          errors["address.street"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Nome da rua"
                      />
                      {errors["address.street"] && (
                        <p className="text-red-500 text-xs">
                          {errors["address.street"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Número
                      </label>
                      <input
                        type="number"
                        name="address.number"
                        value={formData.address.number}
                        onChange={handleChange}
                        className={`w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all py-3 rounded-lg border ${
                          errors["address.number"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Nº"
                      />
                      {errors["address.number"] && (
                        <p className="text-red-500 text-xs">
                          {errors["address.number"]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Complemento
                    </label>
                    <input
                      type="text"
                      name="address.complement"
                      value={formData.address.complement}
                      onChange={handleChange}
                      className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all rounded-lg border border-gray-300"
                      placeholder="Apto, bloco, etc. (opcional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bairro
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className={`w-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all py-3 rounded-lg border ${
                        errors["address.city"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Nome do bairro"
                    />
                    {errors["address.city"] && (
                      <p className="text-red-500 text-xs">
                        {errors["address.city"]}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Nome de Usuário
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full px-4  focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all py-3 rounded-lg border border-gray-300`}
                      placeholder="Seu nome de usuário"
                    />
                   {errors.username && (
                      <p className="text-red-500 text-xs">
                        {errors.username}
                      </p>
                    )}
                  </div>
                  <div>
                    <InputPasswordUI label={"Senha"} placeholder={"Digite sua senha"} value={formData.password} onChange={handleChange}/>
                     {errors.password && (
                      <p className="text-red-500 text-xs">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <InputPasswordUI label={"Confirmar Senha"} placeholder={"Digite novamente sua senha"}/>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-left text-sm space-y-2 bg-[#ebe8e8d3] p-3 rounded-2xl shadow">
                  <div>
                    <strong>Nome de usuario:</strong> {formData.username}
                  </div>
                  <div>
                    <strong>Nome:</strong> {formData.fullName}
                  </div>
                  <div>
                    <strong>Telefone:</strong> {formData.phoneNumber}
                  </div>
                  <div>
                    <strong>CEP:</strong> {formData.address.cep}
                  </div>
                  <div>
                    <strong>Rua:</strong> {formData.address.street}
                  </div>
                  <div>
                    <strong>Número:</strong> {formData.address.number}
                  </div>
                  <div>
                    <strong>Complemento:</strong>{" "}
                    {formData.address.complement || "—"}
                  </div>
                  <div>
                    <strong>Bairro:</strong> {formData.address.city}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-3 bg-gray-300 rounded-lg text-sm cursor-pointer hover:opacity-80 transition duration-200"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                )}

                {step < 4 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="px-5 py-3 bg-[#1972d8] text-white rounded-lg text-sm cursor-pointer hover:opacity-90 transition duration-200"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                )}

                {step === 4 && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm cursor-pointer"
                  >
                    {isSubmitting ? "Enviando..." : "Confirmar"}
                  </button>
                )}
                {showSucess && (
                  <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg transition-opacity duration-500">
                    ✅ Cadastro realizado com sucesso!
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialLogin;
