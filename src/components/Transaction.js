import React from "react";

function Transaction({ transaction, onDelete }) {
  const { id, date, description, category, amount } = transaction;

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button className="ui button" onClick={handleDeleteClick}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Transaction;
