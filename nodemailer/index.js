const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const PORT = process.env.PORT;

const server = express();

const router = express.Router();

//Petición por param
router.get("/sendNewMail", (req, res, next) => {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  // Objeto de transporte responsable de establecer y configurar con el servidor
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

  //Configurar opciones
  const mailOptions = {
    from: email,
    to: "cmrbolsadevelopment@gmail.com",
    subject: "Confirmación",
    text: "Todo esta okey 👌🏽",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).json("Email sent: " + info.response);
    }
  });
});

server.use("/", router);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} 🚀`);
});
