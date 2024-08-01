import React from 'react';

function StockSelector({ stocks, onSelect }) {
  return (
    <div>
      <h2>Select a Stock</h2>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Choose a stock</option>
        {stocks.map((stock) => (
          <option key={stock.symbol} value={stock.symbol}>
            {stock.name} ({stock.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}

export default StockSelector;