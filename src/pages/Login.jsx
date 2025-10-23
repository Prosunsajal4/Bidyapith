import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Footer from "../components/Footer";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;
    return hasUppercase && hasLowercase && hasMinLength;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    if (!validatePassword(password)) {
      setError(
        "Password must have at least 6 characters, including uppercase and lowercase letters."
      );
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
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  return (
    <>
      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold text-2xl text-center mb-3">
            Login your account
          </h2>

          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="flex flex-col gap-3">
              {/* Email */}
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />

              {/* Password with toggle */}
              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input w-full pr-10"
                  placeholder="Password"
                  required
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

              {/* Forgot password */}
              <div className="text-right">
                <Link
                  to="/auth/forgot-password"
                  state={{ email: emailValue }}
                  className="link link-hover text-sm"
                >
                  Forgot password?
                </Link>
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              {/* Login button */}
              <button type="submit" className="btn btn-neutral mt-2">
                Login
              </button>

              {/* Login with Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-outline btn-info mt-3 flex items-center justify-center gap-2"
              >
                <FcGoogle size={20} /> Login with Google
              </button>

              <p className="font-semibold text-center pt-5 text-sm">
                Don't Have An Account?{" "}
                <Link className="text-secondary" to="/auth/register">
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
