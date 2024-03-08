'use strict'
import { Schema, model } from 'mongoose'

const bookSchema = Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'category',
        required: true
    }
}, {
    versionKey: false
})

export default model('book', bookSchema)