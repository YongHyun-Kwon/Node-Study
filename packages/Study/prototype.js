// Prototype
/* eslint-disable*/

function Person(name) {
  this.name = name
}

Person.prototype.greet = function greet() {
  return `Hi ${this.name}!`
}

function Student(name) {
  this.__proto__.constructor(name)
}

Student.prototype.study = function study() {
  return `${this.name} is studying`
}

Object.setPrototypeOf(Student.prototype, Person.prototype)

const me = new Student('Hyun')
/*console.log(me.greet())
console.log(me.study())*/
//console.log(me instanceof Student)
//console.log(me instanceof Person)

/*const anotherPerson = new Person('Foo')
console.log(anotherPerson instanceof Student)
console.log(anotherPerson instanceof Person)*/

//어레이는 오브젝트에 상속되어 있기에 true 값이 나온다
console.log([] instanceof Array, [] instanceof Object)
