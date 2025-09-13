import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "akshaykumar880466@gmail.com",
        pass: "dfmwajcmtrelpnbk"
    }
})

export const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        text
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log("Mail send to ", to);
    } catch (error) {
        console.log("Failed to send Email", error)
    }
}