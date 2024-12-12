import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/employee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data.data);
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setEmployees((prev) => prev.filter((employee) => employee._id !== id));
        alert("Employee deleted successfully.");
      } catch (error) {
        alert("Failed to delete employee.");
      }
    }
  };

  return (
    <div className=" pr-4 overflow-y-scroll h-[69vh]">
      <div className="grid justify-center grid-cols-4 gap-4 p-4 bg-gray-200 rounded-md shadow ">
        <p className="font-bold">Name</p>
        <p className="font-bold">Email</p>
        <p className="font-bold">Designation</p>
        <p className="font-bold text-end">Modify</p>
      </div>
      {employees.map((employee) => (
        <div
          key={employee._id}
          className="grid w-full grid-cols-4 px-4 py-2 my-3 bg-gray-100 rounded-lg shadow hover:bg-gray-50">
          <Link to={`/employee/${employee._id}`} className="my-2 ">
            <div className="flex items-center gap-4">
              <img
                src={employee.image}
                alt={`${employee.name}'s profile`}
                className="object-cover w-12 h-12 rounded-full"
              />
              <h1 className="font-semibold">{employee.name}</h1>
            </div>
          </Link>
          <Link to={`/employee/${employee._id}`} className="my-2 ">
            <h1 className="py-2 my-2">{employee.email}</h1>
          </Link>
          <h1 className="px-4 py-2 my-2">{employee.designation}</h1>
          <div className="flex items-center justify-end gap-4">
            <Link
              to={`/employee/edit/${employee._id}`}
              className="px-8 py-2 bg-gray-200 rounded hover:bg-gray-300 text-blue-950">
              Edit
            </Link>{" "}
            <h1
              onClick={() => handleDelete(employee._id)}
              className="px-6 py-2 text-base font-semibold text-white bg-red-500 rounded cursor-pointer hover:bg-red-600">
              Delete
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
