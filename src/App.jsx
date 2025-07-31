import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/App.css';

import GoldPriceSection from './components/GoldPriceSection';
import ProductsSection from './components/ProductsSection';
import TotalSection from './components/TotalSection';
import { useGoldCalculator } from './hooks/useGoldCalculator';

function App() {
  const {
    goldPrice,
    setGoldPrice,
    goldPrice24,
    products,
    addProduct,
    removeProducts,
    updateProduct,
    selectAllProducts,
    totalAmount,
    errors,
    clearError
  } = useGoldCalculator();

  return (
    <div className="container-fluid main-container">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card main-card fade-in">
            <div className="card-header">
              <h2>
                <i className="fas fa-coins me-3"></i>
                Gold Invoice Calculator
              </h2>
              <p>Professional Gold Price Management System</p>
            </div>

            <div className="card-body">
              <GoldPriceSection
                goldPrice={goldPrice}
                goldPrice24={goldPrice24}
                onGoldPriceChange={setGoldPrice}
                error={errors.goldPrice}
                onClearError={() => clearError('goldPrice')}
              />

              <ProductsSection
                products={products}
                onAddProduct={addProduct}
                onRemoveProducts={removeProducts}
                onUpdateProduct={updateProduct}
                onSelectAll={selectAllProducts}
                goldPrice={goldPrice}
              />

              <TotalSection totalAmount={totalAmount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;