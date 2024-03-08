import express from "express"

import { addBook, updateBook } from "./book.controller.js";
import {validateJwt, isAdmin, isClient} from '../middlewares/validate-jwt.js'

const api = express.Router();

api.post('/addBook', [validateJwt, isAdmin], addBook)
api.put('/updateBook/:id', [validateJwt, isAdmin], updateBook)

export default api