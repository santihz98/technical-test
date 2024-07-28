import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionForm from './QuestionForm';

test('renders QuestionForm and submits a question', () => {
  const handleAskQuestion = jest.fn();
  render(<QuestionForm onAskQuestion={handleAskQuestion} />);

  const questionInput = screen.getByLabelText(/Question/i);
  const contextInput = screen.getByLabelText(/Context/i);
  const submitButton = screen.getByText(/Ask Question/i);

  fireEvent.change(questionInput, { target: { value: 'Cual es la capital de Colombia?' } });
  fireEvent.change(contextInput, { target: { value: 'Colombia es un pais de Latino America' } });
  fireEvent.click(submitButton);

  expect(handleAskQuestion).toHaveBeenCalledWith({
    question: 'Cual es la capital de Colombia?',
    context: 'Colombia es un pais de Latino America'
  });
});
