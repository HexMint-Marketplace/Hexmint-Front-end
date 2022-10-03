import { render, screen } from '@testing-library/react';
import CommonHeader from '../CommonHeader';

test('Should render same text passed into title prop', () => {
  render(<CommonHeader title="my header" />);
  const headingElement = screen.getByText(/my header/i);
  expect(headingElement).toBeInTheDocument();
});

test('Should render same text passed into title prop', () => {
    render(<CommonHeader title="my header" />);
    const headingElement = screen.queryByText(/dog/i);
    expect(headingElement).not.toBeInTheDocument();
  });