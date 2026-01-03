import { useContext, useState } from "react";
import Loading from "./Loading";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
} from "react-icons/fa";

const MyProfile = () => {
  const { user, loading, updateUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  if (loading) return <Loading />;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateUser({ displayName: name, photoURL: photo });
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error("Failed to update profile!");
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setName(user?.displayName || "");
    setPhoto(user?.photoURL || "");
    setEditMode(false);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary h-48 relative">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <main className="w-11/12 max-w-4xl mx-auto -mt-24 relative z-10 pb-16">
        {user ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-6 md:p-10">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-20 md:-mt-16 mb-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-base-100 shadow-xl overflow-hidden bg-base-200">
                    <img
                      src={
                        user.photoURL ||
                        "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(user.displayName || "User") +
                          "&size=200&background=random"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {editMode && (
                    <button className="absolute bottom-2 right-2 btn btn-circle btn-sm btn-primary">
                      <FaCamera />
                    </button>
                  )}
                </div>

                {/* Name & Email */}
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {user.displayName || "User"}
                  </h1>
                  <p className="text-accent flex items-center justify-center md:justify-start gap-2 mt-1">
                    <FaEnvelope className="text-sm" />
                    {user.email}
                  </p>
                </div>

                {/* Edit Button */}
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="btn btn-primary gap-2"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                )}
              </div>

              {/* Profile Content */}
              {editMode ? (
                /* Edit Form */
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="divider">Edit Profile Information</div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">
                          Display Name
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input input-bordered w-full pl-10"
                          required
                        />
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                      </div>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text font-medium">
                          Profile Photo URL
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          placeholder="https://example.com/photo.jpg"
                          value={photo}
                          onChange={(e) => setPhoto(e.target.value)}
                          className="input input-bordered w-full pl-10"
                        />
                        <FaCamera className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  {photo && (
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">
                          Photo Preview
                        </span>
                      </label>
                      <img
                        src={photo}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover border-2 border-base-300"
                        onError={(e) => {
                          e.target.src =
                            "https://ui-avatars.com/api/?name=Error&size=200";
                        }}
                      />
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="btn btn-primary gap-2"
                      disabled={saving}
                    >
                      {saving ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <FaSave />
                      )}
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="btn btn-ghost gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                /* Profile Info Display */
                <div className="space-y-6">
                  <div className="divider">Profile Information</div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <FaUser className="text-primary" />
                        </div>
                        <div>
                          <p className="text-accent text-sm">Display Name</p>
                          <p className="font-medium">
                            {user.displayName || "Not set"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <FaEnvelope className="text-primary" />
                        </div>
                        <div>
                          <p className="text-accent text-sm">Email Address</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <FaCalendar className="text-primary" />
                        </div>
                        <div>
                          <p className="text-accent text-sm">Account Created</p>
                          <p className="font-medium">
                            {formatDate(user.metadata?.creationTime)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <FaCalendar className="text-primary" />
                        </div>
                        <div>
                          <p className="text-accent text-sm">Last Sign In</p>
                          <p className="font-medium">
                            {formatDate(user.metadata?.lastSignInTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="divider">Quick Actions</div>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/dashboard" className="btn btn-outline btn-sm">
                      Go to Dashboard
                    </Link>
                    <Link
                      to="/dashboard/my-enrolled"
                      className="btn btn-outline btn-sm"
                    >
                      My Courses
                    </Link>
                    <Link to="/courses" className="btn btn-outline btn-sm">
                      Browse Courses
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center py-16">
              <p className="text-accent text-lg">
                No user information available
              </p>
              <Link to="/auth/login" className="btn btn-primary mx-auto mt-4">
                Login to Continue
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyProfile;
