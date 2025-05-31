import { BaggageClaim, Banknote, CircleCheckBig, FileCheck2, Package, TrendingUpDown } from 'lucide-react';
import { HoverEffect } from '../ui/card-hover-effect';

export function Features() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20" id="features">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold text-slate-50 mb-6">
          Powerful Features for Global Trade
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Everything you need to streamline your import-export operations in one
          powerful platform
        </p>
      </div>
      <HoverEffect items={features} />
    </div>
  );
}
export const features = [
  {
    title: 'Sales & Order Management',
    description:
      'Streamline your order processing and track sales performance with our intuitive management system.',
    icon: <BaggageClaim className="text-sky-900" />,
  },
  {
    title: 'Documents AI',
    description:
      'Automate document processing with advanced AI technology for faster, error-free operations.',
    icon: <FileCheck2 className="text-sky-900" />,
  },
  {
    title: 'Shipment Tracking',
    description:
      'Real-time tracking and monitoring of your shipments across global supply chains.',
    icon: <Package className="text-sky-900" />,
  },
  {
    title: 'Predictive Analytics',
    description:
      'Make data-driven decisions with advanced analytics and forecasting capabilities.',
    icon: <TrendingUpDown className="text-sky-900" />,
  },
  {
    title: 'Secure Compliance',
    description:
      'Stay compliant with automated checks and security measures for international trade.',
    icon: <CircleCheckBig className="text-sky-900" />,
  },
  {
    title: 'Currency Management',
    description:
      'Handle multiple currencies with real-time conversion and risk management tools.',
    icon: <Banknote className="text-sky-900" />,
  },
];
