import React, { useState, useEffect } from "react";
import { paymentAPI, coursesAPI } from "../../services/api";
import { format } from "date-fns";
import toast from "react-hot-toast";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Get payment history from dedicated endpoint
        const paymentData = await paymentAPI.getPaymentHistory();

        // Fetch course details for each payment
        const paymentsWithCourses = await Promise.all(
          paymentData.map(async (payment) => {
            try {
              if (payment.product) {
                const course = await coursesAPI.getById(payment.product);
                return { ...payment, ...course };
              }
              return payment;
            } catch {
              return payment;
            }
          })
        );

        setPayments(paymentsWithCourses);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        toast.error("Failed to load payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Payment History</h1>

      {payments.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">💳</div>
          <h2 className="text-xl font-semibold mb-2">No Payments Yet</h2>
          <p className="text-gray-600">
            Your payment history will appear here after you enroll in courses.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment.enrollment_id || payment._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      {payment.image && (
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={payment.image} alt={payment.skillName} />
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="font-bold">
                          {payment.skillName || "Course"}
                        </div>
                        <div className="text-sm opacity-50">
                          {payment.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold text-primary">
                    ${payment.amount_paid || payment.price || "N/A"}
                  </td>
                  <td>
                    {payment.paid_at
                      ? format(new Date(payment.paid_at), "MMM dd, yyyy")
                      : payment.enrolled_at
                      ? format(new Date(payment.enrolled_at), "MMM dd, yyyy")
                      : "N/A"}
                  </td>
                  <td>
                    <span className="badge badge-success gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-4 h-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Paid
                    </span>
                  </td>
                  <td className="font-mono text-xs">
                    {payment.payment_intent_id
                      ? `...${payment.payment_intent_id.slice(-8)}`
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Card */}
      {payments.length > 0 && (
        <div className="mt-8">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Payments</div>
              <div className="stat-value text-primary">{payments.length}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Spent</div>
              <div className="stat-value text-secondary">
                $
                {payments
                  .reduce((sum, p) => sum + (p.amount_paid || p.price || 0), 0)
                  .toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
