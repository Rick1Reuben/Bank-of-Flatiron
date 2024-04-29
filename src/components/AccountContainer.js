import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:8001/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data);
      // Set filtered transactions initially to all transactions
      setFilteredTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSearch = (searchTerm) => {
    // Filter transactions based on the search term
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const addTransaction = async (newTransaction) => {
    try {
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTransaction)
      });
      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }
      // Fetch the updated list of transactions after adding a new transaction
      fetchTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm addTransaction={addTransaction} />
      {/* Pass filteredTransactions instead of transactions */}
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
