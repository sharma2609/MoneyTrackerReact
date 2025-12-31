import React, { useState, useMemo, useCallback, Suspense, lazy } from 'react';
import FloatingNav from './components/FloatingNav';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import ErrorBoundary from './components/ErrorBoundary';
import { useToast } from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

// Lazy load heavy components for better initial load performance
const Analysis = lazy(() => import('./components/Analysis'));
const Reports = lazy(() => import('./components/Reports'));
const Settings = lazy(() => import('./components/Settings'));

// Loading component for better UX
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

/**
 * Main App Component
 * Two-column layout: Left = Input Form, Right = Display/Navigation
 */
const App = () => {
  const { showSuccess, showError } = useToast();
  // Persist transactions and categories in localStorage
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [categories, setCategories] = useLocalStorage('categories', [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Salary',
    'Investment',
    'Other'
  ]);
  const [currentView, setCurrentView] = useState('overview');

  // Add new transaction with optimistic updates
  const handleAddTransaction = useCallback(async (transaction) => {
    try {
      setTransactions(prev => [transaction, ...prev]);
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  }, [setTransactions]);

  // Delete transaction with optimistic updates
  const handleDeleteTransaction = useCallback(async (id) => {
    try {
      const transactionToDelete = transactions.find(t => t.id === id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      
      if (transactionToDelete) {
        showSuccess(`Transaction "${transactionToDelete.title}" deleted successfully`);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      showError('Failed to delete transaction. Please try again.');
      throw error;
    }
  }, [setTransactions, transactions, showSuccess, showError]);

  // Clear all transactions
  const handleClearHistory = useCallback(async () => {
    try {
      setTransactions([]);
    } catch (error) {
      console.error('Error clearing history:', error);
      throw error;
    }
  }, [setTransactions]);

  // Update categories
  const handleUpdateCategories = useCallback(async (newCategories) => {
    try {
      setCategories(newCategories);
    } catch (error) {
      console.error('Error updating categories:', error);
      throw error;
    }
  }, [setCategories]);

  // Navigation handler
  const handleNavigate = useCallback((view) => {
    setCurrentView(view);
  }, []);

  // Get current month's name
  const currentMonthName = useMemo(() => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[new Date().getMonth()];
  }, []);

  // Filter current month transactions
  const currentMonthTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === now.getMonth() && 
             date.getFullYear() === now.getFullYear();
    });
  }, [transactions]);

  // Render right column content based on current view
  const renderRightColumn = useCallback(() => {
    switch (currentView) {
      case 'overview':
        return (
          <ErrorBoundary>
            <div className="view-header">
              <h2 className="view-title">
                <span className="title-icon" role="img" aria-hidden="true">🏠</span>
                {currentMonthName} Overview
              </h2>
              <p className="view-subtitle">Current month at a glance</p>
            </div>
            <Summary transactions={currentMonthTransactions} />
            <TransactionList 
              transactions={currentMonthTransactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </ErrorBoundary>
        );
      
      case 'analysis':
        return (
          <ErrorBoundary>
            <Analysis transactions={transactions} />
          </ErrorBoundary>
        );
      
      case 'reports':
        return (
          <ErrorBoundary>
            <Reports transactions={transactions} />
          </ErrorBoundary>
        );
      
      case 'settings':
        return (
          <ErrorBoundary>
            <Settings 
              categories={categories}
              onUpdateCategories={handleUpdateCategories}
              onClearHistory={handleClearHistory}
            />
          </ErrorBoundary>
        );
      
      default:
        return null;
    }
  }, [
    currentView, 
    currentMonthName, 
    currentMonthTransactions, 
    transactions, 
    categories, 
    handleDeleteTransaction, 
    handleUpdateCategories, 
    handleClearHistory
  ]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="app-icon" role="img" aria-hidden="true">💰</span>
            Money Tracker
          </h1>
          <div className="header-stats">
            <span className="stat-item">
              <span className="stat-label">Total Transactions:</span>
              <span className="stat-value">{transactions.length}</span>
            </span>
          </div>
        </div>
      </header>
      
      <div className="main-content">
        <div className="left-column">
          <ErrorBoundary>
            <TransactionForm 
              onAddTransaction={handleAddTransaction}
              categories={categories}
            />
          </ErrorBoundary>
        </div>
        
        <div className="right-column">
          <Suspense fallback={<LoadingSpinner />}>
            {renderRightColumn()}
          </Suspense>
        </div>
      </div>

      <FloatingNav 
        currentView={currentView} 
        onNavigate={handleNavigate}
      />
    </div>
  );
};
      </div>
      
      <FloatingNav 
        currentView={currentView}
        onNavigate={setCurrentView}
      />
    </div>
  );
};

export default App;
