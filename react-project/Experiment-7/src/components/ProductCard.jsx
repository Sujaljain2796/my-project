import React from 'react';

const ProductCard = ({ name, price, status }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
};

export default ProductCard;
