// API Service for Backend Integration
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Get auth token from Firebase user
const getAuthToken = async () => {
  try {
    const auth = getAuth(app);

    if (auth && auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      return token;
    }
    console.warn("No current user found in Firebase auth");
    return null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    console.log(
      `API Request: ${options.method || "GET"} ${API_BASE_URL}${endpoint}`
    );
    if (token) {
      console.log("Auth token found");
    } else {
      console.warn("No auth token available");
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message ||
        errorData.error ||
        `API Error: ${response.status} ${response.statusText}`;
      console.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Request Error:", {
      endpoint,
      method: options.method || "GET",
      error: error.message,
      stack: error.stack,
    });

    // Handle connection refused error
    if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("ERR_CONNECTION_REFUSED")
    ) {
      throw new Error(
        `Backend server is not running. Please start the backend server on ${API_BASE_URL}`
      );
    }

    throw error;
  }
};

// Courses API
export const coursesAPI = {
  // Get all courses (backend uses /products)
  getAll: () => apiRequest("/products"),

  // Get course by ID
  getById: (id) => apiRequest(`/products/${id}`),

  // Get top courses by rating -> backend provides latest-products
  getTopByRating: () => apiRequest(`/latest-products`),

  // Get courses by category (backend supports query param)
  getByCategory: (category) =>
    apiRequest(`/products?category=${encodeURIComponent(category)}`),

  // Create new course (backend expects /my-courses with auth)
  create: (courseData) =>
    apiRequest("/my-courses", {
      method: "POST",
      body: JSON.stringify(courseData),
    }),

  // Update course
  update: (id, courseData) =>
    apiRequest(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(courseData),
    }),

  // Delete course
  delete: (id) =>
    apiRequest(`/products/${id}`, {
      method: "DELETE",
    }),

  // Get user's added courses
  getMyAdded: () => apiRequest("/my-courses"),
};

// Enrollments API
export const enrollmentsAPI = {
  // Enroll in a course (backend uses /bids)
  enroll: async (courseId) => {
    // attach product id; if user available, include buyer_email
    try {
      const auth = getAuth(app);
      const buyerEmail = auth?.currentUser?.email || undefined;
      const body = { product: courseId };
      if (buyerEmail) body.buyer_email = buyerEmail;
      return await apiRequest("/bids", {
        method: "POST",
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error("enroll error", err);
      throw err;
    }
  },

  // Get user's enrolled courses
  getMyEnrolled: () => apiRequest("/enrolled-courses"),

  // Unenroll from a course (delete bid)
  unenroll: (enrollmentId) =>
    apiRequest(`/bids/${enrollmentId}`, {
      method: "DELETE",
    }),
};

// Payment API (Stripe)
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: (data) =>
    apiRequest("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Confirm payment and enroll
  confirmPayment: (data) =>
    apiRequest("/confirm-payment", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Get payment history
  getPaymentHistory: () => apiRequest("/payments"),
};

export default {
  courses: coursesAPI,
  enrollments: enrollmentsAPI,
  payment: paymentAPI,
};
