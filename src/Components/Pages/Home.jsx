import React from 'react';
import { Link } from 'react-router';
import { Search, FileEdit, HeartHandshake, CheckCircle } from 'lucide-react'
import Testimonials from '../Sections/Testimonials';
import QuickStats from '../Sections/Impact';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init();
const Home = () => {
    const handleContact=(e)=>{
      e.preventDefault()
      toast.success("Will Reach Out Soon!")
      e.target.reset()
    }

    const handleNewsletter=(e)=>{
      e.preventDefault()
      toast.success("Thanks For Subscribing!")
      e.target.reset()
    }
    return (
        <div className='w-full min-h-screen'>
            {/* banner */}
           <div className='bg-linear-to-r from-red-900 to-red-950 text-white h-170 flex flex-col text-center justify-center items-center'>
                <div data-aos='fade-up' data-aos-duration="1000" className='w-11/12'>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Donate Blood, Save Lives</h1>
                    <p className="text-md md:text-lg mb-8">Your donation can make a difference in someone's life. Join our community of blood donors and help save
                    lives in your area.
                    </p>
                </div>
                <div data-aos='fade-up' data-aos-duration="1000" className='flex space-x-5'>
                    <Link to='/register'><button className='btn btn-outline'>Join As Donor</button></Link> 
                   <Link to='/search'><button className='btn'>Search Donors</button></Link> 
                </div>
           </div>

     <section className='mt-20 w-11/12 max-w-screen-xl mx-auto mb-20'>
      <h2 className="text-3xl font-bold text-center mb-20 text-red-600">How Donation Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
                icon: <Search size={36} className="text-red-500" />,
                title: 'Find a Request',
                desc: 'Browse or search for active blood donation requests near you.',
                },
                {
                icon: <FileEdit size={36} className="text-red-500" />,
                title: 'View Details',
                desc: 'Check recipient info, location, and donation time before accepting.',
                },
                {
                icon: <HeartHandshake size={36} className="text-red-500" />,
                title: 'Donate Blood',
                desc: 'Meet the recipient at the provided hospital or clinic and donate.',
                },
                {
                icon: <CheckCircle size={36} className="text-red-500" />,
                title: 'Mark as Completed',
                desc: 'After successful donation, mark the request as "Done".',
            },
          ].map((feature, i) => (
            <div data-aos='fade-left' data-aos-duration="1000" key={i} className="bg-white shadow-sm rounded-xl p-6 text-center border border-base-300 hover:shadow-md transition">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* testimonials */}
      <Testimonials></Testimonials>
      {/* impact section */}
      <QuickStats></QuickStats>
      {/* 📞 Contact Us Section */}
      <section data-aos='fade-up' data-aos-duration="1000" className="mx-auto max-w-screen-xl p-10 rounded-xl bg-white text-red-600 mb-24">
         <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <form onSubmit={handleContact} className="space-y-4">
              <input type="text" placeholder="Your Name" required className="w-full px-4 py-2 border rounded-md" />
              <input type="email" placeholder="Your Email" required className="w-full px-4 py-2 border rounded-md" />
              <textarea rows="5" placeholder="Your Message" required className="w-full px-4 py-2 border rounded-md"></textarea>
              <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
                Send Message
              </button>
            </form>
            {/* Contact Info */}
            <div className="space-y-4 text-gray-700">
              <p><strong>📞 Phone:</strong> +880 1234 567890</p>
              <p><strong>📧 Email:</strong> support@blooddin.org</p>
              <p><strong>📍 Address:</strong> 123 Red Crescent Road, Dhaka, Bangladesh</p>
              <p>Feel free to contact us for any help or inquiries regarding donation or the platform.</p>
            </div>
          </div>
      </section>

      {/* newsletter section */}
      <section data-aos='fade-up' data-aos-duration="1000" className=" py-12 px-6 text-center pb-24">
        <h2 className="text-3xl font-bold text-red-600 mb-2">Stay Informed. Save Lives.</h2>
        <p className="text-gray-600 mb-6">Get updates on blood drives, donor stories, and health tips straight to your inbox.</p>
        
        <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
          <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 mb-4 sm:mb-0" required></input>
          <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-lg sm:rounded-l-none hover:bg-red-700 transition">Subscribe</button>
        </form>
        
        <p className="text-xs text-gray-500 mt-4">We respect your privacy. No spam, ever.</p>
      </section>

      </div>
    );
};

export default Home;