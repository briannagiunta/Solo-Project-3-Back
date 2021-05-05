const express = require('express')
const app = express()
const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)


app.use(express.json())
app.use(require('cors')())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const jobRoutes = require('./routes/jobRoutes')
const eventRoutes = require('./routes/eventRoutes')
const friendshipRoutes = require('./routes/friendshipRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)
app.use('/jobs', jobRoutes)
app.use('/events', eventRoutes)
app.use('/friendships', friendshipRoutes)
app.use('/convos', conversationRoutes)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`port running on ${PORT}`)
  routesReport.print()
})

