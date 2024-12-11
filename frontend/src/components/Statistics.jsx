import React, { useState, useEffect } from 'react';
import axios from '../api/apiClient';

const Statistics = ({ selectedMonth }) => {
    const [stats, setStats] = useState({ totalSale: 0, soldItems: 0, unsoldItems: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchStatistics();
    }, [selectedMonth]);

    const fetchStatistics = async () => {
        const response = await axios.get('/statistics', { params: { month: selectedMonth } });
        setStats(response.data);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-bold mb-5">Statistics for {selectedMonth}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out">
                    <h4 className="font-medium">Total Sale Amount</h4>
                    <p className="text-xl">${stats.totalSale}</p>
                </div>
                <div className="p-6 bg-green-100 rounded-lg shadow-md hover:bg-green-200 transition duration-300 ease-in-out">
                    <h4 className="font-medium">Total Sold Items</h4>
                    <p className="text-xl">{stats.soldItems}</p>
                </div>
                <div className="p-6 bg-red-100 rounded-lg shadow-md hover:bg-red-200 transition duration-300 ease-in-out">
                    <h4 className="font-medium">Total Unsold Items</h4>
                    <p className="text-xl">{stats.unsoldItems}</p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
