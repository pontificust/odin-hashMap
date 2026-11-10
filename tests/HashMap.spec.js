import { beforeEach, describe, expect, test } from "@jest/globals";
import { HashMap } from "../src/HashMap.js";

describe("HashMap", () => {
  let hashMap;

  beforeEach(() => {
    hashMap = new HashMap();
  });

  describe("hash()", () => {
    test("returns the same code for the same intput", () => {
      const inputs = [
        "Sara",
        "Marcus",
        "Vergilius",
        "Marcus Tullius Cicero",
        "Laelia",
      ];
      inputs.forEach((input) => {
        expect(hashMap.hash(input)).toEqual(hashMap.hash(input));
      });
    });

    test("returns codes which are in range between 0 and capacity - 1", () => {
      const inputs = [
        "Sara",
        "Marcus",
        "Vergilius",
        "Marcus Tullius Cicero",
        "Laelia",
      ];
      inputs.forEach((input) => {
        const hashCode = hashMap.hash(input);
        expect(hashCode).toBeGreaterThanOrEqual(0);
        expect(hashCode).toBeLessThanOrEqual(hashMap.capacity - 1);
      });
    });
  });
});
