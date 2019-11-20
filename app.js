// Add node modules
const cors      = require('cors')
const { pool }  = require('./config')
var express     = require('express')
var bodyParser  = require('body-parser')
var path        = require('path')
var mongoose    = require('mongoose')
var app         = express()

app.use(bodyParser.urlencoded({extended: true}))

//Connect to database
mongoose.connect("mongodb://localhost/Lifemanagement")
//Set public directory
app.use(express.static(path.join(__dirname, 'public')))

//Create Schema
var activtiesSchema = new mongoose.Schema({
    activity: String,
    time: String,
    created: {type: Date, default: Date.now}
})

//Add model
var Activities = mongoose.model("activities", activtiesSchema)


//Set EJS
app.set('view engine', 'ejs')

// app.use(cors())

//Create API
app.get("/api", (req,res) => {
    Activities.find({}, (err,results) => {
        if(err){
            res.render("index")
        }else{
            res.json({activity: results})
        }
    })
    
})
//Set Routes
app.get('/', (req, res) => {
    
    res.render("index")
})

//Set Routes
app.post('/', (req, res) => {
    ActivitiesData = new Activities(req.body)
    ActivitiesData.save()
    .then(item =>{
        
       res.redirect("/show")
      })
      .catch(err =>{
        res.status(400).send("Unable to save to database");
      });
})

app.get('/show', (req, res) => {
    Activities.find({}, function(err, results){
        if(err){
            res.redirect("/index")
        }else{
            res.render("show", {activity: results})
        }
    })
    
})

// Set server
app.listen('4000', () => {
    console.log('Server is running...')
})


