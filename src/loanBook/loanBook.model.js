'use strict'
import { Schema, model } from 'mongoose'

const loanBookSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'book',
        required: true
    },
    loan: {
        type: String,
        enum: ['true', 'false'],
        default: 'true',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    versionKey: false
})

export default model('loanBook', loanBookSchema)