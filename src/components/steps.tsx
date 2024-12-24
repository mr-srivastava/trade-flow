interface Step {
  step: number;
  title: string;
  description: string;
}

interface StepsProps {
  steps: Step[];
}

export default function Steps({ steps }: StepsProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div key={step.step} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-brand flex items-center justify-center text-2xl font-bold text-primary-foreground mb-4">
              {step.step}
            </div>
            <h3 className="text-xl text-slate-50 font-semibold mb-2 text-center">
              {step.title}
            </h3>
            <p className="text-slate-300 text-center mb-4">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
