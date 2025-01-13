import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Step {
  label: string;
  component: () => ReactNode;
  onClick: () => void;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
  stepCircleClassName?: string;
  activeStepClassName?: string;
  activeLineClassName?: string;
  inactiveLineClassName?: string;
  inactiveStepClassName?: string;
}

const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  stepCircleClassName,
  activeStepClassName,
  inactiveStepClassName,
  activeLineClassName = "bg-primary",
  inactiveLineClassName = "bg-gray-300",
}: StepperProps) => {
  return (
    <div className="w-full flex items-center justify-center p-5">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center relative">
          <div className="flex flex-col items-center">
            <button
              className={twMerge(
                `w-10 h-10 rounded-full flex items-center justify-center 
              shadow-md transition-all duration-300 ease-in-out 
              ${
                index <= currentStep
                  ? activeStepClassName
                    ? activeStepClassName
                    : "bg-primary text-white"
                  : inactiveStepClassName
                  ? inactiveStepClassName
                  : "bg-neutral text-gray-700"
              }
              hover:bg-opacity-80`,
                stepCircleClassName
              )}
              onClick={() => {
                onStepClick(index);
                step.onClick();
              }}
            >
              {step.component()}
            </button>
            <span
              className={`mt-2 text-sm ${
                index <= currentStep ? " text-primary" : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className=" absoluteflex-1 mx-2 -mt-7">
              {" "}
              {/* Added horizontal margin */}
              <div
                className={`h-1 w-10 ${
                  index < currentStep
                    ? activeLineClassName
                    : inactiveLineClassName
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
