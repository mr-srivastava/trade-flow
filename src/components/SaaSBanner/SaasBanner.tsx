import { ArrowRight, BarChart2, Clock, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SaasBanner() {
  return (
    <div className="relative overflow-hidden bg-neutral-950 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4 leading-tight">
              Elevate Your Workflow with Trade
              <span className="text-brand">Flow</span> SaaS
            </h2>
            <p className="text-xl text-slate-300 mb-6">
              Seamlessly organize, optimize, and accelerate your business
              processes with our cutting-edge solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/trade-flow"
                className="bg-gradient-to-r from-blue-400 to-brand hover:from-blue-500 hover:to-[#0B8ED0] text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300 ease-in-out flex items-center justify-center group"
              >
                Explore Now
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-blue-100 font-medium">
                Limited time offer: 30-day free trial
              </p>
            </div>
          </div>
          <div className="md:w-1/2 md:ml-20 relative">
            <div className="relative">
              <Image
                src="/saas-screenshot.png?height=300&width=400"
                alt="WorkSmart SaaS Tool"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="absolute top-4 left-4 right-4 bottom-4 flex items-center justify-center">
              <div className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-6">
                  <div className="flex flex-col items-center">
                    <Clock className="text-brand h-8 w-8 mb-2" />
                    <span className="text-slate-300 text-sm">Save Time</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <BarChart2 className="text-brand h-8 w-8 mb-2" />
                    <span className="text-slate-300 text-sm">
                      Boost Efficiency
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Zap className="text-brand h-8 w-8 mb-2" />
                    <span className="text-slate-300 text-sm">
                      Increase Productivity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-slate-300 font-medium">
            Empowering over 10,000 businesses worldwide
          </p>
        </div>
      </div>
      <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-brand/90 opacity-10 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-brand/80 opacity-10 transform rotate-45"></div>
    </div>
  );
}
