interface IProduct {
    readonly name : string
    price : number
    readonly uniqueCode : number
}

class Product implements IProduct {
    public readonly uniqueCode : number

    constructor (
        public readonly name : string ,
        public price : number
    ) {
        this.uniqueCode = Number (Math.random ().toString ().slice (2))
    }
}

interface IIterator<T> {
    readonly next : () => T
    readonly hasNext : () => boolean
}
class ProductIterator<T> implements IIterator<T> {
    private index = 0

    constructor (
        private readonly products : T[]
    ) {}

    next () {
        return this.products [this.index ++]   
    }

    hasNext () {
        return this.index < this.products.length
    }
}

interface IProductCollection<T> {
    readonly addToCollection : (product : T) => void
    readonly createIterator : () => IIterator<T>
}

class ProductCollection<T> implements IProductCollection<T> {
    private collection : T[] = []

    addToCollection (...product : T[]) {
        this.collection.push (...product)
    }
    createIterator () {
        return new ProductIterator (this.collection)
    }
}

const product1 = new Product ('name1' , 12)
const product2 = new Product ('name2' , 4)
const product3 = new Product ('name3' , 234)
const product4 = new Product ('name4' , 2)
const product5 = new Product ('name5' , 23)

const product6 = new Product ('name6' , 23)

const collection = new ProductCollection<IProduct> ()
collection.addToCollection (product1 , product2 , product3 , product4 , product5)

const collectionIterator = collection.createIterator ()

function iterateProductCollection<T extends IProduct> (collection : IIterator<T>) {
    while (collection.hasNext()) {
        const product : T = collection.next ()        
        console.log (`product : name - ${product.name}, price - ${product.price}, unique code - ${product.uniqueCode}`)
    }
}

iterateProductCollection (collectionIterator)

console.log ('add new Product')
collection.addToCollection (product6);

iterateProductCollection (collectionIterator)