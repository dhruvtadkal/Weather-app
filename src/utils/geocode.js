const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGhydXYwMiIsImEiOiJja3dtNjZqOWgxd3MxMnVtbGU4bzFtcTg1In0.Gx1r45GWcNhONYmR8Di3QA'

    request ({url : url, json : true}, (error, response) => {
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log(response.body.features[0].place_name)
        console.log('Coordinates : ' + latitude,longitude)

        callback(undefined, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        })
    })
}

module.exports = geocode