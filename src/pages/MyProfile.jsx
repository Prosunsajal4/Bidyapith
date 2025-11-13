import { useContext, useState } from "react";
import Loading from "./Loading";
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const MyProfile = () => {
  const { user, loading, updateUser } = useContext(AuthContext); // updateUser should be from AuthContext
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  if (loading) return <Loading></Loading>;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser({ displayName: name, photoURL: photo })
      .then(() => {
        toast.success("Profile updated successfully!");
        setEditMode(false);
      })
      .catch((err) => {
        toast.error("Failed to update profile!");
        console.log(err);
      });
  };

  return (
    <div>
      <Toaster position="top-right" />
      <Header></Header>
      <Navbar></Navbar>

      {user ? (
        <div className="text-center mt-5">
          <img
            src={
              user.photoURL
                ? user.photoURL
                : "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&fm=jpg&q=60&w=3000"
            }
            alt="User"
            className="w-[300px] border border-b-blue-900 p-5 mx-auto rounded-full"
          />
          <h2 className="text-center mt-2 text-xl font-semibold">
            {user.displayName}
          </h2>

          {/* Toggle Update Form */}
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="btn btn-info mt-4"
            >
              Update Profile
            </button>
          ) : (
            <form
              onSubmit={handleUpdate}
              className="flex flex-col items-center gap-3 mt-4"
            >
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-64"
                required
              />
              <input
                type="text"
                placeholder="Photo URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="input input-bordered w-64"
                required
              />
              <div className="flex gap-2 mt-2">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="btn btn-error"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <p className="text-center">No user information available</p>
      )}

      <div className="flex">
        <Link
          to="/"
          className="btn btn-secondary px-10 my-5 text-center mx-auto"
        >
          Back
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyProfile;
