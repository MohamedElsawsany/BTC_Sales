import React from 'react';
import { formatMoney } from '../utils/calculations';

const TotalSection = ({ totalAmount }) => {
  return (
    <div className="total-section">
      <div className="row justify-content-end align-items-center">
        <div className="col-md-6 col-lg-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-receipt me-2"></i>Grand Total
            </span>
            <input
              type="text"
              className="form-control total-input"
              readOnly
              required
              value={totalAmount > 0 ? formatMoney(totalAmount) : '0.00'}
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSection;