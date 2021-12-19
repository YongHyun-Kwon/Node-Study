// @ts-nocheck
/*eslint-disable*/

const ary = [1, 2, 3, 4, 5]
const [head, ...rest] = ary
console.log(head, rest)

//함수에서도 사용 가능하며 기본 인자를 섞어서도 사용 가능하다.
function addMul(method, ...rest) {
  if (method === 'add') {
    let sum = 0
    for (let item of rest) {
      sum += item
    }
    return sum
  } else if (method === 'multiply') {
    let mul = 1
    for (let item of rest) {
      mul *= item
    }
    return mul
  }
}

console.log(addMul('add', 1, 2, 3, 4)) // 10
console.log(addMul('multiply', 1, 2, 3, 4)) // 24
