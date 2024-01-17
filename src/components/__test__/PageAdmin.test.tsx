import React from 'react';
import { render, screen } from '@testing-library/react';
import PageAdmin from '../PageAdmin';

  test("PageAdmin", () => {

    render(<PageAdmin />);

    const pageAdmin = screen.getByText(/PageAdmin/i);
    expect(pageAdmin).toBeInTheDocument();
  });
