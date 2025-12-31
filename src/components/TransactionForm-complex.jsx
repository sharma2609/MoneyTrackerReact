import React, { useState, useCallback } from 'react';
import { useToast } from './Toast';

/**
 * TransactionForm - Left column input form
 * Allows users to add new transactions with all required fields
 */
const TransactionForm = ({ onAddTransaction, categories }) => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0] // Default to today
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Please fix the form errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const transaction = {
        id: Date.now().toString(),
        ...formData,
        amount: parseFloat(formData.amount),
        timestamp: new Date().toISOString()
      };

      await onAddTransaction(transaction);

      // Reset form
      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});
      
      // Show success message
      showSuccess(`${transaction.type === 'income' ? 'Income' : 'Expense'} added successfully!`);
      
    } catch (error) {
      console.error('Error adding transaction:', error);
      showError('Failed to add transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onAddTransaction, showSuccess, showError]);

  const isFormValid = formData.title.trim() && formData.amount && parseFloat(formData.amount) > 0;

  return (
    <div className="transaction-form">
      <div className="form-header">
        <h2 className="form-title">Add Transaction</h2>
        <p className="form-subtitle">Track your income and expenses</p>
      </div>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title / Description *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Grocery shopping"
            className={`form-input ${errors.title ? 'error' : ''}`}
            required
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <span id="title-error" className="error-message" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount" className="form-label">
            Amount *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={`form-input ${errors.amount ? 'error' : ''}`}
            required
            aria-describedby={errors.amount ? 'amount-error' : undefined}
          />
          {errors.amount && (
            <span id="amount-error" className="error-message" role="alert">
              {errors.amount}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="expense">💸 Expense</option>
            <option value="income">💰 Income</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${isFormValid ? 'valid' : 'invalid'}`}
          disabled={!isFormValid || isSubmitting}
          aria-describedby="submit-help"
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner" aria-hidden="true"></span>
              Adding...
            </>
          ) : (
            <>
              <span className="btn-icon" role="img" aria-hidden="true">➕</span>
              Add Transaction
            </>
          )}
        </button>
        <div id="submit-help" className="form-help">
          {!isFormValid && 'Please fill in all required fields'}
        </div>
      </form>
    </div>
  );
};
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type *</label>
          <div className="type-selector">
            <button
              type="button"
              className={`type-btn ${formData.type === 'expense' ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
            >
              Expense
            </button>
            <button
              type="button"
              className={`type-btn ${formData.type === 'income' ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
            >
              Income
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category (optional)</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
