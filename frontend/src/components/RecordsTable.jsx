function RecordsTable({ records = [], onDelete,onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          All Records
        </h2>
      </div>

      {records.length === 0 ? (
        <div className="p-8 text-center text-slate-500">
          No records found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">Rent</th>
                <th className="px-6 py-4 text-left">Expense</th>
                <th className="px-6 py-4 text-left">
                  Expense Description
                </th>
                <th className="px-6 py-4 text-left">Balance</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => {
                const balance =
                  Number(record.rent || 0) -
                  Number(record.expense || 0);

                return (
                  <tr
                    key={record._id}
                    className="border-t border-slate-200"
                  >
                    <td className="px-6 py-4">
                      {record.date}
                    </td>

                    <td className="px-6 py-4">
                      {record.description}
                    </td>

                    <td className="px-6 py-4">
                      ₹{Number(record.rent || 0).toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      ₹{Number(record.expense || 0).toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      {record.expenseDescription || "-"}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      ₹{balance.toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {/* edit */}
                        <button onClick={() => onEdit(record)}
                         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                          > Edit </button>
                             <button
                        onClick={() => onDelete(record._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                      </div>
                     
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecordsTable;