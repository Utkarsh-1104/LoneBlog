const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
var _ = require('lodash');

let posts = []

app.get('/', (req, res) => {
  res.render('home', {postsCreated: posts})
}) 

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', (req, res) => {
  const blog = {
    title: req.body.blogTitle,
    text: req.body.blogText
  }
  posts.push(blog)
  res.redirect('/')
})

app.get('/posts/:postName', (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName)
  posts.forEach(post => {
    const storedTitle = _.lowerCase(post.title)
    if (storedTitle === requestedTitle) {
      res.render('post', {title: post.title, text: post.text})
    }
  });
})

app.listen(4100, () => {
  console.log("Server started on port http://localhost:4100")
})