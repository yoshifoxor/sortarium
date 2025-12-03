import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect } from 'vitest';

import { getRandomNumber } from '@/lib/array';

import { MainContent } from '.';

it('should render same amount of bars as in array size input', () => {
  const size = getRandomNumber(10, 100);

  render(<MainContent />);
  const slider = screen.getByTestId('slider_size_slider');
  const chart = screen.getByTestId('chart');
  const bars = chart.children;

  fireEvent.change(slider, { target: { value: String(size) } });

  expect(bars.length).toEqual(size);
});
