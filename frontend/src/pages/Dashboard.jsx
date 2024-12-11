import React, { useState } from 'react';
import TransactionTable from '../components/TransactionsTable';
import Statistics from '../components/Statistics';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import MonthDropdown from '../components/MonthDropdown';

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('March');

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                        Roxiler Systems Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Explore comprehensive data visualizations and analytics for your business.
                    </p>
                </header>

                {/* Dropdown and Statistics */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                    <MonthDropdown
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                    />
                    <div className="mt-4 md:mt-0">
                        <Statistics selectedMonth={selectedMonth} />
                    </div>
                </div>

                {/* Charts and Tables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Transactions Table */}
                    <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Transactions Table
                        </h2>
                        <TransactionTable selectedMonth={selectedMonth} />
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Category Distribution (Pie Chart)
                        </h2>
                        <PieChart selectedMonth={selectedMonth} />
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="mt-10 bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Price Range Distribution (Bar Chart)
                    </h2>
                    <BarChart selectedMonth={selectedMonth} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
