const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define path sor Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static location
app.use(express.static(publicDirectory)) // setup static location


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Michał Bociek'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Michał Bociek'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'Reboot your PC!',
        name: 'Michał Bociek'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address
    if (!address) {
        return res.send({
            error: 'You need provide an address'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term!'
        })
    } else {
        console.log(req.query);
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page!',
        name: 'Michał Bociek',
        message: 'Help article page not found!'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page!',
        name: 'Michał Bociek',
        message: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
});