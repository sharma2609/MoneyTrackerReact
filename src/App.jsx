import React, { useState } from "react";
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import TransactionChart from "./components/TransactionChart";
import "./styles/styles.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [activePage, setActivePage] = useState("home");

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const removeTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const renderPage = () => {
    switch (activePage) {
      case "add":
        return <TransactionForm addTransaction={addTransaction} />;
      case "history":
        return (
          <TransactionList
            transactions={transactions}
            removeTransaction={removeTransaction}
          />
        );
      case "chart":
        return <TransactionChart transactions={transactions} />;
      default:
        return <TransactionForm addTransaction={addTransaction} />; // Home page
    }
  };

  return (
    <div className="app">
      <nav className="sidebar">
        <button onClick={() => setActivePage("add")}>Add Transaction</button>
        <button onClick={() => setActivePage("history")}>
          Transaction History
        </button>
        <button onClick={() => setActivePage("chart")}>Chart</button>
      </nav>
      <div className="container">{renderPage()}</div>
    </div>
  );
};

export default App;
