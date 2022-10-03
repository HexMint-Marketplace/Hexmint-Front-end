import { render, screen } from '@testing-library/react';
import TransferForm from '../TransferForm';

test('Should render input element', () => {
  render(<TransferForm title="my header" />);
  const inputElement = screen.getByPlaceholderText(/Enter Receiver's Wallet Address/i);
  expect(inputElement).toBeInTheDocument();
});