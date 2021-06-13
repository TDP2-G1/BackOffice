import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('test basico', () => {
  const { getByText } = render(<App />);
  const paragraphElement = getByText(/Marche ese airbnb/i);
  expect(paragraphElement).toBeInTheDocument();
});
