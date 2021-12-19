// @ts-check
/* eslint-disable */
const fs = require('fs')

const FILENAME = 'src/conbention.js'

/*
//callback-style
fs.readFile(FILENAME, 'utf-8', (err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})
*/

/*
// sync-style
try {
  const result = fs.readFileSync(FILENAME, 'utf-8')
  console.log(result)
} catch (error) {
  console.error(error)
}
*/

// promise-style
async function main() {
  try {
    await fs.promises.readFile(FILENAME, 'utf-8')
  } catch (error) {
    console.error(error)
  }
}
main()
async function subMain() {
  const result = await fs.promises.readFile(FILENAME, 'utf-8')
  console.log(result)
}

subMain()
