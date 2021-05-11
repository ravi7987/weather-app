const request = require('request');

const weatherReport = (lattitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=61c3e9e3ba3b29482fcf8530b91c19fc&query='+lattitude+','+longitude;
    request({url: url, json: true},(error, response)=>{
        if(error){
            callback('sorry! there has been an network error');
        }else if(response.body.error){
            callback('the coordinates you have provided doesnt belong to a recognized place');
        }else{
            callback(false,{
                temperature: response.body.current.temperature
            })
        }
    });
}

module.exports = weatherReport;