import React, { useState, useMemo } from 'react';
import FloatingNav from './components/FloatingNav';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import Analysis from './components/Analysis';
import Reports from './components/Reports';
import Settings from './components/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

/**
 * Main App Component
 * Two-column layout: Left = Input Form, Right = Display/Navigation
 */
const App = () => {
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

  // Add new transaction
  const handleAddTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  // Delete transaction
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Clear all transactions
  const handleClearHistory = () => {
    setTransactions([]);
  };

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
  const renderRightColumn = () => {
    switch (currentView) {
      case 'overview':
        return (
          <>
            <div className="view-header">
              <h2 className="view-title">{currentMonthName} Overview</h2>
              <p className="view-subtitle">Current month at a glance</p>
            </div>
            <Summary transactions={currentMonthTransactions} />
            <TransactionList 
              transactions={currentMonthTransactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </>
        );
      
      case 'analysis':
        return <Analysis transactions={transactions} />;
      
      case 'reports':
        return <Reports transactions={transactions} />;
      
      case 'settings':
        return (
          <Settings 
            categories={categories}
            onUpdateCategories={setCategories}
            onClearHistory={handleClearHistory}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Money Tracker</h1>
      </header>
      
      <div className="main-content">
        <div className="left-column">
          <TransactionForm 
            onAddTransaction={handleAddTransaction}
            categories={categories}
          />
        </div>
        
        <div className="right-column">
          {renderRightColumn()}
        </div>
      </div>
      
      <FloatingNav 
        currentView={currentView}
        onNavigate={setCurrentView}
      />
    </div>
  );
};

export default App;
