const express = require('express')
const app = express()
const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const jobRoutes = require('./routes/jobRoutes')
const eventRoutes = require('./routes/eventRoutes')

app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)
app.use('/jobs', jobRoutes)
app.use('/events', eventRoutes)




const PORT = process.env.port || 3001
app.listen(PORT, () => {
    console.log(`port running on PORT`)
  routesReport.print()
})

