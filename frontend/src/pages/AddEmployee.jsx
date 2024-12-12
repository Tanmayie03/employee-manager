import { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";

const AddEmployee = () => {
  const [addedEmployee, setAddedEmployee] = useState(null);

  const handleEmployeeAdded = (employee) => {
    setAddedEmployee(employee);
  };

  return (
    <div className="p-6 rounded-md bg-gray-50">
      <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
      {addedEmployee && (
        <div>Employee {addedEmployee.name} added successfully!</div>
      )}
    </div>
  );
};

export default AddEmployee;
