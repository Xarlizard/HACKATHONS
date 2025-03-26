import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Portfolio from "../components/Portfolio/Portfolio";
import useFetch from "../hooks/useFetch";

// Mock the useFetch hook
jest.mock("../hooks/useFetch");

describe("Portfolio Component", () => {
  // Test 1: Ensure useFetch is called with the correct URL
  test("calls useFetch with the correct URL", () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Portfolio />);

    expect(useFetch).toHaveBeenCalledWith("/data/investments.json");
  });

  // Test 2: Display a loading spinner when data is loading
  test("displays loading spinner when data is loading", () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Portfolio />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  // Test 3: Render portfolio components when data is loaded
  test("renders portfolio components when data is loaded", async () => {
    const mockData = [
      {
        name: "AAPL",
        type: "Stocks",
        value: 150.25,
        dailyChange: 2.5,
        totalChange: 15.75,
        history: [{ value: 145 }, { value: 150 }],
      },
      {
        name: "BTC",
        type: "Crypto",
        value: 45000,
        dailyChange: -1.2,
        totalChange: 120.5,
        history: [{ value: 44000 }, { value: 45000 }],
      },
    ];

    useFetch.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<Portfolio />);

    await waitFor(() => {
      expect(screen.getByText("Investment Portfolio")).toBeInTheDocument();
      expect(screen.getByText("AAPL")).toBeInTheDocument();
      expect(screen.getByText("BTC")).toBeInTheDocument();
    });
  });

  // Test 4: Display an error message when fetching data fails
  test("displays error message when fetching data fails", () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: false,
      error: "Failed to fetch data",
    });

    render(<Portfolio />);

    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
  });
});
