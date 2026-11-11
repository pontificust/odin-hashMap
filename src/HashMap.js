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
    if(targetList){
        return targetList.find(node => node.value.key === key)?.value.value;
    }
    return;
  }
}

const hashMap = new HashMap();

hashMap.set("Sara", "Konor");

console.log(hashMap.buckets[hashMap.hash("Sara")].find(node => node.value.key === "Sara").value.value);
