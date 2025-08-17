import React from 'react';

const Testimonials = () => {
    return (
    <section class="bg-white py-16 px-6 mb-24">
        <div class="max-w-6xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-red-600 mb-4">Real Stories, Real Impact.</h2>
          <p class="text-gray-600 mb-12">Every donation makes a difference. Here’s how donors and recipients describe their experience.</p>
          
          <div class="grid gap-8 md:grid-cols-3">
            
            <div class="bg-red-50 p-6 rounded-2xl shadow">
              <img src="https://i.ibb.co.com/gM9zktYf/image.png" alt="Donor" class="w-20 h-20 object-cover rounded-full mx-auto mb-4" />
              <p class="text-gray-700 italic mb-4">"Donating blood was easier than I thought. Knowing I saved someone’s life is the best reward."</p>
              <h4 class="font-semibold text-red-700">– Rahim, Donor</h4>
            </div>
            
            <div class="bg-red-50 p-6 rounded-2xl shadow">
              <img src="https://i.ibb.co.com/ZkkS8vc/image.png" alt="Recipient" class="w-20 h-20 object-cover rounded-full mx-auto mb-4" />
              <p class="text-gray-700 italic mb-4">"After an accident, I needed blood urgently. Thanks to donors, I got a second chance."</p>
              <h4 class="font-semibold text-red-700">– Ayesha, Recipient</h4>
            </div>
            
            <div class="bg-red-50 p-6 rounded-2xl shadow">
              <img src="https://i.ibb.co.com/zVXdVJ2K/image.png" alt="Volunteer" class="w-20 h-20 object-cover rounded-full mx-auto mb-4" />
              <p class="text-gray-700 italic mb-4">"Volunteering at donation camps showed me the power of community. It’s inspiring."</p>
              <h4 class="font-semibold text-red-700">– Kabir, Volunteer</h4>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Testimonials;