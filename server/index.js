const express = require('express')
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const { error, Console } = require('console');
const fs = require('fs');
const login = require('./endpoints/login.js').login;
const get   = require('./endpoints/get.js').get;
const add = require('./endpoints/add.js').add;


global.path  = "./data.json";




global.a = {
   
}

global.b = {
   
}
global.c = {
  
}


global.database = [

]



global.users = [
    {
        id: 0,
        uname: "admin",
        password: "admin"
    }
]
global.aliveTokens = [

]


function onstartdo() {
    let appender = {
       
    }
    
    for(let i =0; i < 100; i++){
       
    }
    let timer = new Date();
    




}

app.listen(6969,onstartdo());




app.post('/add', (req, res) => {
  add(req,res);
})




app.post('/get', (req, res) => {
    get(req, res);
})

app.post('/login', (req, res) => {
    login(req, res);
})



app.post('/getaverages', (req, res) => {
   getAverages(req,res);

})
app.post('/getmeasurments', (req, res) => {
    getMeasurments(req, res);
})

function callSQL(query) {
    console.log("bingus")
}







let timeout = 100;
//Observe file for change
// Observe file for change
fs.watch(path, (eventType, filename) => {
    console.log("TEST");
    if (filename) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let x = require(path);
            let dataBlock = {
                Temperature: parseFloat(x.temp.toFixed(1)),
                Quality: parseFloat(x.CO.toFixed(1)),
                Humidity: parseFloat(x.AirQuality.toFixed(1)),
                Date: x.Date,
                Time: x.Time
            };

            // console.log("current maximum Temperature: " + highs.temperature);
            // console.log("datablock temperature: " + dataBlock.Temperature);
            // console.log("current maximum Quality: " + highs.quality);
            // console.log("datablock quality: " + dataBlock.Quality);
            // console.log("current maximum Humidity: " + highs.humidity);
            // console.log("datablock humidity: " + dataBlock.Humidity);
            // console.log("===============")

            // Update highs
            if (highs.temperature === undefined || highs.temperature < dataBlock.Temperature) {
               // console.log("Updating highs.temperature to " + dataBlock.Temperature);
                highs.temperature = dataBlock.Temperature;
            }
            if (highs.quality === undefined || highs.quality < dataBlock.Quality) {
              //  console.log("Updating highs.quality to " + dataBlock.Quality);
                highs.quality = dataBlock.Quality;
            }
            if (highs.humidity === undefined || highs.humidity < dataBlock.Humidity) {
              //  console.log("Updating highs.humidity to " + dataBlock.Humidity);
                highs.humidity = dataBlock.Humidity;
            }

            // Update lows
            if (lows.temperature === undefined || lows.temperature > dataBlock.Temperature) {
             //   console.log("Updating lows.temperature to " + dataBlock.Temperature);
                lows.temperature = dataBlock.Temperature;
            }
            if (lows.quality === undefined || lows.quality > dataBlock.Quality) {
               // console.log("Updating lows.quality to " + dataBlock.Quality);
                lows.quality = dataBlock.Quality;
            }
            if (lows.humidity === undefined || lows.humidity > dataBlock.Humidity) {
               // console.log("Updating lows.humidity to " + dataBlock.Humidity);
                lows.humidity = dataBlock.Humidity;
            }
        
            sums.temperature += dataBlock.Temperature;
            sums.quality += dataBlock.Quality;
            sums.humidity += dataBlock.Humidity;
            sums.count ++;
            
            averages.temperature = parseFloat((sums.temperature/sums.count).toFixed(1));
            averages.quality = parseFloat((sums.quality/sums.count).toFixed(1));
            averages.humidity = parseFloat((sums.humidity/sums.count).toFixed(1));








            database.push(dataBlock);
            delete require.cache[require.resolve(path)];
        }, 100);
    } else {
        console.log('No');
    }
});





app.post('/readfile', (req, res) => {
    let x = require('./nekaj.json');



    res.status(404).send(x).json();
})

app.post('/graph', (req,res)=>{
    res.status(200).send(database).json();
})


function generateData(base, variance, size) {
    const data = [];
    for (let i = 0; i < size; i++) {
        // Generate a random seed for each iteration
        const seed = Math.random().toString();
        // Set the random seed
        seedrandom(seed);
        
        // Generate a random number between -variance/2 and variance/2
        const randomDelta = (Math.random() - 0.5) * variance;
        // Add the random delta to the base value
        const value = base + randomDelta;
        data.push(value);
    }
    return data;
}

