import { describe, expect, it } from "vitest";

import AboutPage from "../../app/about/page";
import ContactPage from "../../app/contact/page";
import HomePage from "../../app/page";
import InsightsPage from "../../app/insights/page";
import ServicesPage from "../../app/services/page";
import TeamPage from "../../app/team/page";

describe("App routing", () => {
  it("registers a page component for every navigation route", () => {
    for (const page of [HomePage, AboutPage, ServicesPage, TeamPage, InsightsPage, ContactPage]) {
      expect(page).toBeTypeOf("function");
    }
  });
});
