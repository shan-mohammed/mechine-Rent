import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";

import SummaryCards from "../components/SummaryCards";
import RecordForm from "../components/RecordForm";
import RecordsTable from "../components/RecordsTable";

function Dashboard() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get records from backend
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/records`);

        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }

        const data = await response.json();

        setRecords(data);
      } catch (error) {
        console.error(error);
        setError("Unable to connect to backend");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Add record to backend
  const handleAddRecord = async (newRecord) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/records`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newRecord),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add record");
      }

      const data = await response.json();

      // Add returned record to React state
      setRecords((prevRecords) => [
        ...prevRecords,
        data.record,
      ]);

    } catch (error) {
      console.error(error);
      alert("Failed to add record");
    }
  };
   const handleDeleteRecord = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this record?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/records/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete record");
    }

    setRecords((prevRecords) =>
      prevRecords.filter((record) => record._id !== id)
    );
  } catch (error) {
    console.error(error);
    alert("Failed to delete record");
  }
};
  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">

          <h1 className="text-xl font-bold text-blue-600">
            RentManager
          </h1>

          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <FaHouse />
              <span>Home</span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-5 sm:px-6 py-8">

        {/* HEADING */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h2>

          <p className="text-slate-600 mt-2">
            Manage your rent and expense records.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-slate-500">
              Loading records...
            </p>
          </div>
        ) : (
          <>
            {/* SUMMARY */}
            <SummaryCards records={records} />

            {/* FORM */}
            <RecordForm onAddRecord={handleAddRecord} />

            {/* TABLE */}
            <RecordsTable records={records}
            onDelete={handleDeleteRecord} />
          </>
        )}

      </main>

    </div>
  );
}

export default Dashboard;