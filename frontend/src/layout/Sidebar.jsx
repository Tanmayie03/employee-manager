import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = "px-4 py-2 my-2 rounded w-full";

  return (
    <div className="w-64 p-6 text-white shadow-lg bg-blue-950">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <div className="w-full pt-6 my-4 border-t">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "decoration-gray-50 underline underline-offset-8"
                  : "hover:bg-blue-800"
              }`
            }>
            Home
          </NavLink>
        </div>
        <div className="pt-4">
          <NavLink
            to="/add-employee"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "decoration-gray-50 underline underline-offset-8"
                  : "hover:bg-blue-800"
              }`
            }>
            Create Employee
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
