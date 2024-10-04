import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import React from "react";
import Home from "../src/pages/Home.tsx";


// These are sample tests used for reference when test are fully implemented later
function sum(a: number, b: number) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

describe("Home", () => {
  test("Page loads", async () => {
    render(<Home />);

    expect(screen.getByText("Online Shop")).toBeDefined();
  });
});
