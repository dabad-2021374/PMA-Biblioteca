'use strict'

import Book from './book.model.js'
import { checkUpdate } from '../utils/validator.js'

export const addBook = async (req, res) => {
    try {
        let data = req.body
        console.log(data)

        let book = new Book(data)
        await book.save()

        return res.send({message: `Registered successfully book`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registering category', err: err})
    }
}

export const updateBook = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        let { id } = req.params
        //Validar que vengan datos
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'You have sent data that cannot be updated' })
        //Actualizar
    let updatedBook = await Book.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
        )
        //Validar la actualización
        if(!updatedBook) return res.status(404).send({message: 'Book not found and not updated'})
        //Responder si todo sale bien
        return res.send({message: 'Book updated successfully', updatedBook})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating book' })
    }
}

export const getBooks = async (req, res) => {
    try {
        let books = await Book.find();
        return res.send({books});
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error fetching books', err: err });
    }
}

export const filterAZ = async (req, res) => {
    try {
        let books = await Book.find().sort({ name: 1 })
        return res.send({ books })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error fetching companies' })
    }
}

export const filterZA = async (req, res) => {
    try {
        let book = await Book.find().sort({ name: -1 })
        return res.send({ book })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error fetching companies' })
    }
}