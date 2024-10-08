const jwt = require("jsonwebtoken");
const User = require("../../models/Employee");
const { JWT_SECRET } = process.env;

const verifyToken = async (req, res) => {
  const { token } = req?.cookies;
  try {
    if (!token) {
      return res.status(401).json({
        message: "No hay token ",
      });
    }
    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expirado" });
        }
        return res.status(403).json({ message: "Token no válido" });
      }
      const userFound = await User.findOne({ email: user?.email });
      if (!userFound) {
        return res
          .status(401)
          .json({ message: "No se encuentra este usuario" });
      }
      const userData = userFound.toObject();
      delete userData.password;
      return res.status(200).json(userData);
    });
  } catch (error) {
    console.log("error");
    return res.status(500).json({ message: error });
  }
};
module.exports = verifyToken;
