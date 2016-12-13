'use strict'

const axios = require('axios')
const apiUrl = 'https://api.airbnb.com/v1/authorize'

const loginEmail = user => {
  return axios({
    method: 'post',
    url: apiUrl,
    data: {
      'client_id': CLIENT_ID,
      'grant_type': 'password',
      'username': user.username,
      'password': user.password,
      'locale': 'en-US',
      'currency': 'USD',
    }
  })
}

module.exports loginEmail