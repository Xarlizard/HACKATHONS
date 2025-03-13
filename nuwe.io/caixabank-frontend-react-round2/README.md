Submission completed by [xarlizard](https://github.com/xarlizard)

# 💳 CaixaBank Frontend React - Round 2 🏦

### Category ➡️ Software

### Subcategory ➡️ React Frontend

### Difficulty ➡️ Medium

### Expected max solution time ➡️ 1.5 to 2 hours

---

## 🌐 Background

Welcome to the CaixaBank Lite Challenge!

You are part of CaixaBank Tech, the company within the CaixaBank group responsible for developing cutting-edge technology for financial services. In this challenge, you will enhance the CaixaBank Lite platform by implementing key features related to investments, loans, and currency conversion, as well as optimizing application performance and user experience.

Your challenge consists of completing six tasks. The first four will be evaluated automatically, while the last two will be manually reviewed by CaixaBank’s technical team. Ensure your solutions align with the requirements to maximize your score.

## 📂 Repository Structure

A repository tree is provided below and should not be modified. Everything you need to develop the challenge is already included.

```bash
caixabank-lite/
├── public/
│   ├── caixabank-icon.png
│   ├── index.html
│   └── data/
│        ├── exchangeRates.json
│        └── investments.json
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   ├── components/
│   │   ├── LoanCalculator/
│   │   │   ├── LoanCalculator.js
│   │   │   ├── LoanForm.js
│   │   │   └── LoanResults.js
│   │   ├── CurrencyConverter/
│   │   │   ├── CurrencyConverter.js
│   │   │   ├── CurrencyForm.js
│   │   │   └── ConversionResults.js
│   │   ├── Portfolio/
│   │   │   ├── Portfolio.js
│   │   │   ├── PortfolioList.js
│   │   │   └── PortfolioChart.js
│   │   └── shared/
│   │       └── LoadingSpinner.js
│   ├── hooks/
│   │   └── useFetch.js
│   ├── helpers/
│   │   └── getRandomColor.js
│   ├── test/
│   │   └── Portfolio.test.js
│   ├── tour/
│   │   └── AppTour.js
│   └── client-management-app/
│       ├── public/
│       │   └── index.html
│       ├── src/
│       │   ├── App.js
│       │   ├── index.css
│       │   ├── index.js
│       │   └── reportWebVitals.js
│       ├── package.json
│       └── README.md
├── babel.config.js
├── jest.config.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚠️ Important Notice

**Only the files explicitly mentioned in the tasks should be modified.**

**Do not remove any `data-testid` props from the components that are already created. These attributes are essential for automated testing and evaluation. Any changes or deletions could result in incorrect assessment of your implementation. Please ensure they remain intact.**

## 🎯 Tasks

The tasks are the following:

- **Task 1**: Implement the Investment Portfolio Page

- **Task 2**: Build a Loan Calculator

- **Task 3**: Currency Converter

- **Task 4**: Create a test file for the Portfolio Component

⚠️ **Attention: Tasks 5 and 6 are not automatically corrected and will be reviewed manually by the CaixaBank technical team. Before making the last push, make sure that you have not changed any of the functions of the tasks that do use automatic correction.**

- **Task 5**: Global App Tour Guide

- **Task 6**: Optimization task

---

### **Task 1: Implement the Investment Portfolio Page**

**Objective**: Build a page that displays a summary of the user’s investment portfolio.

#### Requirements:

- Display a list of investments with the following data:
  - Asset name (e.g., AAPL, ETH).
  - Current value.
  - Daily and total percentage changes.
- Add a **filter by asset type** (e.g., Stocks, Crypto, Mutual Funds).
- Render a **chart** using `chart.js` to show the historical performance of the total portfolio.

## **Portfolio.js**

Build the main component to display an investment portfolio with filtering capabilities.

### **File location**:

- `src/components/Portfolio/Portfolio.js`

### Prerequisite: Implement `useFetch` Custom Hook

Before using the `useFetch` custom hook in `Portfolio.js`, implement it in the file `src/hooks/useFetch.js`.

### **Steps**

1. **Purpose**:

   - Fetch data from a given URL.
   - Manage loading and error states.

2. **Basic Structure**:
   - The hook should return:
     - `data`: Fetched data from the URL.
     - `isLoading`: A boolean indicating if the data is still being fetched.
     - `error`: Any error encountered during the fetch operation.

### Portfolio.js Implementation

### **Steps**

1. **Fetch the Data**:

   - Use the `useFetch` custom hook to fetch data from `/data/investments.json`
   - Each investment contains name, type, value, dailyChange, totalChange, and history.

2. **Implement Filtering**:

   - Use the existing `Select` dropdown to allow users to filter investments by their `type`:
     - Filter options:
       - **All**: Displays all assets.
       - **Stocks**, **Crypto**, and **Funds**: Filter assets based on their type.
   - Dynamically update the displayed assets (`filteredAssets`) using the `.filter` method.

3. **Determine Visibility**:

   - Show the portfolio data only if:
     - Data is fetched successfully.
     - No errors are present.
     - Filtered assets are not empty.

4. **Render Child Components**:

   - Pass the filtered data (`filteredAssets`) to:
     - **`PortfolioChart`**: Visualizes portfolio trends and data.
     - **`PortfolioList`**: Displays a detailed list of investments.

5. **Handle Loading and Errors**:
   - Display a `LoadingSpinner` while data is being fetched.
   - Show an error message using the `Typography` component with the `data-testid="error-message"` prop if an error occurs.

## **PortfolioChart.js**

Display a line chart showing the historical performance of filtered investments.

### **File location**:

- `src/components/Portfolio/PortfolioChart.js`

### **Steps**

1. **Understand Chart.js Integration**:

   - Use `react-chartjs-2` for rendering the chart.
   - Use `chart.js` for registering components.

2. **Prepare Chart Data**:

   - **Datasets**: Create one dataset for each filtered investment:
     - `label`: Investment name and type.
     - `data`: Values from the `history` field.

3. **Style the Chart**:

   - Implement the function **getRandomColor** in the file `src/helpers/getRandomColor.js`. This function should generate a random hexadecimal color string, consisting of exactly 7 characters: a # followed by 6 valid hexadecimal digits (0-9, A-F).

   - Import the **getRandomColor** function and use it to dynamically set the `borderColor` for each dataset in the chart.

4. **Hints**:
   - Use `.map` to create datasets:
     ```javascript
     datasets: assets.map((asset) => ({
       label: `${asset.name} (${asset.type})`,
       data: asset.history.map((entry) => entry.value),
       borderColor: getRandomColor(),
       backgroundColor: "rgba(0,0,0,0)",
       fill: false,
     }));
     ```

## **PortfolioList.js**

Display the filtered investments in a table.

### **File location**:

- `src/components/Portfolio/PortfolioList.js`

### **Steps**

1. **Create a Table**:

   - Use Material-UI's `Table` component.
   - Include the following columns:
     - **Asset**: Name of the investment.
     - **Type**: Investment type (e.g., Stocks, Crypto).
     - **Value ($)**: Current value.
     - **Daily Change (%)**: Percentage change in value for the day.
     - **Total Change (%)**: Total percentage change in value.

2. **Display Investment Data**:
   - Iterate through the `assets` array and render each row.

---

### **Task 2: Build a Loan Calculator**

**Objective**: Create an interactive loan calculator to estimate monthly payments and total repayment.

#### Requirements:

- Create a form with the following fields:
  - Loan amount.
  - Annual interest rate (%).
  - Loan duration (in months or years).
- Display the calculated values:
  - Monthly payment.
  - Total repayment (principal + interest).

## **LoanCalculator.js**

Build the core logic for calculating the monthly payment and total payment for a loan.

### **File location**:

- `src/components/LoanCalculator/LoanCalculator.js`

### **Steps**

1. **Understand the Formulas**:

   - **Monthly interest rate**:  
     `monthlyRate = rate / 1200`
   - **Compounding factor**:  
     `factor = (1 + monthlyRate) ^ duration`
   - **Monthly payment**:  
     `monthlyPayment = (amount * monthlyRate * factor) / (factor - 1)`
   - **Total payment**:  
     `totalPayment = monthlyPayment * duration`

2. **Implement the `handleCalculate` Function**:

   - Extract `amount`, `rate`, and `duration` from the form.
   - Use the formulas above to calculate the results.
   - Update the states `monthlyPayment` and `totalPayment` using `setMonthlyPayment` and `setTotalPayment`.

3. **Hints**:
   - Use `Math.pow(base, exponent)` for exponentiation.
   - Ensure the states are updated after completing the calculations.
   - Verify that all components are correctly imported. If any are missing, add them to the import list.

## **LoanForm.js**

Create a form to collect user inputs and validate them.

### **File location**:

- `src/components/LoanCalculator/LoanForm.js`

### **Steps**

1. **Set Up Input Fields**:

   - Create three input fields:
     - **Loan Amount**
     - **Annual Interest Rate**
     - **Duration**
   - Bind these inputs to state variables using `onChange` handlers.

2. **Handle Validation**:

   - Check that all inputs are:
     - Non-empty.
     - Positive numbers.
   - Show an error message if validation fails.
   - Reset the error message when inputs become valid.

3. **Trigger Calculation**:

   - Pass the validated `amount`, `rate`, and `duration` to the `onCalculate` function when the "Calculate" button is clicked.

4. **Hints**:
   - Use `type="number"` to ensure numerical input.
   - Display the error using a `Typography` component when validation fails.

## **LoanResults.js**

Display the calculated loan results.

### **File location**:

- `src/components/LoanCalculator/LoanResults.js`

### **Steps**

1. **Format and Display Results**:

   - Use the props `monthlyPayment` and `totalPayment`.
   - Display results rounded to two decimal places using `.toFixed(2)`.

2. **Conditional Rendering**:
   - Ensure results are only displayed when both `monthlyPayment` and `totalPayment` are valid (i.e., not `null`).

## **Key Edge Cases**

- **Invalid Input Handling**:
  - Ensure negative or zero values are caught and show an error message.
  - Reset the error state when inputs become valid.
- **Input Types**:
  - Use `type="number"` for all input fields to simplify validation.

---

### **Task 3: Currency Converter**

**Objective**: Build a currency converter that allows users to convert between ten currencies and euros. Due to limitations in the backend system, the conversion logic must account for an intermediate conversion to USD, which is not currently handled server-side.

#### Background:

The Exchange's legacy backend currently supports direct conversions from USD to EUR but lacks the capability to convert other currencies directly to EUR. As a result, the frontend must handle all intermediate conversions to USD before converting to EUR. Additionally, a 2% fee must be applied to every conversion, emulating the bank's commission policy.

#### Requirements:

1. **Currency Selection**:
   - Provide a dropdown to select the currency of origin (e.g., GBP, JPY, CAD, AUD, CHF, USD).
   - The destination currency is fixed to EUR.
2. **Conversion Logic**:
   - If the origin currency is not USD:
     - Convert the amount to USD using mock exchange rates.
     - Convert the resulting USD amount to EUR.
   - If the origin currency is USD:
     - Directly convert USD to EUR using the provided rate.
3. **Fee Application**:
   - Deduct a 2% fee from the final converted amount.
4. **Amount Input**:
   - Provide an input field for the user to enter the amount to convert.
5. **Display**:
   - Show the final converted amount in EUR after applying the fee.

## **CurrencyConverter.js**

Build the main component that calculates and displays currency conversion results, including applied fees.

### **File location**:

- `src/components/CurrencyConverter/CurrencyConverter.js`

### **Instructions**

1. **Data Overview**:

   - Exchange rates are fetched from `exchangeRates.json`:
     - **`toUSD`**: Contains conversion rates for each currency to USD.
     - **`usdToEUR`**: The rate to convert USD to EUR.

2. **Steps to Implement**:

   - Validate the inputs:
     - Ensure the amount is positive.
     - Ensure a currency is selected.
   - Perform conversions:
     - Convert the entered amount to USD.
     - Convert the USD amount to EUR.
     - Apply a 2% fee to the EUR amount.

3. **State Management**:

   - Use `conversion` to store the calculated net amount (after deducting the fee).
   - Use `fee` to store the calculated fee.
   - Display errors using `conversionError` for input validation and `fetchError` for data fetch issues.

4. **Key Formulae**:

   - Convert to USD:
     ```
     USD Amount = Amount × Rate to USD
     ```
     If the selected currency is USD:
     ```
     USD Amount = Amount
     ```
   - Convert USD to EUR:
     ```
     EUR Amount = USD Amount × Rate USD to EUR
     ```
   - Calculate the fee:
     ```
     Fee = EUR Amount × 0.02
     ```
   - Calculate the net amount:
     ```
     Conversion = EUR Amount − Fee
     ```

5. **Show Results**:

   - Ensure results are only displayed when `conversion` and `fee` have valid values.
   - Combine any errors (`conversionError` and `fetchError`) into a single error message to display to the user.

6. **Hints**:
   - Extract the list of currencies from `rates.toUSD` after the data is loaded.
   - Ensure all required components are correctly imported and connected.

## **CurrencyForm.js**

Create a form for user input, allowing them to specify the amount and select a currency for conversion.

### **File location**:

- `src/components/CurrencyConverter/CurrencyForm.js`

### **Instructions**

1. **Input Fields**:

   - Ensure that the TextField type for "Amount" is set to "number".
   - Complete the value property to reflect the appropriate value for each TextField.
   - Complete the onChange handlers for each TextField to trigger the corresponding functions.

2. **Handling Input Changes**:

   - Update the local state when the user selects a currency or specifies an amount.

3. **Trigger Conversion**:
   - Call the `onConvert` function with the entered amount and selected currency when the user clicks "Convert."

## **ConversionResults.js**

Display the converted amount and the fee applied during the conversion.

### **File location**:

- `src/components/CurrencyConverter/ConversionResults.js`

### **Instructions**

1. **Result Structure**:

   - Show the converted amount in EUR.
   - Display the fee applied.

2. **Formatting**:
   - Use `.toFixed(2)` to format values to two decimal places.

## **Edge Cases**

- **Invalid Inputs**:

  - Handle cases where the amount is zero or negative.
  - Ensure a currency is selected.

- **Default Currency**:

  - Correctly handle the case where "USD" is the selected currency.

- **Precision**:
  - Format all displayed values to two decimal places for consistency.

---

### **Task 4: Portfolio Component Testing**

Write tests to verify the functionality of the `Portfolio` component and the `useFetch` custom hook. Use Jest and React Testing Library to implement the tests.

### **Instructions**

1. **Setup and Imports**:

   - Open the file `src/test/Portfolio.test.js`
   - Ensure the necessary libraries and components are imported:
     - `React`
     - `render`, `screen`, and `waitFor` from `@testing-library/react`
     - `Portfolio` from the components directory.
     - `useFetch` from the hooks directory.

2. **Mock the `useFetch` Hook**:

   - Use `jest.mock()` to mock the `useFetch` hook.
   - Ensure the mock allows you to control the return values of `useFetch`.

3. **Write the Following Tests**:

   - **Test 1: Ensure `useFetch` is called with the correct URL**:
     - Verify that `useFetch` is called with `"/data/investments.json"`
   - **Test 2: Display a loading spinner when data is loading**:
     - Mock `useFetch` to return `isLoading: true`.
     - Assert that the loading spinner is present in the DOM.
   - **Test 3: Render portfolio components when data is loaded**:
     - Mock `useFetch` to return valid asset data.
     - Verify that the `PortfolioChart` and `PortfolioList` components render correctly.
     - Ensure the title "Investment Portfolio" is displayed.
   - **Test 4: Display an error message when fetching data fails**:
     - Mock `useFetch` to return an error message.
     - Assert that the error message is displayed in the DOM.

4. **Hints**:
   - Use the `mockReturnValue` method to control the return values of the mocked `useFetch` hook.
   - For tests that require asynchronous actions (e.g., fetching data), use `waitFor` to ensure assertions are made after the component has updated.
   - Use `getByText` and `getByTestId` to locate elements in the DOM during testing.

---

### **Task 5: Global App Tour Guide** _(Manual Review)_

**Objective**: Create a global App Tour Guide to provide a guided walkthrough for different sections of the application. You may use **React’s Context API** or the **Nanostores** library to manage the tour state and logic.

### Requirements:

1. **Create and Configure a Tour State Management System**

   - Use the file `src/tour/AppTour.js` to implement the global state management for the tour.
   - You can use either React's Context API or Nanostores.
   - The tour state must include:

     - Whether the tour is active.
     - The current step of the tour.

   - Additionally, define methods to:
     - Start the tour.
     - Progress to the next or previous step.
     - End the tour.

2. **Create a Provider Component**

   - Use `src/tour/AppTour.js` to implement a provider component.
   - This provider should manage the global state for the tour and wrap only the components you can modify (`Portfolio`, `CurrencyConverter`, `LoanCalculator`, and their children).
   - This ensures the restriction of not modifying `App.js` is respected.

3. **Expose Tour State and Methods**

   - Allow any component in the application to:
     - Access the current tour state.
     - Trigger state changes (e.g., start the tour, move to the next step).
   - This enables each section (e.g., `Portfolio`, `CurrencyConverter`) to respond to and control the tour.

4. **Build Reactive Components**

   - Create components that dynamically respond to the tour state. Examples:
     - Highlight specific UI sections during certain steps.
     - Disable certain parts of the UI while the user is in a specific step.
     - Conditionally render content based on the tour's progress.

5. **Implement Tour Navigation Logic**

   - Provide functionality for navigating through the tour steps, including:
     - Advancing to the next step.
     - Returning to the previous step.
     - Finishing the tour.

6. **Optional Use of Nanostores**
   - You may choose Nanostores instead of React Context API for managing the tour state.
   - This approach might offer advantages in simplicity or performance, especially for managing global state across multiple components.

### **Testing Considerations**

- Ensure the App Tour Guide does not automatically activate during tests.
- Provide a mechanism (e.g., an environment variable or a specific prop) to disable the tour in test scenarios.

### **Additional Notes**

- Use `src/tour/AppTour.js` for implementing both the provider and the state management.
- Include comments in your code to explain the implementation and usage of the tour.

---

### **Task 6: Optimization Task** _(Manual Review)_

**Objective**: Optimize the performance of a React application located inside the `src/client-management-app` folder. This application handles a large dataset related to investments in various assets, such as stocks, cryptocurrencies, and funds.

### Requirements:

- **Project Location**
  - The application is located in the `src/client-management-app` folder.
  - This is a standalone application, completely independent from other tasks. You are free to modify it as needed.
  - To begin, navigate to the `src/client-management-app` folder and run the following command to install dependencies:
    ```bash
    npm install
    ```

### Goals:

1. **Enhance Rendering Speed**

   - Improve performance, especially when interacting with large datasets.

2. **Minimize Unnecessary Re-renders**

   - Refactor components to prevent redundant re-renders and improve overall efficiency.

3. **Measure and Log Render Times**
   - Use the React Profiler to record render times **before** and **after** optimizations.
   - Include this data in a README file to demonstrate the impact of your changes.

### Submission Checklist:

1. **Optimized Application**

   - Ensure the application feels significantly faster and more responsive.
   - Focus on optimization without rewriting components entirely.
   - Maintain its functionality for managing and filtering investments in various assets.

2. **Code in `client-management-app`**

   - All optimizations should be implemented directly in the `src/client-management-app` folder.
   - The repository will automatically exclude the `node_modules` folder from commits.

3. **README File**
   - Add a short README inside the `src/client-management-app` folder, describing:
     - The performance issues identified.
     - The optimizations implemented.
     - A summary of the before-and-after render times based on the React Profiler.

By the end of this task, the optimized investment management application must be available in the `src/client-management-app` folder, ready for submission and evaluation.

---

# 💫 Guides

A node version equal to or higher than 18 is required.

## Install project dependencies using npm:

You should be in the root directory and run the following command:

```bash
npm install
```

## Execute the project:

This will launch the application in your default web browser. If it does not open automatically, you can access the application at [http://localhost:3000](http://localhost:3000).

Run the following command:

```bash
npm start
```

## Execute your test file:

Run the following command:

```bash
npm test
```

You can check `package.json` to see which command is used in `npm test`.

---

# 📤 Submission

1. Solve the proposed tasks.
2. Continuously push the changes you have made.
3. Wait for the results.
4. Click **submit challenge** when you have reached your maximum score.

---

# 📊 Evaluation

The final score will be given according to whether or not the objectives have been met.

In this case, the challenge will be evaluated on **1600 points** (1200 task + 400 code quality) which are distributed as follows:

- **Task 1**: 300 points
- **Task 2**: 300 points
- **Task 3**: 300 points
- **Task 4**: 300 points
- **Code quality**: 400 points

---

# ❓ FAQs / Additional Information

In this case, as it is a more complex challenge, no tests are provided. But all the guidance needed to complete it is provided both within the README in tasks and within the code itself. Only the files proposed in the objectives should be modified. You are not allowed to modify anything other than the proposed files.

**Q1: What happens if I modify files that are not explicitly specified in the tasks?**

A1: The correction will fail because those changes will not be taken into account.

**Q2: Can I add resources that are not in package.json?**

A2: No, everything needed to complete the challenge is included.
