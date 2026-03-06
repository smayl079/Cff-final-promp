import React from 'react';

const icons = {
  Oil: () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Brake: () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Engine: () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Tire: () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  Battery: () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  AC: () => <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  Check: () => <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
};

const services = [
  { id: 1, title: 'Full Synthetic Oil Change', desc: 'Premium oil change service including filter replacement, fluid top-off, and a comprehensive 21-point inspection.', price: 'Starting at $69', icon: icons.Oil },
  { id: 2, title: 'Brake Repair & Replacement', desc: 'Complete brake system inspection, pad replacement, and rotor resurfacing to ensure your vehicle stops safely.', price: 'Starting at $149', icon: icons.Brake },
  { id: 3, title: 'Engine Diagnostics', desc: 'State-of-the-art computer diagnostics to identify check engine light issues and engine performance problems.', price: 'Starting at $89', icon: icons.Engine },
  { id: 4, title: 'Tire Services', desc: 'Mounting, balancing, rotation, and flat repair services to maximize your tire life and driving safety.', price: 'Starting at $25', icon: icons.Tire },
  { id: 5, title: 'Battery & Starting Check', desc: 'Thorough testing of your battery, starter, and alternator to prevent unexpected breakdowns.', price: 'Free Inspection', icon: icons.Battery },
  { id: 6, title: 'A/C System Repair', desc: 'Refrigerant recharge, leak detection, and compressor repair to keep you cool during summer months.', price: 'Starting at $129', icon: icons.AC },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1613214149922-f18082260682?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900 z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wider mb-6 border border-blue-500/20">OUR EXPERTISE</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Premium Care for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Your Vehicle</span>
          </h1>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            From routine maintenance to complex engine diagnostics, our certified technicians deliver dealer-quality service without the dealer price tag.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all duration-200">Book Service Now</button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-semibold backdrop-blur-sm border border-white/10 transition-all duration-200">View Pricing Guide</button>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 relative isolate">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Comprehensive Services</h2>
            <p className="mt-4 text-lg text-slate-600">Everything your car needs to run smoothly, safely, and efficiently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-blue-100 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <service.icon />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow leading-relaxed">{service.desc}</p>
                
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-sm font-semibold text-slate-500">{service.price}</span>
                  <button className="text-blue-600 font-semibold text-sm flex items-center gap-1 group/btn">
                    Book Now
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Service / Why Choose Us */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0 relative">
              <div className="absolute inset-0 bg-blue-100 rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
              <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2670&auto=format&fit=crop" alt="Mechanic inspecting engine" className="rounded-3xl shadow-xl object-cover h-[500px] w-full" />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow">
                <p className="text-3xl font-extrabold text-blue-600">10k+</p>
                <p className="text-sm font-medium text-slate-600 mt-1">Engines Serviced</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">Why Trust Us With Your Vehicle?</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Modern vehicles are complex machines that require specialized knowledge and state-of-the-art diagnostic equipment. We invest heavily in our technology and our team to provide uncompromised quality.
              </p>
              
              <ul className="space-y-6">
                {[
                  'ASE Certified Master Technicians handling your repairs',
                  'Original Equipment Manufacturer (OEM) parts used',
                  '24-month / 24,000-mile nationwide warranty on all work',
                  'Transparent digital inspections sent directly to your phone'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                      <icons.Check />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 leading-snug">{item}</h4>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10">
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors duration-200">
                  Read Our Warranty Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}