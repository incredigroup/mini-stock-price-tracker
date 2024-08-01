import React from 'react';

function PriceDisplay({ symbol, price }) {
  return (
    <div>
      <h2>{symbol} Stock Price</h2>
      <p>${price ? price.toFixed(2) : 'Loading...'}</p>
    </div>
  );
}

export default PriceDisplay;