import React from 'react';

const MonthDropdown = ({ selectedMonth, setSelectedMonth }) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    return (
        <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 border rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-500"
        >
            {months.map((month, index) => (
                <option key={index} value={month}>
                    {month}
                </option>
            ))}
        </select>
    );
};

export default MonthDropdown;
