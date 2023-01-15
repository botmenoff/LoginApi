// import { func } from 'joi'

//Testeando el envio de emails
import nodemailer from 'nodemailer'

const sendEmail = async (req,res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    post: 587,
    secure: false,
    auth: {
      user: "alexa.lindgren35@ethereal.email",
      pass: "4VeEZp8HX26h5WBWP9"
    }
  })

  const mailOptions = {
    from: "Remitente",
    to: "marvenwhite60@gmail.com",
    subject: "Enviado desde nodemailer",
    text: "Testeando el envio de email"
  }

  transporter.sendMail(mailOptions, (error,info) => {
    if (error) {
      res.status(500).send(error.message)
    } else {
      res.status(200).res.json({"message": "Email enviado"})
    }
  })
}

const functions = {
  sendEmail
}

export default functions