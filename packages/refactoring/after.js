/**
 * @typedef Character
 * @property {string} slug
 * @property {number} polarity
 * @property {House} slug
 */

/**
 *  @typedef House
 *  @property {string} slug
 *  @property {Character[]} members
 */

const https = require('https')

const GOTAPI_REFIX = 'https://game-of-thrones-quotes.herokuapp.com/v1'

/**
 * @param {string} url
 * @returns {*}
 */
async function getHttpsJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let jsonStr = ''
      res.setEncoding('utf-8')
      res.on('data', (data) => {
        jsonStr += data
      })
      res.on('end', () => {
        try {
          const parse = JSON.parse(jsonStr)
          resolve(parse)
        } catch {
          reject(
            new Error('The server response was not a valid JSON document ')
          )
        }
        resolve(JSON.parse(jsonStr))
      })
    })
  })
}

/**
 * @returns {Promise<House[]>}
 */

async function getHouses() {
  return getHttpsJSON(`${GOTAPI_REFIX}/houses`)
}

// 들어가서는 안되는 문자열을 걸러내는 함수를 sanitize라고 표현한다.
// url 문자열 sanitize, sql 문자열 sanitize 하는것은 전혀 맥락이 다르기에
// sanitize란말을 조심히 사용해야 할 필요가 있다.

/**
 *
 * @param {string} qoute
 * @returns {string}
 */
function sanitizeQuote(qoute) {
  return qoute.replace(/[^a-zA-Z0-9., ]/g, '')
}

/**
 * @param {string} slug
 * @returns {Promise<string>}
 */
async function getMergedQutesOfChracter(slug) {
  const character = await getHttpsJSON(`${GOTAPI_REFIX}/character/${slug}`)
  return sanitizeQuote(character[0].quotes.join(' '))
}

/**
 *
 * @param {string} qoute
 */
async function getSentimAPIResult(qoute) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text: qoute,
    })

    const postReq = https.request(
      {
        hostname: 'sentim-api.herokuapp.com',
        method: 'POST',
        path: '/api/v1/',
        headers: {
          Accept: 'application/json; encoding=utf-8',
          'Content-Type': 'application/json; encoding=utf-8',
          'Content-Length': body.length,
        },
      },
      (res) => {
        let jsonStr = ''
        res.setEncoding('utf-8')
        res.on('data', (data) => {
          jsonStr += data
        })
        res.on('end', () => {
          try {
            resolve(JSON.parse(jsonStr))
          } catch {
            reject(
              new Error('The server response was not a valid JSON document')
            )
          }
        })
      }
    )

    postReq.write(body)
  })
}

/**
 *
 * @param {number[]} numbers
 * @returns {number}
 */
function sum(numbers) {
  return numbers.reduce((memo, curr) => memo + curr, 0)
}

async function main() {
  const houses = await getHouses()

  const characters = await Promise.all(
    houses
      .map((house) =>
        house.members.map((member) =>
          getMergedQutesOfChracter(member.slug).then((qoute) => ({
            house: house.slug,
            character: member.slug,
            qoute,
          }))
        )
      )
      .flat()
  )

  const charactersWithPolarity = await Promise.all(
    characters.map(async (character) => {
      const result = await getSentimAPIResult(character.qoute)
      return {
        ...character,
        polarity: result.result.polarity,
      }
    })
  )
  /** @type {Object.<string, Character[]>} */
  const charactersByHouseSlugs = {}
  charactersWithPolarity.forEach((character) => {
    charactersByHouseSlugs[character.house] =
      charactersByHouseSlugs[character.house] || []
    charactersByHouseSlugs[character.house].push(character)
  })

  const houseSlugs = Object.keys(charactersByHouseSlugs)
  const result = houseSlugs
    .map((houseSlug) => {
      const charactersOfHouse = charactersByHouseSlugs[houseSlug]
      if (!charactersOfHouse) {
        return undefined
      }
      const sumPolarity = sum(
        charactersOfHouse.map((character) => character.polarity)
      )
      const averagePolarity = sumPolarity / charactersOfHouse.length
      return [houseSlug, averagePolarity]
    })
    .sort((a, b) => a[1] - b[1])
  // eslint-disable-next-line no-console
  console.log(result)
}

main()
