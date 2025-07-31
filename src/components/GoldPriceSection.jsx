import React from 'react';
import { formatMoney } from '../utils/calculations';

const GoldPriceSection = ({
  goldPrice,
  goldPrice24,
  onGoldPriceChange,
  error,
  onClearError
}) => {
  const handleInputChange = (e) => {
    onClearError();
    onGoldPriceChange(e.target.value);
  };

  const handleBlur = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, ''));
    if (value > 0) {
      // Format the input value with commas on blur
      e.target.value = formatMoney(value);
    }
  };

  return (
    <div className="mb-4">
      <h4 className="section-title">
        <i className="fas fa-chart-line"></i>
        Gold Price Configuration
      </h4>

      <div className="row">
        <div className="col-md-6">
          <div className={`input-group ${error ? 'has-error' : ''}`}>
            <span className="input-group-text">
              <i className="fas fa-gold me-2"></i>Gold Price (21K)
            </span>
            <input
              type="text"
              className="form-control"
              required
              value={goldPrice}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Enter 21k gold price"
              autoComplete="off"
            />
          </div>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-crown me-2"></i>Gold Price (24K)
            </span>
            <input
              type="text"
              className="form-control"
              readOnly
              value={goldPrice24 > 0 ? formatMoney(goldPrice24) : ''}
              placeholder="Auto-calculated 24k price"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldPriceSection;