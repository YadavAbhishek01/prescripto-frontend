import React from "react";

const ContactUs = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "b0e8d9f8-20d8-4596-b63e-1b9a9c5270d5");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json(); 

    if (data.success) {
      setResult("✅ Form submitted successfully!");
      event.target.reset();
    } else {
      console.error("Error:", data);
      setResult("❌ " + data.message);
    }
  };
 

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto bg-zinc-50 ">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
 
        <div className="space-y-6 bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-blue-700">Hospital Address</h1>
          <p className="text-gray-700">
            City Care Hospital <br />
            123 Wellness Avenue, <br />
            Downtown, New York, NY 10001
          </p>

          <h1 className="text-2xl font-semibold text-blue-700">Phone Numbers</h1>
          <p className="text-gray-700">
            <strong>Emergency (24/7):</strong> +1 (800) 123-4567 <br />
            <strong>General Inquiries:</strong> +1 (212) 555-7890 <br />
            <strong>Appointments:</strong> +1 (212) 555-7891
          </p>

          <h1 className="text-2xl font-semibold text-blue-700">Email</h1>
          <p>
            General Info:{" "}
            <a
              href="mailto:info@citycarehospital.com"
              className="text-blue-500 hover:underline"
            >
              info@prescriptohospital.com
            </a>
          </p>
          <p>
            Appointments:{" "}
            <a
              href="prescripto-hospital.netlify.app"
              className="text-blue-500 hover:underline"
            >
              prescripto-hospital.netlify.app
            </a>
          </p>
          <p>
            Billing:{" "}
            <a
              href="mailto:billing@citycarehospital.com"
              className="text-blue-500 hover:underline"
            >
              billing@prescriptohospital.com
            </a>
          </p>

          <h1 className="text-2xl font-semibold text-blue-700">Visiting Hours</h1>
          <p className="text-gray-700">Mon – Fri: 8:00 AM – 8:00 PM</p>
          <p className="text-gray-700">Saturday: 9:00 AM – 6:00 PM</p>
          <p className="text-gray-700">Sunday & Holidays: Closed</p>
        </div>

  
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Contact Us
          </h1>
          <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                required
                className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Phone</label>
              <input
                name="phone"
                type="tel"
                maxLength={10}
                placeholder="+91 234-567-8901"
                className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Your message..."
                required
                className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
          <span className="block mt-3 text-center text-sm text-gray-600">{result}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
