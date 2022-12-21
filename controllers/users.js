// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
//mount our routes on the router

//GET /users/new -- serves a form to create new user
router.get('/new', (req,res) => {
    res.render('users/new.ejs')
})
//POST /users -- creates a new user from the form @ /users/new
router.post('/', async (req, res) => {
    try {
        // based on the info in the req.body, find or create user
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            //TODO:don't add plaintext passwords to the db
            defaults: { 
                password: req.body.password
            }    
        })
        // TODO: redirect to login page if user is found
        //log the user in (store the user's id as a cookie in the browser)
        res.cookie('userId', newUser.id)
        //redirect to the home page (for now)
        res.redirect('/')

    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

//GET /users/login -- render a login form that POSTs to /users/login
router.get('/login', (req,res) => {
    res.render('users/login.ejs')
    message: req.query.message ? req.query.message : null
})
// POST /users/login -- ingest data from form rendered @ GET /users/login
router.post('/login', async (req,res) => {
    try {
        // look up user based on their email
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        //boilerplate message if login fails
        const badCredentialMessage = 'username or password incorrect'
        //if the user isn't found in the db
        if (!user) {
            res.redirect('/users/login?message=' + badCredentialMessage)    
        } else if (user.password !== req.body.password) {
            //if the user's supplied pw is incorrect
            res.redirect('/users/login?message=' + badCredentialMessage)    
        } else {
            //if the user is found and their passwordmatches log them in
            console.log('loggin user in!')
            res.cookie('userId', user.id)
            res.redirect('/')
        }
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

//GET /users/logout --clear any cookies and redirect to HP
router.get('/logout', (req,res) => {
    res.clearCookie('userId')
    res.redirect('/')
})
//export the router
module.exports = router