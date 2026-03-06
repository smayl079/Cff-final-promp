import React from 'react';

const icons = {
  User: () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Phone: () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  Mail: () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Car: () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
  Calendar: () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
};

export default function AppointmentSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden isolate px-4 sm:px-6 lg:px-8">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Schedule Your Appointment
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Book your service in seconds. Premium care for your vehicle, peace of mind for you.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 backdrop-blur-sm overflow-hidden">
          <form className="p-8 sm:p-10 space-y-10">
            {/* 1. Personal Info */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">1</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <icons.User />
                    </div>
                    <input type="text" id="fullName" className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 bg-slate-50 hover:bg-white focus:bg-white" placeholder="John Doe" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <icons.Phone />
                    </div>
                    <input type="tel" id="phone" className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 bg-slate-50 hover:bg-white focus:bg-white" placeholder="(555) 123-4567" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <icons.Mail />
                    </div>
                    <input type="email" id="email" className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 bg-slate-50 hover:bg-white focus:bg-white" placeholder="john@example.com" />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* 2. Vehicle Info */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">2</span>
                Vehicle Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-slate-700 mb-1.5">Make</label>
                  <input type="text" id="make" className="block w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 bg-slate-50 hover:bg-white focus:bg-white" placeholder="e.g. Toyota" />
                </div>
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-slate-700 mb-1.5">Model</label>
                  <input type="text" id="model" className="block w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 bg-slate-50 hover:bg-white focus:bg-white" placeholder="e.g. Camry" />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-slate-700 mb-1.5">Year</label>
                  <input type="text" id="year" className="block w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 bg-slate-50 hover:bg-white focus:bg-white" placeholder="e.g. 2021" />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* 3. Appointment & Issue */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">3</span>
                Service Needs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700 mb-1.5">Service Type</label>
                  <select id="serviceType" className="block w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 bg-slate-50 hover:bg-white focus:bg-white appearance-none" defaultValue="">
                    <option value="" disabled>Select a service</option>
                    <option value="oil">Oil Change & Maintenance</option>
                    <option value="brake">Brake Service</option>
                    <option value="engine">Engine Diagnostics</option>
                    <option value="tires">Tire Rotation & Alignment</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <icons.Calendar />
                    </div>
                    <input type="date" id="date" className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">Issue Description</label>
                <textarea id="description" rows="4" className="block w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200 bg-slate-50 hover:bg-white focus:bg-white resize-none" placeholder="Please describe the issue or any specific noises/symptoms you've noticed..."></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col items-center gap-4">
              <button type="submit" className="w-full md:w-auto md:min-w-[280px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-8 rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                Confirm Appointment
              </button>
              <p className="text-sm text-slate-500">
                Prefer to talk? Call us directly at <a href="tel:5551234567" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">(555) 123-4567</a>
              </p>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
}