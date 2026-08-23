import { afterEach, describe, expect, it, vi } from "vitest";
import { GRID_COLUMNS, GRID_ROWS } from "./shrimp.constants";
import { clampPosition, createFood } from "./shrimp.helpers";

describe("shrimp game helpers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps the shrimp inside the tank grid", () => {
    expect(clampPosition({ x: 0, y: 0 }, -1, -1)).toEqual({ x: 0, y: 0 });
    expect(
      clampPosition({ x: GRID_COLUMNS - 1, y: GRID_ROWS - 1 }, 1, 1),
    ).toEqual({
      x: GRID_COLUMNS - 1,
      y: GRID_ROWS - 1,
    });
    expect(clampPosition({ x: 3, y: 2 }, 1, -1)).toEqual({ x: 4, y: 1 });
  });

  it("does not place food on the blocked shrimp cell", () => {
    const randomValues = [0, 0, 0.4, 0.4];
    vi.spyOn(Math, "random").mockImplementation(() => {
      const nextValue = randomValues.shift();
      return nextValue ?? 0.8;
    });

    expect(createFood({ x: 0, y: 0 })).toEqual([
      {
        x: Math.floor(0.4 * GRID_COLUMNS),
        y: Math.floor(0.4 * GRID_ROWS),
      },
    ]);
  });
});
