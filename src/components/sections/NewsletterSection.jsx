import React, { useState } from "react";
import { FaPaperPlane, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing! 🎉");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="w-11/12 max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/20 rounded-full">
            <FaEnvelope className="text-4xl text-white" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Stay Updated with BidyaPith
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and get exclusive course updates, learning
          tips, and special discounts delivered straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
        >
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="input input-bordered w-full pl-10 bg-white/95 text-gray-800 placeholder:text-gray-500"
            />
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            type="submit"
            className="btn bg-white text-primary hover:bg-white/90 gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <FaPaperPlane />
            )}
            Subscribe
          </button>
        </form>

        <p className="text-white/70 text-sm mt-4">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
