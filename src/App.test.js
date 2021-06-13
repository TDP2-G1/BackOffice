import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('test basico', () => {
  const { getByText } = render(<App />);
  
  expect(true).toBe(true);
});
