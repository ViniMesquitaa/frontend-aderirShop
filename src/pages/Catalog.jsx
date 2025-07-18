import { useState } from "react";
import SubHeader from "../components/SubHeader";
import Carrossel from "../components/Carrossel";
import CartSide from "../components/CartSide";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../hooks/useCart";


const sabaoProducts = [
  {
    id: 1,
    name: "Sabão Líquido - Omo",
    img: "./sabaodopai.jpg",
    description: "Sabão em pó para roupas brancas e coloridas.",
    price: 5.99,
    category: "Sabão",
    stock: 50,
  },
  {
    id: 2,
    name: "Sabão Líquido - Ariel",
    img: "./ariel.png",
    description: "Sabão líquido concentrado para roupas delicadas.",
    price: 5.99,
    category: "Sabão",
    stock: 30,
  },
  {
    id: 3,
    img: "https://cepel.vteximg.com.br/arquivos/ids/162938-410-410/sabonete-liquido-erva-doce-soft-plus.jpg?v=636317534993170000",
    name: "Sabão Omo 5L",
    category: "Sabão",
    description: "Ideal para higienização de panelas e pratos.",
    price: 6.0,
    stock: 28,
  },
];

const amacianteProducts = [
  {
    id: 4,
    name: "Amaciante Comfort",
    img: "./ariel.png",
    description: "Amaciante para roupas brancas e coloridas.",
    price: 5.99,
    category: "Amaciante",
    stock: 50,
  },
  {
    id: 5,
    name: "Amaciante Downy",
    img: "./ariel.png",
    description: "Amaciante para roupas delicadas.",
    price: 5.99,
    category: "Amaciante",
    stock: 30,
  },
  {
    id: 6,
    name: "Amaciante Ypê",
    img: "./ariel.png",
    description: "Amaciante para roupas brancas e coloridas.",
    price: 5.99,
    category: "Amaciante",
    stock: 50,
  },
  {
    id: 7,
    name: "Amaciante Brilhante",
    img: "./ariel.png",
    description: "Amaciante para roupas delicadas.",
    price: 5.99,
    category: "Amaciante",
    stock: 30,
  },
];
const Catalog = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemCount
  } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true); // Abre o CartSide ao adicionar item
  };

  const increaseQuantity = (productId) => {
    const product = [...sabaoProducts, ...amacianteProducts].find(p => p.id === productId);
    const currentItem = cartItems.find(item => item.id === productId);
    
    if (currentItem && product) {
      if (currentItem.quantity >= product.stock) {
        alert("Quantidade máxima em estoque atingida!");
        return;
      }
      updateQuantity(productId, currentItem.quantity + 1);
    }
  };

  const decreaseQuantity = (productId) => {
    const currentItem = cartItems.find(item => item.id === productId);
    if (currentItem) {
      updateQuantity(productId, Math.max(1, currentItem.quantity - 1));
    }
  };

  return (
    <div className="mx-auto bg-gradient-to-br from-indigo-50 to-purple-50">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={cartItemCount}
      />

      <SubHeader
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={cartItemCount}
      />

      <div className="mx-auto max-w-7xl overflow-x-hidden pt-15">
        <Carrossel
          products={sabaoProducts}
          name="Sabão Líquido"
          onAddToCart={handleAddToCart}
        />
      </div>

      <div className="mx-auto max-w-7xl overflow-x-hidden">
        <Carrossel
          products={amacianteProducts}
          name="Amaciante"
          onAddToCart={handleAddToCart} // Usa a nova função handleAddToCart
        />
      </div>

      <CartSide
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        products={[...sabaoProducts, ...amacianteProducts]}
      />

      <Footer />
    </div>
  );
};

export default Catalog;