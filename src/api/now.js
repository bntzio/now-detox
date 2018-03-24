const request = require('request-promise')

const getDeployments = async (apiKey) => {
  const opts = {
    url: 'https://api.zeit.co/v2/now/deployments',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  }
  try {
    const response = await request(opts)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = { getDeployments }
