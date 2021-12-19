// @ts-nocheck
/* eslint-disable */

var x = 1
console.log(x) //1

console.log(x)
var x = 1 //undefined

var x = 1
if (true) {
  var x = 2
}
console.log(x) //2
