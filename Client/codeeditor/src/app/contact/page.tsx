import React from 'react'
import Header from "../Header";
import "@/cssFiles/homeanimations.css";



const Page = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-7 py-0 mt-4 content">
    <div className="wrapper bg-transparent rounded-lg md:w-full px-32 py-2 text-white fade-in">
        <section className="container mx-auto my-5 p-5 bg-white/10 shadow-lg rounded-md">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <form className='text-left'>
                <div className="mb-4">
                    <p className="block text-white text-sm font-medium mb-2">Your Name</p>
                    <input type="text" id="name"
                        className="w-full rounded-full border-none outline-none py-2 px-4 bg-[#1e293b] text-[#8f9eb3]"
                        placeholder="Enter your name" required />
                </div>
                <div className="mb-4">
                    <p className="block text-white text-sm font-medium mb-2">Your Email</p>
                    <input type="email" id="email"
                        className="w-full rounded-full border-none outline-none py-2 px-4 bg-[#1e293b] text-[#8f9eb3]"
                        placeholder="Enter your email" required />
                </div>
                <div className="mb-4">
                    <p className="block text-white text-sm font-medium mb-2">Message</p>
                    <textarea id="message"
                        className="w-full rounded-lg border-none outline-none py-2 px-4 bg-[#1e293b] text-[#8f9eb3]"
                        placeholder="Type your message here" rows={4} required></textarea>
                </div>
                <button type="submit"
                    className="btn w-full h-10 bg-[#00adf1] rounded-full outline-none cursor-pointer text-lg hover:bg-[#37bcf8] font-semibold text-white">Submit</button>
            </form>
        </section>
    </div>
    <div className="grid-shrink-0 mt-20 fade-in">
        <section className="contact-details flex flex-col items-center justify-center">
            <div className="mb-4">
                <h3 className="text-[#b5daff] text-2xl font-bold mb-2">Contact Number</h3>
                <p className="text-white">Phone: +91xxxxxxxxxx</p>
            </div>
        
            <div className="mb-4">
                <h3 className="text-[#b5daff] text-2xl font-bold mb-2">Email Address</h3>
                <p className="text-white">Email: name@gmail.com</p>
            </div>
        
            <div>
                <h3 className="text-[#b5daff] text-2xl font-bold mb-2">Location Address</h3>
                <p className="text-white">cvr college of engineering,ibrahimpatnam</p>
            </div>

            <div><br /><br /><br />
                <p className="text-[#b5daff] font-extralight">We cherish the opportunity to connect with you! Whether you have questions about our platform, suggestions to share, or just want to say hello, feel free to reach out.</p>
            </div>
        </section>
        
    </div>
</div>

<footer className="bg-[#1e293b80] text-white text-center py-4 mt-16">
    <p>&copy; 2024 Code Editor. All rights reserved.</p>
</footer></div>
  )
}

export default Page