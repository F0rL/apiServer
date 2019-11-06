const axios = require('axios')

const conf = require('@app/config/config')

async function getIpInfo(ip) {
  return axios.get(conf.gaodeIpInfo, {
    params: {
      ip: ip,
      output: 'JSON',
      key: conf.gaodeKey
    }
  })
}

async function getWether(adcode, extensions = 'all') {
  return axios.get(conf.gaodeWether, {
    params: {
      city: adcode,
      key: conf.gaodeKey,
      extensions,
      output: 'JSON'
    }
  })
}

module.exports = {
  getIpInfo,
  getWether
}
