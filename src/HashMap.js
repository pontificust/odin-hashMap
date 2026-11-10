export class HashMap {
capacity = 16;
loadFactor = 0.75;

hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for(let i = 0; i < key.length; i += 1) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        hashCode %= this.capacity;
    }

    return hashCode % this.capacity;
}

};
