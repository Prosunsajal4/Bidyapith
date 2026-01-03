import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const CheckoutForm = ({ course, clientSecret, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const card = elements.getElement(CardElement);

    if (!card) {
      setError("Card element not found");
      setProcessing(false);
      return;
    }

    try {
      // Confirm the payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
          },
        });

      if (confirmError) {
        setError(confirmError.message);
        toast.error(confirmError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent.id);
        toast.success("Payment successful!");
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary */}
      <div className="bg-base-200 rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span>{course?.skillName}</span>
          <span className="font-bold text-primary">${course?.price}</span>
        </div>
      </div>

      {/* Card Input */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Card Details</span>
        </label>
        <div className="border rounded-lg p-4 bg-white">
          <CardElement options={cardStyle} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
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
          <span>{error}</span>
        </div>
      )}

      {/* Test Card Info */}
      <div className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <p className="font-medium">Test Mode</p>
          <p className="text-sm">
            Use card: 4242 4242 4242 4242, any future date, any CVC
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn btn-primary flex-1"
        >
          {processing ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </>
          ) : (
            `Pay $${course?.price}`
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost"
          disabled={processing}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
