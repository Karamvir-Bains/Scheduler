import React from "react";
import { render, waitForElement } from "@testing-library/react";
import Appointment from "components/Application";

describe("Appointment", () => {
  it("renders without crashing", async () => {
    await waitForElement (() => render(<Appointment />))
  });
});