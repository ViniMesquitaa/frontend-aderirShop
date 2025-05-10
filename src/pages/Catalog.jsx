import UnderConstruction from "../components/UnderConstruction";

const Catalog = () => {
  const phone = "5585985009462"; // Código do país + DDD + número
  const message = encodeURIComponent(
    "Olá! Estou entrando em contato pelo app."
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      Enviar mensagem no WhatsApp
    </a>
  );
};

export default Catalog;
