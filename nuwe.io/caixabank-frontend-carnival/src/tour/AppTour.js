import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for the tour
const TourContext = createContext();

// Custom hook to use the tour context
export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};

// Define the tour steps
const tourSteps = [
  {
    id: "portfolio",
    title: "Investment Portfolio",
    content: "View and filter your investments by asset type.",
    target: ".portfolio-section",
  },
  {
    id: "loan-calculator",
    title: "Loan Calculator",
    content: "Calculate monthly payments and total repayment for loans.",
    target: ".loan-calculator-section",
  },
  {
    id: "currency-converter",
    title: "Currency Converter",
    content:
      "Convert between different currencies with real-time exchange rates.",
    target: ".currency-converter-section",
  },
];

// Tour Provider component
export const TourProvider = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Automatically start the tour when the component mounts
  useEffect(() => {
    startTour();
  }, []);

  // Start the tour
  const startTour = () => {
    setCurrentStep(0);
    setIsTourActive(true);
  };

  // End the tour
  const endTour = () => {
    setIsTourActive(false);
  };

  // Go to the next step
  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  // Go to the previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Get the current step data
  const getCurrentStep = () => {
    return tourSteps[currentStep];
  };

  // Context value
  const value = {
    isTourActive,
    currentStep,
    tourSteps,
    startTour,
    endTour,
    nextStep,
    prevStep,
    getCurrentStep,
  };

  return (
    <TourContext.Provider value={value}>
      {children}
      {isTourActive && <TourOverlay />}
    </TourContext.Provider>
  );
};

// Tour overlay component to display the tour UI
const TourOverlay = () => {
  const {
    isTourActive,
    getCurrentStep,
    nextStep,
    prevStep,
    endTour,
    currentStep,
    tourSteps,
  } = useTour();

  if (!isTourActive) return null;

  const step = getCurrentStep();

  return (
    <div className="tour-overlay">
      <div className="tour-popup" style={popupStyle}>
        <h3>{step.title}</h3>
        <p>{step.content}</p>
        <div className="tour-controls">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            style={buttonStyle}
          >
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            {currentStep + 1} / {tourSteps.length}
          </span>
          <button onClick={nextStep} style={buttonStyle}>
            {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
          </button>
          <button
            onClick={endTour}
            style={{ ...buttonStyle, marginLeft: "10px" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles for the tour components
const popupStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  zIndex: 1000,
  maxWidth: "400px",
};

const buttonStyle = {
  padding: "8px 16px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "0 4px",
};

export default TourProvider;
