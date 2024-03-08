'use strict'

import express from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import categoryRoutes from '../src/category/category.routes.js'
import userRoutes from '../src/user/user.routes.js'
import bookRoutes from '../src/book/book.routes.js'
import loanBookRoutes from '../src/loanBook/loanBook.routes.js'

const app = express()
config()
const port = process.env.PORT 

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(categoryRoutes)
app.use(userRoutes)
app.use(bookRoutes)
app.use(loanBookRoutes)

//Levantar servidor
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server running ${port}`)
}