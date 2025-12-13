import { render, screen } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

test("renders sweets page", () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  const headingElement = screen.getByText(/sweets/i);
  expect(headingElement).toBeInTheDocument();
});
