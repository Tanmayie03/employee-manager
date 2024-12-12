import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ onEmployeeAdded }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: null,
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEmployee({ ...employee, image: files[0] });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("mobile", employee.mobile);
    formData.append("designation", employee.designation);
    formData.append("gender", employee.gender);
    formData.append("course", employee.course);

    if (employee.image) {
      formData.append("image", employee.image);
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onEmployeeAdded(response.data.data);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-1/2 p-6 mx-auto my-4 bg-white rounded-md">
      <h2 className="pb-4 text-xl font-semibold text-center text-blue-950">
        Add Employee Entry
      </h2>

      <input
        className="w-full px-4 py-2 my-2 border border-gray-100 rounded outline-none bg-gray-50"
        type="text"
        name="name"
        value={employee.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <div className="flex gap-4">
        <input
          className="w-full px-4 py-2 my-2 border border-gray-100 rounded outline-none bg-gray-50"
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="w-full px-4 py-2 my-2 border border-gray-100 rounded outline-none bg-gray-50"
          type="text"
          name="mobile"
          value={employee.mobile}
          onChange={handleChange}
          placeholder="Mobile"
        />
      </div>
      <div className="flex gap-4">
        <input
          className="w-full px-4 py-2 my-2 border border-gray-100 rounded outline-none bg-gray-50"
          type="text"
          name="designation"
          value={employee.designation}
          onChange={handleChange}
          placeholder="Designation"
        />
        <input
          className="w-full px-4 py-2 my-2 border border-gray-100 rounded outline-none bg-gray-50"
          type="text"
          name="course"
          value={employee.course}
          onChange={handleChange}
          placeholder="Course"
        />
      </div>
      <input
        type="text"
        className="px-4 py-2 my-2 border border-gray-100 rounded outline-none bg-gray-50 "
        name="gender"
        value={employee.gender}
        onChange={handleChange}
        placeholder="Gender"
      />
      <label className="my-2 text-gray-500">Profile photo</label>
      <input type="file" name="image" onChange={handleChange} />
      <button
        type="submit"
        className="px-4 py-2 mx-auto my-4 text-white rounded outline-none bg-blue-950 w-fit">
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
