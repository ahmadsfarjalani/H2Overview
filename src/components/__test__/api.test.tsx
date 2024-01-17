import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { mockFetch } from './mockFetch';
import { error } from 'console';
import { getAlleEintraege, getAlleProtokolle, getEintrag } from '../../backend/api';

// Sicherstellen, dass wir mit fetch arbeiten.
// Das fetch wird in beforeEach gemockt.
process.env.REACT_APP_REAL_FETCH = "true";


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


test("getAlleProtokolle anzahl", async () => {
    const protokolle = await getAlleProtokolle();
    expect(protokolle).toBeDefined();
    expect(protokolle.length).toBeGreaterThan(0);
  });

 
  
