const request = require('request');

const forecast = (lat, lon, callback) => {
    let url = `http://api.weatherstack.com/current?access_key=25df5fa80628eff711604f67e1256f1d&query=${lat},${lon}`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('No connection to API', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            let data = body.current;
            let response = data.weather_descriptions[0] + `. It is currently ${data.temperature}*C and the wind is ${data.wind_speed}m/s`
            callback(undefined, response)
        }
    })

}

module.exports = forecast;