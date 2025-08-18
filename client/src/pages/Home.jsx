import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {name} 👋
        </h1>
        <p className="text-gray-600 mb-6">{email}</p>

        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-600 py-2 text-white font-semibold hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
