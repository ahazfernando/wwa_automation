import { describe, expect, it } from "vitest";
import { sectionSettleProgress, sectionSnapProgress } from "../lib/tunnel-frames";

describe("section settle", () => {
  it("finishes a downward scroll on the next full section", () => {
    const intro = sectionSnapProgress(1);
    const midway = intro * 0.55;
    expect(sectionSettleProgress(midway, 1)).toBeCloseTo(intro);
  });

  it("returns a short downward nudge to the section already showing", () => {
    const intro = sectionSnapProgress(1);
    expect(sectionSettleProgress(intro * 0.15, 1)).toBe(0);
  });

  it("finishes an upward scroll on the previous full section", () => {
    const staffing = sectionSnapProgress(4);
    const software = sectionSnapProgress(5);
    const between = staffing + (software - staffing) * 0.4;
    expect(sectionSettleProgress(between, -1)).toBeCloseTo(staffing);
  });

  it("leaves the exit runway alone so the page can scroll past the sequence", () => {
    expect(sectionSettleProgress(0.99, 1)).toBeNull();
  });

  it("does nothing when a section is already fully in view", () => {
    expect(sectionSettleProgress(sectionSnapProgress(3), 1)).toBeNull();
  });
});
