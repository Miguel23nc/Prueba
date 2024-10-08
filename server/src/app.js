
const server = require("express")
const morgan = require("morgan")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const routes = require("./routes/index")
const bodyParser = require("body-parser")
const app = server()

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(server.json())
app.use("/api", routes)

module.exports = app