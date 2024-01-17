import React from 'react';
import { render, screen } from '@testing-library/react';
import PagePrefs from '../PagePrefs';
  test("PagePrefs", () => {
    render(<PagePrefs />);

    const pagePrefs = screen.getByText(/PagePrefs/i);
    expect(pagePrefs).toBeInTheDocument();
  });
