function Parent() {

}

function Child() {

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child = new Child();
var parent = new Parent();

console.log(child instanceof Child); // true
console.log(parent instanceof Parent); // true
console.log(parent instanceof Child); // false
console.log(child instanceof Parent); // true

console.log('============================');

console.log(Object instanceof Object); //true
console.log(Function instanceof Function); //true
console.log(Object instanceof Function); //true
console.log(Number instanceof Number);//false
console.log(String instanceof String);//false
console.log(Child instanceof Parent); // false
console.log(Child instanceof Child); // false
