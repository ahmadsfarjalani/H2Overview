import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { mockFetch } from './mockFetch';
import { error } from 'console';
import { getAlleEintraege, getAlleProtokolle, getEintrag, getProtokoll } from '../../backend/api';

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


test("mockFetch fehler", async () => {
    await expect(getEintrag("123123123")).rejects.toThrow("Error")
  })


test ("mockFetch", async () => {
    await expect(getProtokoll("1231231232")).rejects.toThrow("Error")

  })

  test("falsche id für getProtokoll", async () => {
    await expect(getProtokoll("gsndiogsgdjagsda")).rejects.toThrow("Validation error (params someID, value someValue)");
});

test("url test", async () => {
    const route =  `/api/protokoll/102/eintraege`;
    const response = await fetch(route);
    expect(response.status).toBe(404)
})





test('App', async () => {
    render(<MemoryRouter initialEntries={["/"]}>
        <App />
    </MemoryRouter>);

    await waitForLonger(() => {
        const title = screen.getAllByText(/Trinkprotokolle/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
});



test('App', async () => {
    render(<MemoryRouter initialEntries={["/"]}>
        <App />
    </MemoryRouter>);

    await waitForLonger(() => {
        const title = screen.getAllByText(/Castorp/i);
        expect(title.length).toBeGreaterThanOrEqual(2);
    });
});


test('getAlleProtokolle handles fetch errors gracefully', async () => {
    try {
      await getAlleProtokolle();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });



  