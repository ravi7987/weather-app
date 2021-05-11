const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/weatherData');
const geocode = require('./utils/geocode');

//setup handlebars config
app.set('view engine', 'hbs');
const viewpath = path.join(__dirname, '../templates/views');
const partialpath = path.join(__dirname, '../templates/partials');
app.set('views', viewpath);
hbs.registerPartials(partialpath);

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));


app.get('',(req, res)=>{
    geocode(req.query.address,(error, resp)=>{
        if(error){
            return error;
        }
        var lattitude = resp.lattitude;
        var longitude = resp.longitude;
        var location = resp.location;
        forecast(lattitude,longitude,(err, result)=>{
            if(err){
                return err;
            }
            console.log(result);
            res.render('index',{forecast: result, location:location, title: 'Forecast App'})
        });
    });
});

app.get('/help', (req,res)=>{
    console.log(req.query);
    res.render('help', {title: 'Forecast App', msg: 'this is the help message'});
});

app.get('*', (req,res)=>{
    res.render('404');
});


app.listen(3000,()=>{
    console.log('your server is up');
});