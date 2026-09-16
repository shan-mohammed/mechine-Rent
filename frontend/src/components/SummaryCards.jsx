function SummaryCards({ records }) {
  const totalRent = records.reduce(
    (total, record) => total + Number(record.rent || 0),
    0
  );

  const totalExpense = records.reduce(
    (total, record) => total + Number(record.expense || 0),
    0
  );

  const balance = totalRent - totalExpense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

      {/* Total Rent */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <p className="text-slate-500 text-sm font-medium">
          Total Rent
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-2">
          ₹{totalRent.toLocaleString()}
        </h2>
      </div>

      {/* Total Expense */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <p className="text-slate-500 text-sm font-medium">
          Total Expenses
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-2">
          ₹{totalExpense.toLocaleString()}
        </h2>
      </div>

      {/* Balance */}
      <div className="bg-blue-600 rounded-xl shadow-sm p-6 sm:col-span-2 lg:col-span-1">
        <p className="text-blue-100 text-sm font-medium">
          Remaining Balance
        </p>

        <h2 className="text-3xl font-bold text-white mt-2">
          ₹{balance.toLocaleString()}
        </h2>

        <p className="text-blue-100 text-sm mt-2">
          Rent − Expenses
        </p>
      </div>

    </div>
  );
}

export default SummaryCards;