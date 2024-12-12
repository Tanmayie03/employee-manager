import { NavLink } from "react-router-dom";
import EmployeeList from "../components/EmployeeList";

const Home = () => {
  return (
    <div className="w-full p-6 rounded-md bg-gray-50">
      <nav className="flex justify-between pb-2">
        <h1 className="text-lg font-semibold text-blue-950">
          Employee Management{" "}
        </h1>
        <NavLink
          to="/add-employee"
          className="px-4 py-2 text-white rounded-md bg-blue-950">
          Add Employee
        </NavLink>
      </nav>
      <EmployeeList />
    </div>
  );
};

export default Home;
