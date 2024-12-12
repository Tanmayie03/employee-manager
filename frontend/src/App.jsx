import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";
import EmployeePage from "./pages/EmployeePage";
import EmployeeList from "../src/components/EmployeeList";
import LoginPage from "./components/LoginPage";
import Sidebar from "./layout/Sidebar";
import Navbar from "./components/Navbar";
import EditEmployee from "./components/EditEmployee";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="flex w-full h-screen">
        {isAuthenticated && <Sidebar />}
        <div className="w-full">
          {isAuthenticated && <Navbar />}
          <div className="p-6">
            <Routes>
              {!isAuthenticated ? (
                <Route
                  path="*"
                  element={
                    <LoginPage setIsAuthenticated={setIsAuthenticated} />
                  }
                />
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/employees" element={<EmployeeList />} />
                  <Route path="/add-employee" element={<AddEmployee />} />
                  <Route path="/employee/:id" element={<EmployeePage />} />
                  <Route path="/employee/edit/:id" element={<EditEmployee />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
