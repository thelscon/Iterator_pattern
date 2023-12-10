"use strict";
class Product {
    name;
    price;
    uniqueCode;
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.uniqueCode = Number(Math.random().toString().slice(2));
    }
}
class ProductIterator {
    products;
    index = 0;
    constructor(products) {
        this.products = products;
    }
    next() {
        return this.products[this.index++];
    }
    hasNext() {
        return this.index < this.products.length;
    }
}
class ProductCollection {
    collection = [];
    addToCollection(...product) {
        this.collection.push(...product);
    }
    createIterator() {
        return new ProductIterator(this.collection);
    }
}
const product1 = new Product('name1', 12);
const product2 = new Product('name2', 4);
const product3 = new Product('name3', 234);
const product4 = new Product('name4', 2);
const product5 = new Product('name5', 23);
const product6 = new Product('name6', 23);
const collection = new ProductCollection();
collection.addToCollection(product1, product2, product3, product4, product5);
const collectionIterator = collection.createIterator();
function iterateProductCollection(collection) {
    while (collection.hasNext()) {
        const product = collection.next();
        console.log(`product : name - ${product.name}, price - ${product.price}, unique code - ${product.uniqueCode}`);
    }
}
iterateProductCollection(collectionIterator);
console.log('add new Product');
collection.addToCollection(product6);
iterateProductCollection(collectionIterator);
