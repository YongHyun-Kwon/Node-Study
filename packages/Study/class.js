/* eslint-disable*/
class Person {
  constructor(name) {
    this.name = name
  }

  greet() {
    return `Hi, ${this.name}.`
  }
}

class Student extends Person {
  constructor(name) {
    super(name)
  }
  study() {
    return `${this.name} is studying.`
  }
}

const me = new Student('Hyun')
console.log(me.greet())
console.log(me.study())

const friends = new Student('Yun')
console.log(friends.greet())
console.log(friends.study())
