import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PageEintrag from '../PageEintrag'; 
import { mockFetch } from './mockFetch';

beforeEach(() => {
  mockFetch(); 
});

afterEach(() => {
});

  test("Loading Indikator", () => {
    render(
      <MemoryRouter initialEntries={['/eintrag/1']}>
        <Routes>
          <Route path="/eintrag/:eintragId" element={<PageEintrag />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  

