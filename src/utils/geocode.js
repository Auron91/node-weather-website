const request = require('request');

const geocode = (address, callback) => {
    let addressUrl = encodeURIComponent(address);
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressUrl}.json?access_token=pk.eyJ1IjoiYXVyb245MSIsImEiOiJja2dneWhhY2swOGhmMnRsaXQ3d3Z4c290In0.8daWaX5EocIkrGigC9Z6lA&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to receive data!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;