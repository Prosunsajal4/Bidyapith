import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaUsers,
  FaDollarSign,
  FaStar,
  FaChartLine,
  FaPlus,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { enrollmentsAPI, paymentAPI } from "../../services/api";
import toast from "react-hot-toast";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalEnrolled: 0,
    totalCourses: 0,
    totalSpent: 0,
    averageRating: 0,
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch enrolled courses
      const enrolled = await enrollmentsAPI.getMyEnrolled();
      const enrolledArr = Array.isArray(enrolled) ? enrolled : [];
      setEnrolledCourses(enrolledArr);

      // Fetch payment history
      const payments = await paymentAPI.getPaymentHistory();
      const paymentsArr = Array.isArray(payments) ? payments : [];

      // Calculate stats
      const totalSpent = paymentsArr.reduce(
        (sum, p) => sum + (p.amount_paid || p.price || 0),
        0
      );
      const avgRating =
        enrolledArr.length > 0
          ? enrolledArr.reduce((sum, c) => sum + (c.rating || 0), 0) /
            enrolledArr.length
          : 0;

      setStats({
        totalEnrolled: enrolledArr.length,
        totalCourses: enrolledArr.length,
        totalSpent: totalSpent.toFixed(2),
        averageRating: avgRating.toFixed(1),
      });

      // Generate category distribution data
      const categoryCount = {};
      enrolledArr.forEach((course) => {
        const cat = course.category || "Other";
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });
      const catData = Object.entries(categoryCount).map(([name, value]) => ({
        name,
        value,
      }));
      setCategoryData(catData);

      // Generate monthly enrollment data (simulated based on actual data)
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const monthData = months.map((month) => ({
        name: month,
        enrollments: Math.floor(Math.random() * 5) + enrolledArr.length,
        spending: Math.floor(Math.random() * 100) + 50,
      }));
      setMonthlyData(monthData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  const statsCards = [
    {
      title: "Enrolled Courses",
      value: stats.totalEnrolled,
      icon: <FaBookOpen className="text-3xl" />,
      color: "from-blue-500 to-blue-600",
      link: "/dashboard/my-enrolled",
    },
    {
      title: "Total Spent",
      value: `$${stats.totalSpent}`,
      icon: <FaDollarSign className="text-3xl" />,
      color: "from-green-500 to-green-600",
      link: "/dashboard/payment-history",
    },
    {
      title: "Average Rating",
      value: `${stats.averageRating}/5`,
      icon: <FaStar className="text-3xl" />,
      color: "from-yellow-500 to-yellow-600",
      link: "/courses",
    },
    {
      title: "Courses Added",
      value: stats.totalCourses,
      icon: <FaChartLine className="text-3xl" />,
      color: "from-purple-500 to-purple-600",
      link: "/dashboard/my-added",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <Link to="/dashboard/add-course" className="btn btn-primary gap-2">
          <FaPlus /> Add Course
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <Link key={index} to={card.link}>
            <div
              className={`card bg-gradient-to-br ${card.color} text-white shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm">{card.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                  </div>
                  <div className="p-2 bg-white/20 rounded-lg">{card.icon}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Monthly Enrollments */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Monthly Activity</h2>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="enrollments"
                    fill="#3b82f6"
                    name="Enrollments"
                  />
                  <Bar dataKey="spending" fill="#10b981" name="Spending ($)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-accent">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Pie Chart - Category Distribution */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">Course Categories</h2>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-accent">
                Enroll in courses to see category distribution
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Enrolled Courses Table */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-lg">Recent Enrolled Courses</h2>
            <Link to="/dashboard/my-enrolled" className="btn btn-sm btn-ghost">
              View All
            </Link>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledCourses.slice(0, 5).map((course, index) => (
                    <tr key={course._id || index}>
                      <td>
                        <div className="flex items-center gap-3">
                          {course.image && (
                            <div className="avatar">
                              <div className="mask mask-squircle w-10 h-10">
                                <img
                                  src={course.image}
                                  alt={course.skillName}
                                />
                              </div>
                            </div>
                          )}
                          <div className="font-medium">
                            {course.skillName || "Course"}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost">
                          {course.category || "N/A"}
                        </span>
                      </td>
                      <td className="font-semibold text-primary">
                        ${course.price || "N/A"}
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-500" />
                          {course.rating || "N/A"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <FaBookOpen className="text-4xl text-accent mx-auto mb-3" />
              <p className="text-accent">No enrolled courses yet</p>
              <Link to="/courses" className="btn btn-primary btn-sm mt-3">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
