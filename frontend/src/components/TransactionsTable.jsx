import React, { useState, useEffect } from 'react';
import axios from '../api/apiClient';

const TransactionTable = ({ selectedMonth }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchTransactions();
    }, [search, page, selectedMonth]);

    const fetchTransactions = async () => {
        const response = await axios.get('/transactions', {
            params: { page, search, month: selectedMonth },
        });
        setTransactions(response.data.transactions);
        setTotalPages(Math.ceil(response.data.total / 10));
    };

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg p-4">
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <table className="min-w-full bg-white table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-gray-700">
                        <th className="py-2 px-4 border-b text-left">Title</th>
                        <th className="py-2 px-4 border-b text-left">Description</th>
                        <th className="py-2 px-4 border-b text-left">Price</th>
                        <th className="py-2 px-4 border-b text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr
                            key={transaction.id}
                            className="hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out"
                        >
                            <td className="py-2 px-4 border-b">{transaction.title}</td>
                            <td className="py-2 px-4 border-b">{transaction.description}</td>
                            <td className="py-2 px-4 border-b">${transaction.price}</td>
                            <td className="py-2 px-4 border-b">{new Date(transaction.dateOfSale).toDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Previous
                </button>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionTable;
