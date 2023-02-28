import React from "react";
import { render, screen } from "@testing-library/react-native";

import App from "../App";

describe("App", () => {
  it("renders the font family", async () => {
    render(<App />);

    expect(await screen.findByText("Inter Black")).toBeTruthy();
  });
});
