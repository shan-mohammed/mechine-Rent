
import { useEffect,useState  } from "react";
import { FaUserShield } from "react-icons/fa6";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

function Home() {

  const [records, setRecords] = useState([]);
  
useEffect(() => {
  const fetchRecords = async () => {
    try {
      const response = await fetch(
         `${import.meta.env.VITE_API_URL}/api/records`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch records");
      }

      const data = await response.json();

      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  fetchRecords();
}, []);

  // Calculate total rent
  const totalRent = records.reduce(
    (total, record) => total + Number(record.rent || 0),
    0
  );

  // Calculate total expenses
  const totalExpense = records.reduce(
    (total, record) => total + Number(record.expense || 0),
    0
  );

  // Calculate remaining balance
  const remainingBalance = totalRent - totalExpense;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-5 sm:px-6 py-8">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* HEADER */}
          <header className="relative h-72 overflow-hidden">

            <div className="w-full h-full">
              <img
                src="https://media.istockphoto.com/id/505693216/photo/electric-saw.jpg?s=612x612&w=0&k=20&c=HUfp_srTo6wAEidCAagwB1OKu8NwG2oX0Q1WMMPf38k="
                alt="Machine"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text on image */}
            <div className="absolute inset-0 flex items-center justify-end bg-black/30">

              <div className="text-center text-white px-5">

                <h1 className="text-3xl sm:text-4xl font-bold">
                  Rent & Expense Management
                </h1>

                <p className="mt-3 text-xl sm:text-2xl text-blue-100">
                  Machine rent and expenses .....
                </p>

              </div>

            </div>

          </header>

          {/* RECORDS */}
          <section className="p-5 sm:p-8">

            {/* TITLE */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Records
              </h2>

              <p className="text-slate-500 mt-1">
                Recent rent and expense records
              </p>
            </div>

            {/* REMAINING BALANCE */}
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-6">

              <p className="text-sm font-medium text-slate-500">
                Remaining Balance
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                ₹{remainingBalance.toLocaleString()}
              </p>

              <div className="mt-3 flex flex-wrap gap-5 text-sm">

                <p className="text-slate-600">
                  Total Rent:{" "}
                  <span className="font-semibold text-slate-900">
                    ₹{totalRent.toLocaleString()}
                  </span>
                </p>

                <p className="text-slate-600">
                  Total Expenses:{" "}
                  <span className="font-semibold text-red-600">
                    ₹{totalExpense.toLocaleString()}
                  </span>
                </p>

              </div>

            </div>

            {/* NO RECORDS */}
            {records.length === 0 ? (

              <div className="border border-slate-200 rounded-xl p-10 text-center">

                <p className="text-slate-500">
                  No records available.
                </p>

                <p className="text-sm text-slate-400 mt-2">
                  Admin can add rent and expense records from the dashboard.
                </p>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <FaUserShield />
                  Admin Login
                </Link>

              </div>

            ) : (

              /* TABLE */
              <div className="overflow-x-auto border border-slate-200 rounded-xl">

                <table className="w-full min-w-225">

                  <thead className="bg-blue-50">

                    <tr>

                      <th className="text-left px-5 py-4 text-sm font-semibold text-slate-700">
                        Date
                      </th>

                      <th className="text-left px-5 py-4 text-sm font-semibold text-slate-700">
                        Description
                      </th>

                      <th className="text-left px-5 py-4 text-sm font-semibold text-slate-700">
                        Rent
                      </th>

                      <th className="text-left px-5 py-4 text-sm font-semibold text-slate-700">
                        Expense
                      </th>

                      <th className="text-left px-5 py-4 text-sm font-semibold text-slate-700">
                        Expense Description
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {records.map((record) => (

                      <tr
                        key={record._id}
                        className="border-t border-slate-200 hover:bg-slate-50 transition"
                      >

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {record.date}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-slate-900">
                          {record.description}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-700">
                          ₹{Number(record.rent || 0).toLocaleString()}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-700">
                          ₹{Number(record.expense || 0).toLocaleString()}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {record.expenseDescription || "-"}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        </div>

      </main>

    </div>
  );
}

export default Home;

