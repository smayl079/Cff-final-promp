import React from 'react';

const icons = {
  MapPin: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Phone: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  Clock: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Mail: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
};

export default function ContactPage() {
  const faqs = [
    { q: "Do I need an appointment?", a: "While we accept walk-ins for minor repairs, we strongly recommend scheduling an appointment to ensure prompt service." },
    { q: "Do you offer loaner vehicles?", a: "Yes, we have a limited fleet of complimentary loaner cars available for major repairs requiring more than 24 hours." },
    { q: "What is your warranty?", a: "We provide a 24-month/24,000-mile nationwide warranty on parts and labor for most repairs." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Contact Hero */}
      <section className="bg-slate-900 pt-32 pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have a question about a repair? Need a quote? Our team is ready to provide the answers you need.
          </p>
        </div>
      </section>

      {/* Main Content Areas */}
      <section className="relative -mt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Form Details */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea rows="5" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="Provide details about your vehicle or inquiry..."></textarea>
                </div>
                <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
                  Send Message
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Info</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <icons.MapPin />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Our Location</p>
                      <p className="text-slate-600 mt-1">123 Service Blvd.<br/>Auto City, ST 12345</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <icons.Phone />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Phone</p>
                      <p className="text-slate-600 mt-1">Service: (555) 123-4567<br/>Towing: (555) 987-6543</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <icons.Mail />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <p className="text-slate-600 mt-1">hello@premiumauto.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 rounded-3xl p-8 shadow-lg shadow-blue-600/20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 blur-xl"></div>
                <div className="flex items-center gap-3 mb-6">
                  <icons.Clock />
                  <h3 className="text-xl font-bold">Business Hours</h3>
                </div>
                <ul className="space-y-3 font-medium text-blue-100">
                  <li className="flex justify-between border-b border-blue-500/50 pb-2"><span>Mon - Fri</span> <span className="text-white">7:30 AM - 6:00 PM</span></li>
                  <li className="flex justify-between border-b border-blue-500/50 pb-2"><span>Saturday</span> <span className="text-white">8:00 AM - 2:00 PM</span></li>
                  <li className="flex justify-between"><span>Sunday</span> <span className="text-white">Closed</span></li>
                </ul>
                <div className="mt-8 pt-6 border-t border-blue-500/50">
                  <p className="text-sm text-blue-200 mb-2">Need after-hours towing?</p>
                  <a href="tel:5559876543" className="text-lg font-bold text-white hover:text-blue-100 transition-colors">(555) 987-6543</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder & FAQ */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Map Area */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Find Us</h2>
              <div className="bg-slate-200 rounded-3xl w-full h-[400px] flex items-center justify-center overflow-hidden border border-slate-200 shadow-inner relative">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Pittsburgh,PA&zoom=13&size=800x400&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x333333&style=feature:landscape|element:all|color:0xf2f2f2&style=feature:poi|element:all|visibility:off&style=feature:road|element:all|saturation:-100|lightness:45&style=feature:road.highway|element:all|visibility:simplified&style=feature:road.arterial|element:labels.icon|visibility:off&style=feature:transit|element:all|visibility:off&style=feature:water|element:all|color:0xc8d7d4&style=feature:water|element:geometry.fill|color:0xdfe6e5&key=YOUR_API_KEY_HERE')] bg-cover bg-center rounded-3xl"></div>
                <div className="z-10 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center">
                  <icons.MapPin />
                  <span className="font-semibold text-slate-800 mt-2">Interactive Map</span>
                  <span className="text-xs text-slate-500">Integration ready</span>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Common Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}