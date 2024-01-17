import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageProtokoll from '../PageProtokoll'; 
import { mockFetch } from './mockFetch'; 


// Sicherstellen, dass wir mit fetch arbeiten.
// Das fetch wird in beforeEach gemockt.
process.env.REACT_APP_REAL_FETCH = "true";

// 1000 is the default anyway
const MAX_TIMEOUT_FOR_FETCH_TESTS = Number.parseInt(process.env.MAX_TIMEOUT_FOR_FETCH_TESTS || "1000");

function waitForLonger(callback: () => void | Promise<void>) {
    return waitFor(callback, { timeout: MAX_TIMEOUT_FOR_FETCH_TESTS });
}

const orgLog = console.log;
const orgError = console.error;

beforeEach(() => {
    console.log = () => { };
    console.error = () => { };
    mockFetch();
});
afterEach(() => {
    console.log = orgLog;
    console.error = orgError;
});

  test("Loading Indikator", () => {
    render(
      <MemoryRouter>
        <PageProtokoll />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

 
