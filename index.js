const express = require('express');
const path = require('path')
const app = express();
const axios = require("axios")
const date = require("date-and-time")
const iso8601 = require('iso8601-convert')
var cors = require('cors');

// Set up a whitelist and check against it:
var whitelist = ['http://localhost:3000', "https://localhost:3000", "http://localhost:5000", "https://localhost:5000"]
   
var corsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// Then pass them to cors:
app.use(cors(corsOptions));
if (process.env.NODE_ENV !== 'production') {
    // console.log("hi")
    require('dotenv').config();
}
// var production = false;

// if(production){
// // Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/:ticker/:from/:to', (req, res) => {
    try {
        var ticker = req.params.ticker;

        var from = date.format(new Date(parseInt(req.params.from)), 'YYYY-MM-DD')
        var to = date.format(new Date(parseInt(req.params.to)), 'YYYY-MM-DD')

        console.log("-- call! --")

        const call_one = async () => {

        console.log(ticker, from, to)
        try {
            const response = (await axios.get('http://api.marketstack.com/v1/eod'
                    , {
                        params: {
                            access_key: process.env.MS_API_KEY,
                            symbols: ticker,
                            date_from: from,
                            date_to: to
                        }
                    }));
            const data = response.data;
            return data;
                }
                catch(error){
                    console.log(error)
                }

                // return rtn;
        }


        
        const call_two = async () => {
            try{
            const response = await axios.get(`http://api.marketstack.com/v1/tickers/${ticker}`
                    // ? access_key = YOUR_ACCESS_KEY
                    // & symbols = AAPL
                    // & date_from = 2021-05-10
                    // & date_to = 2021-05-20'
                    , {
                        params: {

                            access_key: process.env.MS_API_KEY,
                            // date_from: from,
                            // date_to: to
                        }
                    })

                const data = response.data
                return data;
            }
            catch(error){
                console.log(error)
            }
        }

        

                        // http://api.marketstack.com/v1/tickers
                        // ? access_key = YOUR_ACCESS_KEY
        (async function getAllData(){


        const call_one_data = await call_one()
        const call_two_data = await call_two()
        var data1 = call_one_data.data;
        var data2 = call_two_data;
        console.log("DATA", data2)
        var ticker_data = {
            ticker: data1[0].symbol,
            company_name: data2.name,
            adj_closes: [],
            dates: []
        }
        for (dataPoint of data1) {
            let dateObj = iso8601.toDate(dataPoint.date)
            // let unix = new Date();
            ticker_data.adj_closes.push(Math.floor(dataPoint.adj_close))
            ticker_data.dates.push(date.format(dateObj, 'MMM YY'))
        }
        ticker_data.adj_closes.reverse()
        ticker_data.dates.reverse()
        // console.log(ticker_data)
        res.send(ticker_data)
    })()

    } catch (error) {
        res.sendStatus(500);
        // console.log(error)
    }
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('*', (req, res) => {
    res.status('404').redirect('/')
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Backend listening on ${port}`);