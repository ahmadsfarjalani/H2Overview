import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageIndex from '../PageIndex';

  test("Loading Indikator testen", async () => {
    render(
      <MemoryRouter>
        <PageIndex />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

 




