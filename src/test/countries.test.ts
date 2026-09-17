import { describe, expect, it } from "vitest";
import { countries } from "@/data/countries";

describe("country content dataset", () => {
  it("contains all 195 countries", () => {
    expect(countries).toHaveLength(195);
  });

  it("uses unique country IDs and map IDs", () => {
    expect(new Set(countries.map((country) => country.id)).size).toBe(countries.length);
    expect(new Set(countries.map((country) => country.mapId)).size).toBe(countries.length);
  });

  it("provides core learning content for every country", () => {
    for (const country of countries) {
      expect(country.name.trim()).not.toBe("");
      expect(country.capital.trim()).not.toBe("");
      expect(country.language.trim()).not.toBe("");
      expect(country.famousFood.trim()).not.toBe("");
      expect(country.famousLandmark.trim()).not.toBe("");
      expect(country.funFact.trim()).not.toBe("");
      expect(country.quizQuestions.length).toBeGreaterThanOrEqual(3);
    }
  });
});
