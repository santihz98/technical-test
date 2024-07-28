import React from 'react';
import { render, screen } from '@testing-library/react';
import InteractionsList from './InteractionsList';

test('renders InteractionsList with interactions', () => {
  const interactions = [
    {
      question: 'Cual es la capital de Colombia?',
      context: 'Colombia es un pais de Latino America',
      answer: 'Bogota',
      score: 0.95,
      start: 0,
      end: 5
    }
  ];

  render(<InteractionsList interactions={interactions} />);

  expect(screen.getByText(/Cual es la capital de Colombia?/i)).toBeInTheDocument();
  expect(screen.getByText(/Colombia es un pais de Latino America/i)).toBeInTheDocument();
  expect(screen.getByText(/Bogota/i)).toBeInTheDocument();
});
