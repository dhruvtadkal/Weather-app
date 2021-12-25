const path = require('path')                //this is a core module,no need to install
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { request } = require('http')
const prompt = require('prompt-sync')()         //include when using prompt for user input

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000           //this is required for heroku to run the app(not locally)

//paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views', viewsPath)          //providing the exact path of the index.hbs
app.set('view engine','hbs')                //setting view engine to load the index.hbs file
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


// app.get('', (req,res) => {
//     res.send('Hello express')
// })

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dhruv'
    })
})

app.get('/login', (req,res) => {
    res.render('loginPage',{
        title: 'Login Page',
        name: 'Dhruv'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Dhruv'
    })
})

// app.get('/login', (req,res) => {
//     res.send('Login page')
// })

app.get('/weather', (req,res) => {
    //res.send('<h1>Weather page</h1>')


    // res.send({
    //     address : req.query.address
    // })

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        }) 
    }

    forecast(req.query.address, (error,data) => {
        if(error) {
            return res.send({error})
        }

        geocode(req.query.address, (error , {latitude,longitude,location}) =>{
            if (error) {
                return res.send({ error })
            }
            res.send({
                address : req.query.address,
                place : location,
                latitude : latitude,
                longitude : longitude,
                forecast : data
                
            })
        })

    })
})

app.get('/products',(req,res) => {
    console.log(req.query.search)
    
    res.send({
        products:[req.query.search]
    })
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})