const { compare } = require("bcrypt");
const generatetoken = require("../../utils/jwt");
const Employee = require("../../models/Employee");

const login = async (req, res) => {

    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(200).json({ message: "Falta email o password" })
        }
        const user = await Employee.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
        const response = await compare(password, user.password)
        if (!response) return res.status(400).json({ message: "Contraseña incorrecta" });
        const userData = user.toObject()
        delete userData.password

        const token = generatetoken(userData)
        res.cookie("token", token)
        return res.status(200).json(userData)

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "error en login" })
    }
}
module.exports = login