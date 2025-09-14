import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';

function App() {
  const products = [
    { name: 'Wireless Mouse', price: '25.99', status: 'In Stock' },
    { name: 'Keyboard', price: '45.5', status: 'Out of Stock' },
    { name: 'Monitor', price: '199.99', status: 'In Stock' },
  ];

  return (
    <div>
      <Header />

      <h2 style={{ marginTop: '20px' }}>Products List</h2>

      <div className="products-container">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            status={product.status}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default App;
