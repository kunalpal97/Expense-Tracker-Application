import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-blue-50 p-4">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold">Welcome, {name} 👋</h1>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
