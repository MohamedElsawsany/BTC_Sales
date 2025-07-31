import React, { useMemo } from 'react';
import ProductRow from './ProductRow';

const ProductsSection = ({
  products,
  onAddProduct,
  onRemoveProducts,
  onUpdateProduct,
  onSelectAll,
  goldPrice
}) => {
  const selectedCount = useMemo(() => {
    return products.filter(p => p.selected).length;
  }, [products]);

  const allSelected = selectedCount === products.length && products.length > 0;
  const someSelected = selectedCount > 0 && selectedCount < products.length;

  const handleSelectAll = (e) => {
    onSelectAll(e.target.checked);
  };

  const handleRemoveProducts = () => {
    if (selectedCount === 0) {
      alert('Please select at least one row to delete.');
      return;
    }
    onRemoveProducts();
  };

  return (
    <div className="products-section">
      <h4 className="section-title">
        <i className="fas fa-shopping-cart"></i>
        Product Details
      </h4>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th width="8%">
                <div className="checkbox-container">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={allSelected}
                    ref={input => {
                      if (input) input.indeterminate = someSelected;
                    }}
                    onChange={handleSelectAll}
                    title="Select All"
                  />
                </div>
              </th>
              <th width="30%">
                <i className="fas fa-box me-2"></i>Product
              </th>
              <th width="15%">
                <i className="fas fa-sort-numeric-up me-2"></i>Qty
              </th>
              <th width="22%">
                <i className="fas fa-dollar-sign me-2"></i>Item Price
              </th>
              <th width="25%">
                <i className="fas fa-calculator me-2"></i>Total
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onUpdateProduct={onUpdateProduct}
                goldPrice={goldPrice}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <div className="d-flex gap-2 btn-group-mobile">
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleRemoveProducts}
              disabled={selectedCount === 0}
            >
              <i className="fas fa-trash me-2"></i>Delete Selected
            </button>
            <button
              className="btn btn-success"
              type="button"
              onClick={onAddProduct}
            >
              <i className="fas fa-plus me-2"></i>Add Row
            </button>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <small className="text-muted">
            <i className="fas fa-info-circle me-1"></i>
            Select products and enter quantities to calculate prices
          </small>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;