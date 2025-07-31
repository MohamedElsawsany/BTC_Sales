import { useState, useCallback, useMemo } from 'react';
import { calculateItemPrice, calculateGoldPrice24, formatMoney, parseNumber } from '../utils/calculations.js';

export const useGoldCalculator = () => {
  const [goldPrice, setGoldPriceState] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      selected: false,
      productId: 0,
      quantity: '',
      weight: 0,
      stampEnduser: 0,
      num1: 1,
      num2: 1,
      num3: 0,
      itemPrice: 0,
      totalPrice: 0
    }
  ]);
  const [errors, setErrors] = useState({});
  const [nextId, setNextId] = useState(2);

  // Calculate 24K gold price
  const goldPrice24 = useMemo(() => {
    const price = parseNumber(goldPrice);
    return price > 0 ? calculateGoldPrice24(price) : 0;
  }, [goldPrice]);

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return products.reduce((sum, product) => sum + (product.totalPrice || 0), 0);
  }, [products]);

  // Set gold price with validation
  const setGoldPrice = useCallback((value) => {
    // Remove non-numeric characters except decimal point
    let cleanValue = value.replace(/[^\d.]/g, '');

    // Ensure only one decimal point
    const parts = cleanValue.split('.');
    if (parts.length > 2) {
      cleanValue = parts[0] + '.' + parts.slice(1).join('');
    }

    setGoldPriceState(cleanValue);

    // Validate
    const numericValue = parseNumber(cleanValue);
    if (cleanValue && (isNaN(numericValue) || numericValue <= 0)) {
      setErrors(prev => ({ ...prev, goldPrice: 'Please enter a valid gold price greater than 0' }));
    } else {
      setErrors(prev => ({ ...prev, goldPrice: null }));
    }

    // Recalculate all products
    if (numericValue > 0) {
      recalculateProducts(numericValue);
    }
  }, []);

  // Recalculate all product prices
  const recalculateProducts = useCallback((currentGoldPrice = null) => {
    const price = currentGoldPrice || parseNumber(goldPrice);
    if (price <= 0) return;

    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.productId > 0 && product.quantity > 0) {
          const { itemPrice, totalPrice } = calculateItemPrice(
            price,
            product.weight,
            product.stampEnduser,
            product.quantity,
            product.num1,
            product.num2,
            product.num3
          );
          return { ...product, itemPrice, totalPrice };
        }
        return product;
      })
    );
  }, [goldPrice]);

  // Add new product row
  const addProduct = useCallback(() => {
    const newProduct = {
      id: nextId,
      selected: false,
      productId: 0,
      quantity: '',
      weight: 0,
      stampEnduser: 0,
      num1: 1,
      num2: 1,
      num3: 0,
      itemPrice: 0,
      totalPrice: 0
    };
    setProducts(prev => [...prev, newProduct]);
    setNextId(prev => prev + 1);
  }, [nextId]);

  // Remove selected products
  const removeProducts = useCallback(() => {
    const selectedProducts = products.filter(p => p.selected);
    if (selectedProducts.length === 0) {
      alert('Please select at least one row to delete.');
      return;
    }

    setProducts(prev => prev.filter(p => !p.selected));
  }, [products]);

  // Update product
  const updateProduct = useCallback((id, updates) => {
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === id) {
          const updatedProduct = { ...product, ...updates };

          // Recalculate prices if necessary fields are available
          if (updatedProduct.productId > 0 &&
              updatedProduct.quantity > 0 &&
              parseNumber(goldPrice) > 0) {
            const { itemPrice, totalPrice } = calculateItemPrice(
              parseNumber(goldPrice),
              updatedProduct.weight,
              updatedProduct.stampEnduser,
              updatedProduct.quantity,
              updatedProduct.num1,
              updatedProduct.num2,
              updatedProduct.num3
            );
            updatedProduct.itemPrice = itemPrice;
            updatedProduct.totalPrice = totalPrice;
          }

          return updatedProduct;
        }
        return product;
      });
    });
  }, [goldPrice]);

  // Select/deselect all products
  const selectAllProducts = useCallback((selected) => {
    setProducts(prev => prev.map(p => ({ ...p, selected })));
  }, []);

  // Clear error
  const clearError = useCallback((field) => {
    setErrors(prev => ({ ...prev, [field]: null }));
  }, []);

  return {
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
  };
};