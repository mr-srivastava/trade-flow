import { Check, MapPin } from "lucide-react";
import React from "react";

const COUNTRIES = ["USA", "UAE", "UK", "Germany", "China", "Singapore"];
const BENEFITS = [
  "Direct access to international markets",
  "Local expertise in each region",
  "Streamlined customs procedures",
  "24/7 global support network",
];

export default function GlobalPresence() {
  return (
    <section id="global_presence" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-50 mb-4">
            Global Presence
          </h2>
          <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Operating across major economic hubs, we facilitate trade
            connections in key markets worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Operating Countries
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {COUNTRIES.map((country) => (
                <div
                  key={country}
                  className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg"
                >
                  <MapPin className="w-6 h-6 text-brand" />
                  <span className="font-medium">{country}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Global Network Benefits
              </h4>
              <ul className="space-y-4">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-brand" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
