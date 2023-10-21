const nodeMailer = require("nodemailer");
const protected = require("../protected");

const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: protected.emailAddress,
        pass: protected.password
    }
});

module.exports = async(email, OTP) => {
    const mailOptions = {
        from: {
            name: "Blue Fox Developers",
            address: protected.emailAddress
        },
        to: [email],
        subject: "Seat allocation system: Verify e-mail",
        text: "Thankyou for registering to Seat allocation system. This is the OTP you can use to verify your email.",
        html: `<h1>OTP for e-mail verification: ${OTP}</h1>`
    }
    try {
        transporter.sendMail(mailOptions);
        console.log("OTP sent.");
    }
    catch(error) {
        console.log("Something went wrong.");
    }
};