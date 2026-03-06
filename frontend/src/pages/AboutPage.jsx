import React from 'react';

export default function AboutPage() {
  const stats = [
    { label: 'Years of Experience', value: '15+' },
    { label: 'Vehicles Serviced', value: '50,000+' },
    { label: 'Customer Satisfaction', value: '99%' },
    { label: 'Expert Technicians', value: '12' },
  ];

  const values = [
    { title: 'Honesty First', desc: 'We never recommend a service you don\'t need. Our transparent digital reports show you exactly what we see.' },
    { title: 'Technical Excellence', desc: 'We continuously train our staff on the newest automotive technologies to handle modern complex vehicles.' },
    { title: 'Customer Respect', desc: 'Your time is valuable. We focus on getting the job done right, efficiently, and keeping you informed.' },
  ];

  const team = [
    { name: 'Michael Rodriguez', role: 'Lead Diagnostic Technician', exp: '18 Years Experience' },
    { name: 'Sarah Jenkins', role: 'Service Manager', exp: '12 Years Experience' },
    { name: 'David Chen', role: 'Specialized Engine Mechanic', exp: '10 Years Experience' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* About Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-slate-50 overflow-hidden isolate">
        <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-slate-50 sm:-mr-80 lg:-mr-96"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Driven by Passion. <br/><span className="text-blue-600">Defined by Trust.</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-600">
              For over a decade, we've been redefining the auto repair experience. No jargon, no surprises—just premium service for people who care about their cars.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Stats */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Our Story</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                What started as a two-bay garage in 2011 has grown into a state-of-the-art automotive care center. Our founder noticed a gap in the industry: customers were forced to choose between the high prices of dealerships and the uncertain quality of quick-lube shops.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We bridge that gap. We combine dealership-level diagnostic equipment and expertise with the personalized, honest care of a local neighborhood shop.
              </p>
            </div>
            
            <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              
              <dl className="grid grid-cols-2 gap-x-8 gap-y-12 relative z-10">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col-reverse gap-y-2 border-l-2 border-slate-700 pl-4">
                    <dt className="text-sm leading-6 text-slate-400 font-medium">{stat.label}</dt>
                    <dd className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">The principles that guide every wrench turn and every customer conversation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <span className="text-xl font-bold text-blue-600">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet The Experts</h2>
              <p className="text-lg text-slate-600 max-w-xl">Our team holds the highest ASE certifications, ensuring your vehicle is in the most capable hands.</p>
            </div>
            <button className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-2">
              Join our team <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group">
                <div className="aspect-[4/5] w-full rounded-2xl bg-slate-200 overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/0 transition-colors duration-300"></div>
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-blue-600 font-medium my-1">{member.role}</p>
                <p className="text-slate-500 text-sm">{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}