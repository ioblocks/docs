const fetch = require('node-fetch')
const c = require('chalk')
const Multispinner = require('multispinner')

require('dotenv').config()

const postJSON = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json())

const fetchJSON = url =>
  fetch(url, {
    headers: {
      Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`
    }
  }).then(r => r.json())

const withSpinner = async (promise, message, doneMessage) => {
  const multispinner = new Multispinner([message])
  let res
  try {
    res = await promise.then(result => {
      multispinner.success(message)
      multispinner.on('done', () => console.log(c.green(doneMessage)))
      return result
    })
  } catch (e) {
    multispinner.error(message)
    multispinner.on('done', () => {
      console.error(c.red(`Error: ${e.message}`))
    })
  }
  return res
}

module.exports = {
  fetchJSON,
  postJSON,
  withSpinner
}
