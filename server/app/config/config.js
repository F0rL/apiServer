const config = {
  database: {
    dbName: 'main_data',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'a3251520'
  }
}

const gaode = {
  gaodeKey: '897d1270641dbab75415296121ce23e6',
  gaodeIpInfo: 'https://restapi.amap.com/v3/ip',
  gaodeWether: 'https://restapi.amap.com/v3/weather/weatherInfo'
}

module.exports = {
  config,
  gaode
}
