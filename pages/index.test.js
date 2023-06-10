import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./index";

const mockBooks = { docs: [{ title: "The Lord of the Rings", author_name: ["J.R.R. Tolkien"], first_publish_year: 1954 }] };

describe("Given the home page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("It should load as expected", async () => {
    render(<Home />);
    const noRowsLegend = await screen.findByText("No Books to show");
    expect(noRowsLegend).toBeInTheDocument();
  });

  test("When the user search for a book, it should load books", async () => {
    fetch.mockOnce(JSON.stringify(mockBooks), {
      url: "https://openlibrary.org/search.json?q=Lord+Of+The+Rings",
    });

    render(<Home />);
    const input = await screen.findByTestId("search-input");
    fireEvent.change(input, { target: { value: "Lord Of The Rings" } });
    const searchBtn = await screen.findByTestId("search-btn");
    userEvent.click(searchBtn);
    const firstPublicYear = await screen.findByText(/1954/i);
    expect(firstPublicYear).toBeInTheDocument();
  });
});
