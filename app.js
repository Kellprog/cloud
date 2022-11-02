require('dotenv').config()
const express =require('express');
const bodyParser =require('body-parser');
const https = require('https');



const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))


app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html')
});

app.post('/', function(req,res) {
  cityName = req.body.cityName;
  units ='metric';
  url = 'https://api.openweathermap.org/data/2.5/weather?q= '+ cityName + '&appid='+ process.env.API_KEY +'&units=' + units+'';


  https.get(url,function (response) {
    console.log(response.statusCode);


    response.on('data', function(data){

    var  jsonData = JSON.parse(data);
      console.log(jsonData);


    var  weatherData = jsonData;
    var temp = weatherData.main.temp;
    var icon =weatherData.weather.icon


res.send('<h1>the temperature for ' + cityName +' is '+ temp +' degree celsius  </h1> '); 
  });


  })



})





app.listen(3000, function (){

  console.log("server is On");
});
