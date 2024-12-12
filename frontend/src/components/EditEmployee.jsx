import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    course: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployee(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        employee,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Employee updated successfully");
      navigate("/");
    } catch (error) {
      alert("Failed to update employee");
    }
  };

  return (
    <div className="p-6 rounded-md ">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 p-6 mx-auto my-4 rounded-md bg-gray-50">
        <h2 className="text-2xl font-semibold text-center text-blue-950">
          Edit Employee
        </h2>
        <div className="flex flex-col py-1">
          <label>Name</label>
          <input
            className="px-4 py-2 my-2 bg-white border border-gray-100 rounded outline-none "
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col py-1">
          <label>Email</label>
          <input
            className="px-4 py-2 my-2 bg-white border border-gray-100 rounded outline-none "
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col py-1">
          <label>Mobile</label>
          <input
            className="px-4 py-2 my-2 bg-white border border-gray-100 rounded outline-none "
            type="text"
            name="mobile"
            value={employee.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col py-1">
          <label>Course</label>
          <input
            className="px-4 py-2 my-2 bg-white border border-gray-100 rounded outline-none "
            type="text"
            name="course"
            value={employee.course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 mx-40 text-white rounded bg-blue-950">
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
