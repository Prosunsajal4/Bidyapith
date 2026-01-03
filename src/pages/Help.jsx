import React, { useState } from "react";
import {
  FaSearch,
  FaBook,
  FaCreditCard,
  FaUserGraduate,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Header from "../components/Header";


const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      icon: <FaUserGraduate className="text-2xl" />,
      title: "Getting Started",
      description:
        "New to BidyaPith? Learn how to create an account and start learning",
      articles: [
        {
          title: "How to create an account",
          content:
            "Visit our registration page, fill in your details, and verify your email to get started.",
        },
        {
          title: "How to browse courses",
          content:
            "Go to the Courses page to see all available courses. Use filters to find courses by category, price, or rating.",
        },
        {
          title: "Understanding your dashboard",
          content:
            "Your dashboard shows your enrolled courses, payment history, and profile settings.",
        },
      ],
    },
    {
      icon: <FaBook className="text-2xl" />,
      title: "Courses & Learning",
      description: "Everything about courses, enrollments, and certificates",
      articles: [
        {
          title: "How to enroll in a course",
          content:
            "Click on any course, view details, and click 'Enroll Now'. Complete the payment to get instant access.",
        },
        {
          title: "Accessing course materials",
          content:
            "After enrollment, go to Dashboard > My Enrolled to access all your course materials.",
        },
        {
          title: "Getting your certificate",
          content:
            "Complete all course modules to receive your digital certificate, which can be shared on LinkedIn.",
        },
      ],
    },
    {
      icon: <FaCreditCard className="text-2xl" />,
      title: "Payments & Billing",
      description: "Payment methods, refunds, and billing questions",
      articles: [
        {
          title: "Accepted payment methods",
          content:
            "We accept all major credit cards (Visa, MasterCard, American Express) through our secure Stripe payment system.",
        },
        {
          title: "Refund policy",
          content:
            "We offer a 7-day money-back guarantee. Contact support within 7 days of purchase for a full refund.",
        },
        {
          title: "Viewing payment history",
          content:
            "Go to Dashboard > Payment History to see all your transactions and download receipts.",
        },
      ],
    },
  ];

  const toggleArticle = (catIndex, artIndex) => {
    const key = `${catIndex}-${artIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  const filteredCategories = helpCategories
    .map((category) => ({
      ...category,
      articles: category.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        category.articles.length > 0 ||
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-base-100">
      <header className="py-3">
        <Header />
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 text-white">
        <div className="w-11/12 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How can we help?
          </h1>
          <p className="text-white/90 mb-8">
            Search our help center or browse categories below
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="input input-bordered w-full pl-12 bg-white text-gray-800"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="w-11/12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Help Topics</h2>

          <div className="space-y-6">
            {filteredCategories.map((category, catIndex) => (
              <div key={catIndex} className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {category.title}
                      </h3>
                      <p className="text-accent text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {category.articles.map((article, artIndex) => (
                      <div
                        key={artIndex}
                        className="bg-base-100 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleArticle(catIndex, artIndex)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-base-200 transition-colors"
                        >
                          <span className="font-medium">{article.title}</span>
                          <span className="text-secondary">
                            {openIndex === `${catIndex}-${artIndex}` ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </span>
                        </button>
                        <div
                          className={`px-4 overflow-hidden transition-all duration-300 ${
                            openIndex === `${catIndex}-${artIndex}`
                              ? "max-h-40 pb-4"
                              : "max-h-0"
                          }`}
                        >
                          <p className="text-accent">{article.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-10">
              <p className="text-accent">
                No results found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-base-200">
        <div className="w-11/12 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-accent mb-8">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-primary gap-2">
              <FaEnvelope />
              Contact Support
            </a>
            <a href="tel:+1555123456" className="btn btn-outline gap-2">
              <FaPhone />
              Call Us
            </a>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Help;
