import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            About Trade<span className="text-brand">Flow</span>
          </h2>
          <div className="w-24 h-1 bg-brand mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-slate-50">
              Your Trusted Partner in Global Trade
            </h3>
            <p className="text-lg text-slate-300">
              Since 2005, ExportBridge has been at the forefront of
              international trade, facilitating seamless connections between
              buyers and sellers across the globe. Our expertise in export
              brokering has helped countless businesses expand their reach and
              achieve sustainable growth.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-50">
                    Expert Market Knowledge
                  </h4>
                  <p className="text-slate-300">
                    Deep understanding of international markets and trade
                    regulations
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-50">
                    Global Network
                  </h4>
                  <p className="text-slate-300">
                    Strong partnerships with verified suppliers and buyers
                    worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-brand"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-50">
                    Quality Assurance
                  </h4>
                  <p className="text-slate-300">
                    Rigorous quality control and verification processes
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-brand mb-2">15+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-brand mb-2">1000+</div>
              <div className="text-gray-600">Successful Deals</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-brand mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-brand mb-2">500+</div>
              <div className="text-gray-600">Active Clients</div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-400 to-brand text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Our Certifications</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="certification-badge">ISO 9001:2015</div>
            <div className="certification-badge">ISO 14001:2015</div>
            <div className="certification-badge">FIEO Member</div>
            <div className="certification-badge">DGFT Certified</div>
          </div>
        </div>
      </div>
    </section>
  );
}
