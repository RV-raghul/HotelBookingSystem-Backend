import express from 'express'
import cors from 'cors'
import config from './src/common/config.js';
import { mongoConnection } from './src/model/index.model.js';
import appRoutes from './src/routes/index.routes.js'


const app = express()

app.use(cors())

app.use(express.json({limit:'2mb'}))
app.use(appRoutes)

mongoConnection().catch(err => console.log("MongoDB Connection failed", err))


app.listen(config.PORT, () => console.log(
    "Server is running on port " + config.PORT 
))