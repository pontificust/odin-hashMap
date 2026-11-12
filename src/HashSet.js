import { LinkedList } from "./LinkedList.js";

export class HashSet {
  capacity = 16;
  loadFactor = 0.75;
  buckets = Array(this.capacity);

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }

    return hashCode % this.capacity;
  }

  set(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      const list = new LinkedList();
      list.append(key);
      this.buckets[index] = list;
    } else if (!this.buckets[index].contains((node) => node.value === key)) {
        this.buckets[index].append(key);
    }

    if (this.capacity * this.loadFactor <= this.length()) {
      this.capacity *= 2;
      const keys = this.keys();
      this.clear();
      keys.forEach(key => {
        this.set(key);
      });
    }
  }

  get(key) {
    const targetList = this.buckets[this.hash(key)];
    if (targetList) {
      return targetList.find((node) => node.value === key)?.value;
    }
    return;
  }

  has(key) {
    const targetList = this.buckets[this.hash(key)];
    if (targetList) {
      return targetList.contains((node) => node.value === key);
    }
    return false;
  }

  remove(key) {
    const targetList = this.buckets[this.hash(key)];
    if (targetList) {
      const idxToDelete = targetList.findIndex(
        (node) => node.value === key,
      );

      if (idxToDelete !== -1) {
        targetList.removeAt(idxToDelete);
        return true;
      }
    }
    return false;
  }

  length() {
    return this.buckets.reduce((acc, list) => {
      if (!list) {
        return acc;
      }
      return acc + list.size();
    }, 0);
  }

  clear() {
    this.buckets = Array(this.capacity);
  }

  keys() {
    return this.buckets.reduce((acc, list) => {
      if (list) {
        let i = 0;
        let currentNode = list.firstNode;
        while (i < list.size()) {
          acc.push(currentNode.value);
          i += 1;
          currentNode = currentNode.nextNode;
        }
      }
      return acc;
    }, []);
  }
}