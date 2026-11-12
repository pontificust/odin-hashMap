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
        "asdfasdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafwseasfsdfaasdffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      ];
      inputs.forEach((input) => {
        const hashCode = hashMap.hash(input);
        expect(hashCode).toBeGreaterThanOrEqual(0);
        expect(hashCode).toBeLessThanOrEqual(hashMap.capacity - 1);
      });
    });
  });

  describe("set(key, value)", () => {
    test("adds a linkedList if the bucket is empty", () => {
      hashMap.set("Sara", "Konor");
      expect(
        hashMap.buckets[hashMap.hash("Sara")].contains(
          (node) => node.value.key === "Sara",
        ),
      ).toEqual(true);
    });

    test("updates the value of the node if input key equals current key", () => {
      hashMap.set("Sara", "Konor");
      expect(
        hashMap.buckets[hashMap.hash("Sara")].find(
          (node) => node.value.key === "Sara",
        ).value.value,
      ).toEqual("Konor");
      hashMap.set("Sara", "Marta");
      expect(
        hashMap.buckets[hashMap.hash("Sara")].find(
          (node) => node.value.key === "Sara",
        ).value.value,
      ).toEqual("Marta");
    });

    test("adds the node to the linkedList if the bucket is not empty", () => {
      hashMap.set("Sara", "Konor");
      hashMap.set("raSa", "Konor");
      expect(
        hashMap.buckets[hashMap.hash("Sara")].contains(
          (node) => node.value.key === "Sara",
        ),
      ).toEqual(true);
      expect(
        hashMap.buckets[hashMap.hash("raSa")].contains(
          (node) => node.value.key === "raSa",
        ),
      ).toEqual(true);
    });
  });

  describe("get(key)", () => {
    test("returns undefined if the key is not found", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      expect(hashMap.get("Karl")).toBeUndefined();
    });

    test("returns value if the key is found", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      expect(hashMap.get("Sara")).toEqual("Loyd");
    });
  });

  describe("has(key)", () => {
    test("returns false if the key is not found", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      expect(hashMap.has("Karl")).toEqual(false);
    });

    test("returns true if the key is found", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      expect(hashMap.has("Sara")).toEqual(true);
    });
  });

  describe("remove(key)", () => {
    test("returns false if the key is not found", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      expect(hashMap.remove("Karl")).toEqual(false);
    });

    test("returns true if the key is found and removed", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      expect(hashMap.remove("Sara")).toEqual(true);
      expect(hashMap.has("Sara")).toEqual(false);
      expect(hashMap.has("raSa")).toEqual(true);
    });
  });

  describe("length()", () => {
    test("returns 0 if the map is empty", () => {
      expect(hashMap.length()).toEqual(0);
    });

    test("returns a number of stored keys", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      hashMap.set("Marcus", "Cicero");
      hashMap.set("ramsuc", "Tullius");
      hashMap.set("Gaius", "Tullius");
      expect(hashMap.length()).toEqual(5);
    });
  });

  describe("clear()", () => {
    test("erases all entries", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      hashMap.set("Marcus", "Cicero");
      hashMap.set("ramsuc", "Tullius");
      hashMap.set("Gaius", "Tullius");
      hashMap.clear();
      expect(hashMap.length()).toEqual(0);
      expect(hashMap.has("Marcus")).toEqual(false);
      expect(hashMap.has("raSa")).toEqual(false);
      expect(hashMap.has("Sara")).toEqual(false);
      expect(hashMap.has("ramsuc")).toEqual(false);
      expect(hashMap.has("Gaius")).toEqual(false);
    });
  });

  describe("keys()", () => {
    test("produces the array of all keys of the hashMap", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      hashMap.set("Marcus", "Cicero");
      hashMap.set("ramsuc", "Tullius");
      hashMap.set("Gaius", "Tullius");
      expect(hashMap.keys()).toEqual(expect.arrayContaining([
        "raSa",
        "Sara",
        "Marcus",
        "ramsuc",
        "Gaius",
      ]));
    });
  });

  describe("values()", () => {
    test("produces the array of all values of the hashMap", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      hashMap.set("Marcus", "Cicero");
      hashMap.set("ramsuc", "Tullius");
      hashMap.set("Gaius", "Tullius");
      expect(hashMap.values()).toEqual(expect.arrayContaining([
        "Konor",
        "Loyd",
        "Cicero",
        "Tullius",
        "Tullius",
      ]));
    });
  });

  describe("capacity growth logic", () => {
    test("the capactiy of the map growth with the specific number of entries", () => {
      hashMap.set("raSa", "Konor");
      hashMap.set("Sara", "Loyd");
      hashMap.set("Marcus", "Cicero");
      hashMap.set("ramsuc", "Tullius");
      hashMap.set("Gaius", "Tullius");
      hashMap.set("asdfwae", "Konor");
      hashMap.set("ffdgh", "Loyd");
      hashMap.set("ghjk", "Cicero");
      hashMap.set("nm,", "Tullius");
      hashMap.set("tyutyu", "Tullius");
      hashMap.set("456yt", "Konor");
      hashMap.set("ewrewert", "Loyd");
      hashMap.set("vccvb", "Cicero");
      hashMap.set("zsasd", "Tullius");
      hashMap.set("vbcv", "Tullius");
      expect(hashMap.capacity).toEqual(32);
    });
  });
});
