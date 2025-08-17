import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name"); // 👈 yaha name le raha hu

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Hey {name} 👋</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
