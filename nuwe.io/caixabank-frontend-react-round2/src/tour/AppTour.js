import React, { createContext, useContext, useState } from "react";

// Create context
const TourContext = createContext();

// Tour steps configuration
const tourSteps = [
  {
    id: 1,
    target: "portfolio-section",
    title: "Investment Portfolio",
    content: "View and manage your investments across different asset types.",
    placement: "bottom",
  },
  {
    id: 2,
    target: "filter-select",
    title: "Filter Investments",
    content: "Filter your investments by type: Stocks, Crypto, or Funds.",
    placement: "bottom",
  },
  {
    id: 3,
    target: "loan-calculator",
    title: "Loan Calculator",
    content: "Calculate monthly payments and total costs for your loans.",
    placement: "top",
  },
  {
    id: 4,
    target: "currency-converter",
    title: "Currency Converter",
    content:
      "Convert between different currencies with real-time exchange rates.",
    placement: "top",
  },
];

export const TourProvider = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startTour = () => {
    setIsTourActive(true);
    setCurrentStep(0);
  };

  const endTour = () => {
    setIsTourActive(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const value = {
    isTourActive,
    currentStep,
    currentStepData: tourSteps[currentStep],
    totalSteps: tourSteps.length,
    startTour,
    endTour,
    nextStep,
    prevStep,
  };

  return (
    <TourContext.Provider value={value}>
      {children}
      {isTourActive && (
        <TourOverlay
          step={tourSteps[currentStep]}
          onNext={nextStep}
          onPrev={prevStep}
          onClose={endTour}
          currentStep={currentStep + 1}
          totalSteps={tourSteps.length}
        />
      )}
    </TourContext.Provider>
  );
};

// Custom hook to use the tour context
export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};

// Tour overlay component
const TourOverlay = ({
  step,
  onNext,
  onPrev,
  onClose,
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="tour-overlay">
      <div
        className="tour-highlight"
        style={{
          position: "absolute",
          zIndex: 1000,
          padding: "20px",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          ...(step.placement === "top" ? { bottom: "20px" } : { top: "20px" }),
        }}
      >
        <h3>{step.title}</h3>
        <p>{step.content}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div>
            <button onClick={onPrev} disabled={currentStep === 1}>
              Previous
            </button>
            <button onClick={onNext}>
              {currentStep === totalSteps ? "Finish" : "Next"}
            </button>
          </div>
          <button onClick={onClose}>Skip Tour</button>
          <span>
            {currentStep} / {totalSteps}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TourProvider;
