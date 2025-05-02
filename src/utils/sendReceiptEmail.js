import nodemailer from "nodemailer";
import config from "../common/config.js";

const transporter = nodemailer.createTransport({
  secure:true,
  host:'smtp.gmail.com',
  auth: {
    user: config.EMAIL_USERNAME,  // ✅ Correct
    pass: config.EMAIL_PASSWORD,  // ✅ Correct
  },
});

const sendReceiptEmail = async (toEmail,hotelName, booking) => {
  const mailOptions = {
    from: config.EMAIL_USERNAME,  // ✅ Corrected here
    to: toEmail,
    subject: "Booking Confirmation Receipt",
    html: `
      <h2>Booking Confirmed ✅</h2>
      <p>Thank you for booking with us! Here are your booking details:</p>
      <ul>
        <li><strong>Hotel:</strong> ${hotelName}</li>
        <li><strong>Guests:</strong> ${booking.guests}</li>
        <li><strong>Check-in:</strong> ${booking.startDate}</li>
        <li><strong>Check-out:</strong> ${booking.endDate}</li>
        <li><strong>Total Price:</strong> ₹${booking.totalPrice}</li>
      </ul>
      <p>We look forward to your stay!</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

export default sendReceiptEmail;
