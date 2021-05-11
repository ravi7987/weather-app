const request = require('request');

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmF2aW5kZXItMjAyMCIsImEiOiJja2F4cjhhYzUwOTBvMnJ0b3hzc3VibTV5In0.7dqABo3iCrU1bZhJlB1a9A&limit=1';
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('there is been an error in the network');
        }else if(response.body.features.length === 0){
            callback('unable to find location');
        }else{
            callback(false, {
                lattitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;