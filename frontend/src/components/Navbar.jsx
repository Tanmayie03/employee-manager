import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const navigate = useNavigate;
  return (
    <nav className="flex justify-between w-full px-4 py-4 text-white shadow-md bg-blue-950">
      <h1 className="text-lg">Welcome Admin</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-1 text-lg rounded hover:bg-blue-900">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
