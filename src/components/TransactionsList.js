import React, { useState, useEffect } from "react";

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("https://bank-of-flatiron-34x8.onrender.com/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`https://bank-of-flatiron-34x8.onrender.com/transactions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Delete successful");
      });
  };

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Actions</h3>
          </th>
        </tr>
        {/* render a list of <Transaction> components here */}
        {transactions.map((trans) => (
          <tr key={trans.id}>
            <td>{trans.date}</td>
            <td>{trans.description}</td>
            <td>{trans.category}</td>
            <td>{trans.amount}</td>
            <td>
              <button
                className="ui button"
                onClick={() => handleDelete(trans.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
