import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) return;
    // Redirect user to Gmail to reset password
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-5">Reset Password</h2>

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <label>Email</label>
          <input
            type="email"
            className="input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-neutral">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
