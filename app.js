// set express
const express = require('express')
const app = express()

// set express-handlebars
const exphbs = require('express-handlebars')

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static file
app.use(express.static('public'))

// set file
const restList = require('./restaurant.json')

// set port
const port = 3000

// req res
app.get('/', (req, res) => {
  res.render('index', { restaurant: restList.results })
})

app.get('/restaurants/:rest_id', (req, res) => {
  const restaurant = restList.results.find(rest => rest.id.toString() === req.params.rest_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restList.results.filter((restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase())))
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

// listen the server
app.listen(port, () => {
  console.log(`My express server is running on http://localhost:${port}`)
})



// 使用者可以透過搜尋餐廳名稱來找到特定的餐廳