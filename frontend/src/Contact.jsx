import { useState } from "react"
import "./Contact.css"



export default function Contact() {

  const [result, setResult] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "9571b69f-2d0d-4054-b36b-30177750b394");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
  };
  return (
    <div className="contact-page">

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you </p>
      </div>

      <div className="contact-wrapper">

        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Email: support@onerestro.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Location: Kolkata, India</p>
        </div>


        <div className="contact-form">
          <h2>Send Message</h2>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Your Name" name="name" required />
            <input type="email" placeholder="Your Email" name="email" required />
            <textarea placeholder="Your Message" name="message" required></textarea>

            <button type="submit" >Send Message</button>
            <p>{result}</p>
          </form>
        </div>

      </div>
    </div>
  )
}