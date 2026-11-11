import { LinkedList } from "./LinkedList.js";

export class HashMap {
capacity = 16;
loadFactor = 0.75;
buckets = Array(this.capacity);

hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for(let i = 0; i < key.length; i += 1) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        hashCode %= this.capacity;
    }

    return hashCode % this.capacity;
}

// set(key, value) {
//     const index = this.hash(key);

//     if(!this.buckets[index]){
//         const list = new LinkedList();
//         list.append({key, value});
//         this.buckets[index] = list;
//     } else {
        
//     }
// }

};