import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders sweets page", () => {
  render(<App />);
  const headingElement = screen.getByText(/sweets/i);
  expect(headingElement).toBeInTheDocument();
});
