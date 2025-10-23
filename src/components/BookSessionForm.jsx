import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const BookSessionForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Please fill out both fields!");
      return;
    }

    // Placeholder for actual form submission
    console.log("Form submitted:", { name, email });

    toast.success("Session booked successfully!");
    setName("");
    setEmail("");
  };

  return (
    <section className="w-11/12 max-w-md mx-auto my-16 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Book Session</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="bg-indigo-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-indigo-600 transition-colors"
        >
          Submit
        </button>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default BookSessionForm;
