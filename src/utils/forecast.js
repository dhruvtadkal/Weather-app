const request = require('postman-request')

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=651fe2e3af22816b054d102306f73cd9&query='+ encodeURIComponent(location)

    request({ url : url, json : true}, (error, response) => {           //json : true converts json format to normal text
        if (error){
            console.log('Unable to connect to weather app!')
            callback('Unable to connect to weather service!', undefined)
        } else {
            // console.log(response.body.current)
            console.log(location + ' weather today : ' + response.body.current.weather_descriptions[0])
            console.log('Its ' + response.body.current.temperature + ' degree celsius outside')
            console.log('There is ' + response.body.current.precip +'% chance of rain today')
            callback(undefined, ' It is currently ' + response.body.current.temperature + ' degrees outside. There is a ' + response.body.current.precip + '% chance of rain. ' + location + ' weather today : '  + response.body.current.weather_descriptions[0])
        }    
    })
}

module.exports = forecast