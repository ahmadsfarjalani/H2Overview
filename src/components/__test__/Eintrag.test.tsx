import React from 'react';
import { render, screen } from '@testing-library/react';

import { Eintrag } from '../Eintrag';

  const mockEintrag = {
    erstellerName: "Ahmad Sfarjalani",
    getraenk: "Wasser",
    menge: 500,
    kommentar: "Ohne Kohlensäure",
    ersteller: "12345",
    createdAt: "2023-01-01T12:00:00",
    protokoll: "67890",
  };

  test("Eintrag", () => {
    render(<Eintrag eintrag={mockEintrag} />);
    expect(screen.getByText(/Ahmad Sfarjalani Eintrag/i)).toBeInTheDocument();
    expect(screen.getByText(/Getränk Wasser/i)).toBeInTheDocument();
    expect(screen.getByText(/500/i)).toBeInTheDocument();
    expect(screen.getByText(/Kommentar Ohne Kohlensäure/i)).toBeInTheDocument();
    expect(screen.getByText(/Ersteller 12345/i)).toBeInTheDocument();
    expect(screen.getByText(/Ersteller Name Ahmad Sfarjalani/i)).toBeInTheDocument();
    expect(screen.getByText(/Created At 2023-01-01T12:00:00/i)).toBeInTheDocument();
    expect(screen.getByText(/Protokoll 67890/i)).toBeInTheDocument();
  });


