import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorFallback from '../../ErrorFallback';

  test("Error Fehler", () => {
    const testError = new Error("Gurkensalat");
    testError.stack = "Toastbrot";

    render(<ErrorFallback error={testError} />);

    const error = screen.getByText(/Error Message/i);
    expect(error).toBeInTheDocument();

    const errorstack = screen.getByText(/Error Stack/i);
    expect(errorstack).toBeInTheDocument();
  });