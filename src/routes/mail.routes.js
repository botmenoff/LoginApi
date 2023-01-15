import { Router } from "express";
// import Mail from "nodemailer/lib/mailer";
const router = Router()
import email from '../mailing/mail.js'

router.post('/email', email.sendEmail)
export default router;