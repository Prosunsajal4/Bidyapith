import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "Simply browse our course catalog, select the course you're interested in, click 'Enroll Now', and complete the payment process. You'll get instant access to all course materials.",
    },
    {
      question: "Can I access courses on mobile devices?",
      answer:
        "Yes! BidyaPith is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. Learn on the go, anytime, anywhere.",
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer:
        "Absolutely! Upon successful completion of any course, you'll receive a verified digital certificate that you can share on LinkedIn or add to your resume.",
    },
    {
      question: "What if I'm not satisfied with a course?",
      answer:
        "We offer a 7-day money-back guarantee. If you're not satisfied with your purchase, contact our support team within 7 days for a full refund.",
    },
    {
      question: "Can I become an instructor on BidyaPith?",
      answer:
        "Yes! If you have expertise in any field, you can apply to become an instructor. Go to your dashboard and click 'Add Course' to submit your course for review.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team through the Contact page, email us at support@bidyapith.com, or use the live chat feature available on the website.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 bg-base-200">
      <div className="w-11/12 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-secondary">Questions</span>
          </h2>
          <p className="text-accent max-w-2xl mx-auto">
            Find answers to common questions about BidyaPith
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-base-200 transition-colors"
              >
                <span className="font-semibold text-base md:text-lg pr-4">
                  {faq.question}
                </span>
                <span className="text-secondary flex-shrink-0">
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-accent">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
