import React from "react";
import Steps from "../steps";
import { Button } from "../ui/button";

const steps = [
  {
    step: 1,
    title: "Sign Up",
    description:
      "Create your account and complete the simple onboarding process to get started.",
  },
  {
    step: 2,
    title: "Configure",
    description:
      "Set up your preferences and integrate with your existing systems.",
  },
  {
    step: 3,
    title: "Import Data",
    description:
      "Import your existing trade data or start fresh with our intuitive interface.",
  },
  {
    step: 4,
    title: "Go Live",
    description: "Start managing your global trade operations with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16  relative">
      <div className="max-w-6xl mx-auto px-8 py-20 flex flex-col items-center justify-center">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-slate-50 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Simple steps to transform your global trade operations
          </p>
        </div>
        <Steps steps={steps} />
        <Button
          size={"lg"}
          className="mt-10 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-lg hover:from-blue-500 hover:to-blue-300 transition-all duration-300"
        >
          Book Demo
        </Button>
      </div>
    </section>
  );
}
