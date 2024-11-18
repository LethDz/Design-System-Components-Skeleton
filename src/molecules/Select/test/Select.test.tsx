import { Select } from '@molecules/Select';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

const options = [
  {
    label: 'Strict Black',
    value: 'strict-black',
  },
  {
    label: 'Heavenly Green',
    value: 'heavenly-green',
  },
  {
    label: 'Sweet Pink',
    value: 'pink',
  },
];

/**
 * @jest-environment jsdom
 */
test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

test('renders all options passed to it', () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);
  fireEvent.click(getByTestId('dse-select-label'));
  expect(getAllByRole('menuitemradio')).toHaveLength(options.length);
});

test('opens options on label click', () => {
  const { getByTestId, getAllByRole } = render(<Select options={options} />);
  fireEvent.click(getByTestId('dse-select-label'));
  expect(getAllByRole('menuitemradio')).toHaveLength(options.length);
});

test('calls onOptionsSelected when an option is clicked', () => {
  const onOptionsSelectedMock = jest.fn();
  const { getByTestId, getAllByRole } = render(
    <Select
      options={options}
      onOptionsSelected={onOptionsSelectedMock}
    />
  );
  fireEvent.click(getByTestId('dse-select-label'));
  fireEvent.click(getAllByRole('menuitemradio')[0]);
  expect(onOptionsSelectedMock).toHaveBeenCalledWith(options[0], 0);
});
