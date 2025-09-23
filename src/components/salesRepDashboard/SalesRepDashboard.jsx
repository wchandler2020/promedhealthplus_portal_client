import React, { useState, useEffect, useContext } from "react";
import {
  MdOutlineBookmarkAdded,
  MdOutlineShoppingBag,
  MdOutlinePersonOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdPictureAsPdf,
} from "react-icons/md";
import { AuthContext } from "../../utils/auth";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Register Chart.js components for bar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// Helper function to format the patient's name
const formatName = (fullName) => {
  if (!fullName || fullName.length <= 6) {
    return fullName;
  }
  const parts = fullName.split(' ');
  const formattedParts = parts.map(part => {
    if (part.length <= 6) {
      return part;
    }
    const firstThree = part.substring(0, 3);
    const lastThree = part.substring(part.length - 3);
    const middleAsterisks = '*'.repeat(part.length - 6);
    return `${firstThree}${middleAsterisks}${lastThree}`;
  });
  return formattedParts.join(' ');
};
// StatBox (simple numerical display)
const StatBox = ({ title, current, total, icon, color }) => (
  <div className={`flex items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105 animate-fade-in`}>
    <div className={`p-4 rounded-full bg-${color}-100 text-${color}-500 mr-4`}>
      {icon}
    </div>
    <div>
      <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
        {current}
        {total !== null && <span className="text-gray-400 dark:text-gray-400"> / {total}</span>}
      </p>
      <h3 className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{title}</h3>
    </div>
  </div>
);
// ChartStatBox (reusable bar chart stat box)
const ChartStatBox = ({ title, labels, data, colors }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart respects its container's size
    plugins: {
      legend: { display: false }, // Hide legend as titles are self-explanatory
      title: {
        display: true,
        text: title,
        font: { size: 14, weight: 'bold' },
        color: '#4B5563', // gray-600
      },
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1
            }
        }
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
      <div className="h-48 md:h-64"> {/* Fixed height for responsiveness on smaller screens */}
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
const SalesRepDashboard = () => {
  const { getSalesRepDashboardData } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPatients, setExpandedPatients] = useState({});
  const getIvrStatusColor = (status) => {
    switch (status) {
      case "Approved": return "bg-green-500 text-white";
      case "Pending": return "bg-yellow-500 text-white";
      case "Denied": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };
  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-500 text-white";
      case "Shipped": return "bg-blue-500 text-white";
      case "Pending": return "bg-yellow-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getSalesRepDashboardData();
      if (response.success) {
        setDashboardData(response.data);
      } else {
        setError("Failed to load dashboard data. Please try again.");
        console.error("Error fetching dashboard data:", response.error);
      }
      setLoading(false);
    };
    fetchData();
  }, [getSalesRepDashboardData]);
  const toggleOrders = (patientId) => {
    setExpandedPatients((prev) => ({
      ...prev,
      [patientId]: !prev[patientId],
    }));
  };
  const exportPDF = () => {
    const input = document.getElementById("dashboard-root");
    if (!input) return;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("SalesRepDashboard.pdf");
    });
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading dashboard data...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div id="dashboard-root" className="bg-white dark:bg-gray-900 min-h-screen p-8 transition-colors duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Sales Rep Dashboard
        </h2>
        <button
          onClick={exportPDF}
          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition flex items-center"
        >
          <MdPictureAsPdf size={24} className="mr-1" />
          Export PDF
        </button>
      </div>
      {/* Stat Boxes (global) */}
      {dashboardData?.stats?.summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatBox
            title="Total Orders"
            current={dashboardData.stats.summary.totalOrders}
            total={null}
            icon={<MdOutlineShoppingBag size={32} />}
            color="teal"
          />
          <StatBox
            title="Delivered Orders"
            current={dashboardData.stats.summary.deliveredOrders}
            total={dashboardData.stats.summary.totalOrders}
            icon={<MdOutlineShoppingBag size={32} />}
            color="blue"
          />
          <StatBox
            title="Total IVRs"
            current={dashboardData.stats.summary.totalIVRs}
            total={null}
            icon={<MdOutlineBookmarkAdded size={32} />}
            color="teal"
          />
          <StatBox
            title="Approved IVRs"
            current={dashboardData.stats.summary.approvedIVRs}
            total={dashboardData.stats.summary.totalIVRs}
            icon={<MdOutlineBookmarkAdded size={32} />}
            color="green"
          />
        </div>
      )}
      {/* Provider-Level Charts */}
      {dashboardData?.stats?.by_provider && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {dashboardData.stats.by_provider.map((provider) => (
            <div key={provider.provider_id} className="space-y-4">
              {/* <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{provider.provider_name}</h3> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ChartStatBox
                  title="Orders"
                  labels={["Delivered", "Pending"]}
                  data={[
                    provider.delivered_orders,
                    provider.total_orders - provider.delivered_orders,
                  ]}
                  colors={["#10B981", "#F59E0B"]} 
                />
                <ChartStatBox
                  title="IVRs"
                  labels={["Approved", "Other"]}
                  data={[
                    provider.approved_ivrs,
                    provider.total_ivrs - provider.approved_ivrs,
                  ]}
                  colors={["#3B82F6", "#E5E7EB"]}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-8">
        {dashboardData?.providers?.map((provider) => (
          <div key={provider.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <MdOutlinePersonOutline className="mr-2 text-teal-600 text-2xl" />
              <span>Provider: {provider.full_name}</span>
            </div>
            {provider.patients?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {provider.patients.map((patient) => {
                  const ordersToShow = expandedPatients[patient.id]
                    ? patient.orders
                    : patient.orders.slice(0, 3);
                  const hasMoreOrders = patient.orders.length > 3;
                  return (
                    <div key={patient.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                      <p className="text-md font-bold text-gray-900 dark:text-gray-100">Patient: {formatName(patient.full_name)}</p>
                      {/* IVRs */}
                      <div className="mt-3">
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">IVRs:</h4>
                        <ul className="list-none space-y-1">
                          {patient.ivrs?.length > 0 ? (
                            patient.ivrs.map((ivr) => (
                              <li key={ivr.id} className="flex items-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getIvrStatusColor(ivr.status)}`}>
                                  {ivr.status}
                                </span>
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">(IVR #{ivr.id})</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 dark:text-gray-400 text-sm">No IVRs</li>
                          )}
                        </ul>
                      </div>
                      {/* Orders */}
                      <div className="mt-3">
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Orders:</h4>
                        <ul className="list-none space-y-1">
                          {ordersToShow?.length > 0 ? (
                            ordersToShow.map((order) => (
                              <li key={order.id} className="flex items-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getOrderStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">(Order #{order.id})</span>
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(order.created_at).toLocaleDateString()}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 dark:text-gray-400 text-sm">No orders</li>
                          )}
                        </ul>
                        {hasMoreOrders && (
                          <button
                            onClick={() => toggleOrders(patient.id)}
                            className="mt-2 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                          >
                            {expandedPatients[patient.id] ? "See Less" : "See More"}
                            {expandedPatients[patient.id] ? <MdKeyboardArrowUp className="inline-block ml-1" /> : <MdKeyboardArrowDown className="inline-block ml-1" />}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center italic mt-4">No patients for this provider.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default SalesRepDashboard;