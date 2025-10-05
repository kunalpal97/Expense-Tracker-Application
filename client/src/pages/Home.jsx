// src/pages/Home.jsx
export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <h1 className="text-2xl font-bold">Welcome, {user?.name} 👋</h1>
      <p className="text-gray-600 mt-2">
        Use the sidebar to navigate through your expense tracker.
      </p>
    </>
  );
}
