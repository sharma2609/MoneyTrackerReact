import React from 'react';

/**
 * Summary component - displays total income, expense, and balance
 */
const Summary = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="summary">
      <div className="summary-card">
        <div className="summary-label">Income</div>
        <div className="summary-value income">+${income.toFixed(2)}</div>
      </div>
      
      <div className="summary-card">
        <div className="summary-label">Expense</div>
        <div className="summary-value expense">-${expense.toFixed(2)}</div>
      </div>
      
      <div className="summary-card balance-card">
        <div className="summary-label">Balance</div>
        <div className="summary-value balance">${balance.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Summary;
