import React from "react";

const Balance = ({ transactions }) => {
  const total = transactions
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);

  return (
    <div className="balance">
      <h2>Balance: ${total}</h2>
    </div>
  );
};

export default Balance;
