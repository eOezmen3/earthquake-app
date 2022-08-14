import '@testing-library/jest-dom';

import App from './App';
import React from 'react';
import { render } from '@testing-library/react';

describe('Earthquakes', () => {
  test('renders App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
