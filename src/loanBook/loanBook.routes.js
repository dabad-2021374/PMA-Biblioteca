import express from "express"

import { addLoanBook, deleteLoanBook } from "./loanBook.controller.js"
import {validateJwt, isAdmin, isClient} from '../middlewares/validate-jwt.js'

const api = express.Router();

api.post('/addLoanBook', [validateJwt], addLoanBook)
api.delete('/deleteLoan/:id', [validateJwt, isAdmin], deleteLoanBook)

export default api