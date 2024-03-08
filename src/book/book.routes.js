import express from "express"

import { addBook, filterAZ, filterZA, getBooks, updateBook } from "./book.controller.js";
import {validateJwt, isAdmin, isClient} from '../middlewares/validate-jwt.js'

const api = express.Router();

api.post('/addBook', [validateJwt, isAdmin], addBook)
api.put('/updateBook/:id', [validateJwt, isAdmin], updateBook)
api.get('/getBooks', getBooks)
api.get('/filterAZ', filterAZ)
api.get('/filterZA', filterZA)

export default api