import React from 'react';
import { saleProducts } from '../data/products';
import { formatMoney } from '../utils/calculations';

const ProductRow = ({ product, onUpdateProduct, goldPrice }) => {
  const handleCheckboxChange = (e) => {
    onUpdateProduct(product.id, { selected: e.target.checked });
  };

  const handleProductChange = (e) => {
    const selectedIndex = parseInt(e.target.value) - 1;

    if (selectedIndex >= 0 && selectedIndex < saleProducts.length) {
      const selectedProduct = saleProducts[selectedIndex];
      onUpdateProduct(product.id, {
        productId: parseInt(e.target.value),
        weight: selectedProduct.weight,
        stampEnduser: selectedProduct.stampEnduser,
        num1: selectedProduct.num1,
        num2: selectedProduct.num2,
        num3: selectedProduct.num3
      });
    } else {
      onUpdateProduct(product.id, {
        productId: 0,
        weight: 0,
        stampEnduser: 0,
        num1: 1,
        num2: 1,
        num3: 0,
        itemPrice: 0,
        totalPrice: 0
      });
    }
  };

  const handleQuantityChange = (e) => {
    let value = e.target.value;

    // Only allow positive integers
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = value === '' ? '' : parseInt(value);

      if (value === '' || (numValue > 0)) {
        onUpdateProduct(product.id, { quantity: value });
      }
    }
  };

  return (
    <tr className="slide-in">
      <td>
        <div className="checkbox-container">
          <input
            className="itemRow form-check-input"
            type="checkbox"
            checked={product.selected}
            onChange={handleCheckboxChange}
          />
        </div>
      </td>
      <td>
        <select
          required
          value={product.productId}
          onChange={handleProductChange}
          className="form-select"
        >
          <option disabled value={0}>Select Product</option>
          {saleProducts.map((prod, index) => (
            <option key={index} value={index + 1}>
              {prod.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="text"
          required
          value={product.quantity}
          onChange={handleQuantityChange}
          className="form-control qty"
          autoComplete="off"
          placeholder="Qty"
          min="1"
        />
      </td>
      <td>
        <input
          type="text"
          required
          value={product.itemPrice > 0 ? formatMoney(product.itemPrice) : ''}
          className="form-control total-input"
          autoComplete="off"
          readOnly
        />
      </td>
      <td>
        <input
          readOnly
          type="text"
          required
          value={product.totalPrice > 0 ? formatMoney(product.totalPrice) : ''}
          className="form-control price total-input"
          autoComplete="off"
        />
      </td>
    </tr>
  );
};

export default ProductRow;