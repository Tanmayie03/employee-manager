import cloudinary from "../config/cloudinary.js";
import employeeModel from "../models/Employee.js";
import upload from "../middleware/multer.js";

const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file; // This will contain the uploaded file

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path);

    const newEmployee = new employeeModel({
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      designation: body.designation,
      gender: body.gender,
      course: body.course,
      image: result.secure_url, // Store the image URL from Cloudinary
    });

    const savedEmployee = await newEmployee.save();

    return res.status(200).json({
      success: true,
      message: "Employee added successfully",
      data: savedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add employee",
      error: error.message,
    });
  }
};

const displayEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    return res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve employees",
      error: error.message,
    });
  }
};

const removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmpolyee = await employeeModel.findByIdAndDelete(id);
    if (!deletedEmpolyee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove employee",
      error: error.message,
    });
  }
};

const singleEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve employee",
      error: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, course } = req.body;
    const employee = await employeeModel.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (name) employee.name = name;
    if (email) employee.email = email;
    if (mobile) employee.mobile = mobile;
    if (course) employee.course = course;

    const updatedEmployee = await employee.save();

    res.json({
      success: true,
      message: "User details updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export {
  createEmployee,
  displayEmployees,
  removeEmployee,
  singleEmployee,
  updateEmployee,
};
