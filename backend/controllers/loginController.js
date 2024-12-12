import jwt from "jsonwebtoken";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
      return res.status(200).json({ success: true, token });
    }
  } catch (error) {
    return res
      .status(411)
      .json({ success: false, message: "Invalid Credentials" });
  }
};

export default loginUser;
