
import { useEffect, useState } from "react";

function RecordForm({ onAddRecord, editingRecord, onUpdateRecord, onCancelEdit }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    rent: "",
    expense: "",
    expenseDescription: "",
  });

  // When Edit is clicked, load that record into the form
  useEffect(() => {
    if (editingRecord) {
      setFormData({
        date: editingRecord.date || "",
        description: editingRecord.description || "",
        rent: editingRecord.rent ?? "",
        expense: editingRecord.expense ?? "",
        expenseDescription: editingRecord.expenseDescription || "",
      });
    }
  }, [editingRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recordData = {
      date: formData.date,
      description: formData.description,
      rent: Number(formData.rent),
      expense: formData.expense ? Number(formData.expense) : 0,
      expenseDescription: formData.expenseDescription || "",
    };

    if (editingRecord) {
      // Update existing record
      onUpdateRecord(editingRecord._id, recordData);
    } else {
      // Add new record
      onAddRecord(recordData);
    }

    setFormData({
      date: "",
      description: "",
      rent: "",
      expense: "",
      expenseDescription: "",
    });
  };

  const handleCancel = () => {
    setFormData({
      date: "",
      description: "",
      rent: "",
      expense: "",
      expenseDescription: "",
    });

    onCancelEdit();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">

      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        {editingRecord ? "Edit Record" : "Add New Record"}
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Rent */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rent
            </label>

            <input
              type="number"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              placeholder="Enter rent amount"
              min="0"
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Expense */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Expense
              <span className="text-slate-400 font-normal"> (Optional)</span>
            </label>

            <input
              type="number"
              name="expense"
              value={formData.expense}
              onChange={handleChange}
              placeholder="Enter expense amount"
              min="0"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Expense Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Expense Description
              <span className="text-slate-400 font-normal"> (Optional)</span>
            </label>

            <textarea
              name="expenseDescription"
              value={formData.expenseDescription}
              onChange={handleChange}
              placeholder="What was the expense for?"
              rows="3"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {editingRecord ? "Update Record" : "Add Record"}
          </button>

          {editingRecord && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-slate-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition"
            >
              Cancel
            </button>
          )}

        </div>

      </form>
    </div>
  );
}

export default RecordForm;


