import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployee(data.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="p-6 mx-auto text-lg rounded-md w-80 bg-gray-50">
      <div className="flex flex-col items-center my-2">
        <img
          src={`${employee.image}`}
          alt="Profile"
          className="rounded-full w-36"
        />{" "}
        <h2 className="text-xl font-semibold">{employee.name}</h2>
      </div>
      <p className="py-2 font-medium text-gray-700">
        Email: <span className="font-normal"> {employee.email}</span>
      </p>
      <p className="py-2 font-medium text-gray-700">
        Mobile: <span className="font-normal">{employee.mobile}</span>
      </p>
      <p className="py-2 font-medium text-gray-700">
        Designation: <span className="font-normal">{employee.designation}</span>
      </p>
      <p className="py-2 font-medium text-gray-700">
        Gender: <span className="font-normal">{employee.gender}</span>
      </p>
      <p className="py-2 font-medium text-gray-700">
        Course: <span className="font-normal">{employee.course}</span>
      </p>
    </div>
  );
};

export default EmployeeDetails;
