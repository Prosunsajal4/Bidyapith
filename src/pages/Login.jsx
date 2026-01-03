import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FaUserSecret } from "react-icons/fa";
import Footer from "../components/Footer";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Demo credentials
  const demoCredentials = {
    email: "demo@bidyapith.com",
    password: "Demo123",
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;
    return hasUppercase && hasLowercase && hasMinLength;
  };

  const handleDemoLogin = () => {
    setEmailValue(demoCredentials.email);
    setPasswordValue(demoCredentials.password);
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    if (!validatePassword(password)) {
      setError(
        "Password must have at least 6 characters, including uppercase and lowercase letters."
      );
      setLoading(false);
      return;
    }

    // Proceed with login
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        setError(error.code);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        setError(error.code);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="flex justify-center min-h-screen items-center bg-base-200 py-10">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
          <div className="card-body">
            <h2 className="font-bold text-2xl text-center mb-2">
              Welcome Back! 👋
            </h2>
            <p className="text-center text-accent text-sm mb-6">
              Login to your account to continue learning
            </p>

            {/* Demo User Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn btn-outline btn-accent w-full gap-2 mb-4"
            >
              <FaUserSecret size={18} />
              Use Demo Credentials
            </button>

            <div className="divider text-xs text-accent">
              OR LOGIN WITH EMAIL
            </div>

            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Enter your email"
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                </div>

                {/* Password with toggle */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full pr-10"
                      placeholder="Enter your password"
                      required
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <HiOutlineEyeOff size={20} />
                      ) : (
                        <HiOutlineEye size={20} />
                      )}
                    </span>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="text-right">
                  <Link
                    to="/auth/forgot-password"
                    state={{ email: emailValue }}
                    className="link link-hover text-sm text-secondary"
                  >
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <div className="alert alert-error py-2">
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Login button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            <div className="divider text-xs text-accent">OR</div>

            {/* Login with Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full gap-2"
              disabled={loading}
            >
              <FcGoogle size={20} /> Continue with Google
            </button>

            <p className="text-center pt-6 text-sm">
              Don't have an account?{" "}
              <Link
                className="text-secondary font-semibold hover:underline"
                to="/auth/register"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
