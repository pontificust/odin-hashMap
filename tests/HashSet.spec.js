import { beforeEach, describe, expect, test } from "@jest/globals";
import { HashSet } from "../src/HashSet.js";

describe("hashSet", () => {
  let hashSet;

  beforeEach(() => {
    hashSet = new HashSet();
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
        expect(hashSet.hash(input)).toEqual(hashSet.hash(input));
      });
    });

    test("returns codes which are in range between 0 and capacity - 1", () => {
      const inputs = [
        "Sara",
        "Marcus",
        "Vergilius",
        "Marcus Tullius Cicero",
        "Laelia",
        "asdfasdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafwseasfsdfaasdffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      ];
      inputs.forEach((input) => {
        const hashCode = hashSet.hash(input);
        expect(hashCode).toBeGreaterThanOrEqual(0);
        expect(hashCode).toBeLessThanOrEqual(hashSet.capacity - 1);
      });
    });
  });

  describe("set(key)", () => {
    test("adds a linkedList if the bucket is empty", () => {
      hashSet.set("Sara");
      expect(
        hashSet.buckets[hashSet.hash("Sara")].contains(
          (node) => node.value === "Sara",
        ),
      ).toEqual(true);
    });

    test("adds the node to the linkedList if the bucket is not empty", () => {
      hashSet.set("Sara");
      hashSet.set("raSa");
      expect(
        hashSet.buckets[hashSet.hash("Sara")].contains(
          (node) => node.value === "Sara",
        ),
      ).toEqual(true);
      expect(
        hashSet.buckets[hashSet.hash("raSa")].contains(
          (node) => node.value === "raSa",
        ),
      ).toEqual(true);
    });
  });

  describe("get(key)", () => {
    test("returns undefined if the key is not found", () => {
      hashSet.set("raSa");
      hashSet.set("Sara");
      expect(hashSet.get("Karl")).toBeUndefined();
    });

    test("returns key if it is found", () => {
      hashSet.set("raSa");
      hashSet.set("Sara");
      expect(hashSet.get("Sara")).toEqual("Sara");
    });
  });

  describe("has(key)", () => {
    test("returns false if the key is not found", () => {
      hashSet.set("raSa");
      hashSet.set("Sara");
      expect(hashSet.has("Karl")).toEqual(false);
    });

    test("returns true if the key is found", () => {
      hashSet.set("raSa");
      hashSet.set("Sara");
      expect(hashSet.has("Sara")).toEqual(true);
    });
  });

  describe("remove(key)", () => {
    test("returns false if the key is not found", () => {
      hashSet.set("raSa");
      hashSet.set("Sara");
      expect(hashSet.remove("Karl")).toEqual(false);
    });

    test("returns true if the key is found and removed", () => {
      hashSet.set("raSa");
      hashSet.set("Sara");
      expect(hashSet.remove("Sara")).toEqual(true);
      expect(hashSet.has("Sara")).toEqual(false);
      expect(hashSet.has("raSa")).toEqual(true);
    });
  });

  describe("length()", () => {
    test("returns 0 if the map is empty", () => {
      expect(hashSet.length()).toEqual(0);
    });

    test("returns a number of stored keys", () => {
      hashSet.set("raSa");
      hashSet.set("Sara");
      hashSet.set("Marcus");
      hashSet.set("ramsuc");
      hashSet.set("Gaius");
      expect(hashSet.length()).toEqual(5);
    });
  });

  describe("clear()", () => {
    test("erases all entries", () => {
      hashSet.set("raSa");
      hashSet.set("Sara");
      hashSet.set("Marcus");
      hashSet.set("ramsuc");
      hashSet.set("Gaius");
      hashSet.clear();
      expect(hashSet.length()).toEqual(0);
      expect(hashSet.has("Marcus")).toEqual(false);
      expect(hashSet.has("raSa")).toEqual(false);
      expect(hashSet.has("Sara")).toEqual(false);
      expect(hashSet.has("ramsuc")).toEqual(false);
      expect(hashSet.has("Gaius")).toEqual(false);
    });
  });

  describe("keys()", () => {
    test("produces the array of all keys of the hashSet", () => {
      hashSet.set("raSa");
      hashSet.set("Sara");
      hashSet.set("Marcus");
      hashSet.set("ramsuc");
      hashSet.set("Gaius");
      expect(hashSet.keys()).toEqual(
        expect.arrayContaining(["raSa", "Sara", "Marcus", "ramsuc", "Gaius"]),
      );
    });
  });

  describe("capacity growth logic", () => {
    test("the capactiy of the map growth with the specific number of entries", () => {
      hashSet.set("raSa", "Konor");
      hashSet.set("Sara", "Loyd");
      hashSet.set("Marcus", "Cicero");
      hashSet.set("ramsuc", "Tullius");
      hashSet.set("Gaius", "Tullius");
      hashSet.set("asdfwae", "Konor");
      hashSet.set("ffdgh", "Loyd");
      hashSet.set("ghjk", "Cicero");
      hashSet.set("nm,", "Tullius");
      hashSet.set("tyutyu", "Tullius");
      hashSet.set("456yt", "Konor");
      hashSet.set("ewrewert", "Loyd");
      hashSet.set("vccvb", "Cicero");
      hashSet.set("zsasd", "Tullius");
      hashSet.set("vbcv", "Tullius");
      expect(hashSet.capacity).toEqual(32);
    });
  });
});
