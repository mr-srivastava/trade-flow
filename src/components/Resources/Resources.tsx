import { FileDown, FileText } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Resources() {
  return (
    <section id="resources" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-50 mb-4">
            Export Resources
          </h2>
          <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Access valuable insights and information about international trade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-50 mb-6">
              Latest Articles
            </h3>

            <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <span className="text-sm text-brand font-medium">
                Trade Regulations
              </span>
              <h4 className="text-xl font-semibold mt-2 mb-3">
                Understanding International Trade Documentation
              </h4>
              <p className="text-gray-600 mb-4">
                A comprehensive guide to essential export documentation and
                compliance requirements.
              </p>
              <Link
                href="#"
                className="text-brand/85 font-medium flex items-center hover:text-brand"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-2"
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

            <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <span className="text-sm text-brand font-medium">
                Market Insights
              </span>
              <h4 className="text-xl font-semibold mt-2 mb-3">
                Global Market Trends 2024
              </h4>
              <p className="text-gray-600 mb-4">
                Explore emerging trends and opportunities in international trade
                markets.
              </p>
              <Link
                href="#"
                className="text-brand/85 font-medium flex items-center hover:text-brand"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-2"
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

          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  What documentation is required for exports?
                </h4>
                <p className="text-gray-600">
                  We provide comprehensive documentation support including
                  commercial invoices, bills of lading, certificates of origin,
                  and more.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  How do you ensure product quality?
                </h4>
                <p className="text-gray-600">
                  We implement strict quality control measures and work with
                  certified inspection agencies to verify product quality.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  What are your payment terms?
                </h4>
                <p className="text-gray-600">
                  We offer flexible payment options including L/C, T/T, and
                  other internationally accepted payment methods.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-brand rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Download Our Resources
              </h3>
              <p className="mb-6">
                Access our comprehensive product catalog and export procedures
                guide.
              </p>
              <div className="flex items-center gap-x-5">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand bg-white hover:bg-gray-50 transition-colors"
                >
                  <FileDown className="w-5 h-5 mr-2" />
                  Product Catalog
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand bg-white hover:bg-gray-50 transition-colors"
                >
                  <FileDown className="w-5 h-5 mr-2" />
                  Export Guide
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <FileText className="w-full h-48" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
