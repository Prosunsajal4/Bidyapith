import { useContext } from "react";
import Loading from "./Loading";
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router";

const MyProfile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading></Loading>;

  return (
    <div>
        <Header></Header>
      <Navbar></Navbar>
      {user ? (
        <div>
          <img
            src={user.photoURL}
            alt="User"
            className="w-[300px] border border-b-blue-900 p-5 mx-auto"
          />
          <h2 className="text-center mt-2">{user.displayName}</h2>
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
