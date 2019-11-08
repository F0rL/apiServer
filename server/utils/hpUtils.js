const axios = require('axios')

const { gaode } = require('@app/config/config')

async function getIpInfo(ip) {
  return axios.get(gaode.gaodeIpInfo, {
    params: {
      ip: ip,
      output: 'JSON',
      key: gaode.gaodeKey
    }
  })
}

async function getWether(adcode, extensions = 'all') {
  return axios.get(gaode.gaodeWether, {
    params: {
      city: adcode,
      key: gaode.gaodeKey,
      extensions,
      output: 'JSON'
    }
  })
}

// 代理到bing
async function getBing(idx, n) {
  const res = await axios.get(
    'http://proxy.forl.fun/bing/HPImageArchive.aspx',
    {
      params: {
        format: 'js',
        idx,
        n,
        mkt: 'zh-CN'
      }
    }
  )

  const data = res.data.images
  let newArr = []
  const baseUrl = `https://cn.bing.com`
  data.forEach(item => {
    let { startdate, enddate, copyright, hsh, url, urlbase } = item
    url = baseUrl + url
    urlbase = baseUrl + urlbase
    newArr.push({
      startdate,
      enddate,
      copyright,
      hsh,
      url,
      urlbase
    })
  })
  return newArr
}

module.exports = {
  getIpInfo,
  getWether,
  getBing
}
