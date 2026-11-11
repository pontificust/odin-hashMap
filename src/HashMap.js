import { LinkedList } from "./LinkedList.js";

export class HashMap {
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

  set(key, value) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      const list = new LinkedList();
      list.append({ key, value });
      this.buckets[index] = list;
    } else if (this.buckets[index].contains((node) => node.value.key === key)) {
      const foundList = this.buckets[index].find(
        (node) => node.value.key === key,
      );
      foundList.value.value = value;
    } else {
      this.buckets[index].append({ key, value });
    }
  }

  get(key) {
    const targetList = this.buckets[this.hash(key)];
    if (targetList) {
      return targetList.find((node) => node.value.key === key)?.value.value;
    }
    return;
  }

  has(key) {
    const targetList = this.buckets[this.hash(key)];
    if (targetList) {
      return targetList.contains((node) => node.value.key === key);
    }
    return false;
  }

  remove(key) {
    const targetList = this.buckets[this.hash(key)];
    if (targetList) {
      const idxToDelete = targetList.findIndex(
        (node) => node.value.key === key,
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
          acc.push(currentNode.value.key);
          i += 1;
          currentNode = currentNode.nextNode;
        }
      }
      return acc;
    }, []);
  }

  values() {
    return this.buckets.reduce((acc, list) => {
      if (list) {
        let i = 0;
        let currentNode = list.firstNode;
        while (i < list.size()) {
          acc.push(currentNode.value.value);
          i += 1;
          currentNode = currentNode.nextNode;
        }
      }
      return acc;
    }, []);
  }
}

const hashMap = new HashMap();

hashMap.set("Sara", "Konor");

hashMap.set("raSa", "Konor");
hashMap.set("Sara", "Loyd");
hashMap.set("Marcus", "Cicero");
hashMap.set("ramsuc", "Tullius");
hashMap.set("Gaius", "Tullius");
hashMap.keys();
