import React from "react";

const TransactionList = ({ transactions, removeTransaction }) => {
  return (
    <div className="transactions">
      <h3>Transaction History</h3>
      <ul id="transaction-list">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={transaction.amount < 0 ? "negative" : "positive"}
          >
            <div className="transaction-details">
              <div className="transaction-description">
                {transaction.description}
              </div>
              <div className="transaction-amount">
                {transaction.amount < 0 ? "-" : "+"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </div>
              <div className="transaction-date">{transaction.date}</div>
            </div>
            <button
              className="delete-btn"
              onClick={() => removeTransaction(transaction.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
