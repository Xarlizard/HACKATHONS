import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Portfolio from '../components/Portfolio/Portfolio';
import useFetch from '../hooks/useFetch';

// Mock the useFetch hook
jest.mock('../hooks/useFetch');

describe('Portfolio Component', () => {
  // Test 1: Verify useFetch is called with correct URL
  test('calls useFetch with correct URL', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    render(<Portfolio />);
    expect(useFetch).toHaveBeenCalledWith('/data/investments.json');
  });

  // Test 2: Display loading spinner while data is loading
  test('displays loading spinner when data is loading', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    });

    render(<Portfolio />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  // Test 3: Render portfolio components when data is loaded
  test('renders portfolio components when data is loaded', async () => {
    const mockData = {
      investments: [
        {
          name: 'AAPL',
          type: 'Stocks',
          value: 150.5,
          dailyChange: 2.5,
          totalChange: 15.3,
          history: [
            { date: '2023-01-01', value: 140 },
            { date: '2023-01-02', value: 145 }
          ]
        }
      ]
    };

    useFetch.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null
    });

    render(<Portfolio />);

    await waitFor(() => {
      // Check if title is rendered
      expect(screen.getByText('Investment Portfolio')).toBeInTheDocument();
      
      // Check if filter select is rendered
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      
      // Check if asset data is displayed
      expect(screen.getByText('AAPL')).toBeInTheDocument();
      expect(screen.getByText('Stocks')).toBeInTheDocument();
    });
  });

  // Test 4: Display error message when fetching fails
  test('displays error message when fetching fails', () => {
    const errorMessage = 'Failed to fetch data';
    useFetch.mockReturnValue({
      data: null,
      isLoading: false,
      error: errorMessage
    });

    render(<Portfolio />);
    
    const errorElement = screen.getByTestId('error-message');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(errorMessage);
  });
});
