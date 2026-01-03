import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { paymentAPI } from "../services/api";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Load Stripe outside of component to avoid recreating on each render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get course data from navigation state
  const course = location.state?.course;

  useEffect(() => {
    if (!course) {
      toast.error("No course selected for payment");
      navigate("/");
      return;
    }

    // Create payment intent
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await paymentAPI.createPaymentIntent({
          price: course.price,
          courseId: course._id || course.skillId,
          courseName: course.skillName,
        });
        setClientSecret(response.clientSecret);
      } catch (err) {
        console.error("Payment intent error:", err);
        setError(err.message);
        toast.error("Failed to initialize payment: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [course, navigate]);

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      // Confirm payment on backend and enroll
      await paymentAPI.confirmPayment({
        paymentIntentId,
        courseId: course._id || course.skillId,
      });
      toast.success("Enrollment successful!");
      navigate("/dashboard/my-enrolled");
    } catch (err) {
      console.error("Confirm payment error:", err);
      toast.error("Payment recorded but enrollment failed. Contact support.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#570df8",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-3">
        <Header />
      </header>

      <main className="flex-1 w-11/12 mx-auto py-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Complete Your Payment
          </h1>

          {/* Course Info Card */}
          <div className="card bg-base-100 shadow-xl mb-8">
            <figure className="h-48">
              <img
                src={course.image}
                alt={course.skillName}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{course.skillName}</h2>
              <p className="text-sm text-gray-600">by {course.providerName}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="badge badge-primary badge-lg">
                  {course.category}
                </span>
                <span className="text-2xl font-bold text-primary">
                  ${course.price}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <span className="ml-3">Initializing payment...</span>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-bold">Payment Error</h3>
                <p>{error}</p>
              </div>
              <button className="btn btn-sm" onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>
          ) : clientSecret ? (
            <div className="card bg-base-100 shadow-xl p-6">
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm
                  course={course}
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handleCancel}
                />
              </Elements>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
