'use strict'

import Book from '../book/book.model.js'
import LoanBook from '../loanBook/loanBook.model.js'

export const addLoanBook = async (req, res) => {
    try {
        let data = req.body
        data.user = req.user._id
        let book = await Book.findOne({_id: data.book})
        data.date = new Date()
        if(!book) return res.status(404).send({message: 'Book not found'})
        
        let userLoanCount = await LoanBook.countDocuments({ user: data.user, loan: 'true' })
        if (userLoanCount >= 2) return res.status(400).send({ message: 'The user already has two books borrowed.' })
        
        let loanBook = new LoanBook(data)
        await loanBook.save()

        return res.send({message: `Registered successfully loan of book`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registering category', err: err})
    }
}

export const deleteLoanBook = async(req, res)=>{
    try{
        //Capturar el id de la 'categoria' a eliminar
        let { id } = req.params
        //Eliminar
        let deletedLoanBook = await LoanBook.deleteOne({_id: id})
        //Validar que se eliminó
        if(deletedLoanBook.deletedCount === 0) return res.status(404).send({message: 'Loan not found and not deleted'})
        //Responder
        return res.send({message: 'Deleted loan successfully'})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error deleting loan'})
    }
}