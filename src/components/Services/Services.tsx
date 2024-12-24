import { Box, ChartColumnBig, Check, CircleCheckBig } from "lucide-react";
import Link from "next/link";
import React from "react";

const SERVICES = [
  {
    icon: (
      <ChartColumnBig className="w-8 h-8 text-brand group-hover:text-white" />
    ),
    name: "Market Research",
    description:
      "Comprehensive market analysis and intelligence to identify opportunities and minimize risks.",
    details: ["Market Trend Analysis", "Competitor Research", "Price Analysis"],
  },
  {
    icon: <Box className="w-8 h-8 text-brand group-hover:text-white" />,
    name: "Trade Facilitation",
    description:
      "End-to-end support for seamless international trade operations.",
    details: [
      "Documentation Support",
      "Customs Clearance",
      "Logistics Coordination",
    ],
  },
  {
    icon: (
      <CircleCheckBig className="w-8 h-8 text-brand group-hover:text-white" />
    ),
    name: "Quality Assurance",
    description:
      "Rigorous quality control measures to ensure product excellence.",
    details: [
      "Product Inspection",
      "Quality Certification",
      "Compliance Verification",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-50 mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive export brokering solutions to streamline your
            international trade operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 bg-brand/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2 text-gray-600">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-brand" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-400 to-brand hover:from-blue-500 hover:to-[#0B8ED0] md:py-4 md:text-lg md:px-10"
          >
            Schedule a Consultation
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
