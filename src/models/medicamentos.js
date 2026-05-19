import { Schema, model } from "mongoose";


const medicamentosSchema = new Schema({

    name: {
        type: String
    },

    type: {
        type: String
    },

    brand: {
        type: String
    },

    dosage: {
        type: String
    },

    stock: {
        type: Number
    },

    expirationDate: {
        type: Date
    },

    description: {
        type: String
    },

    photo: {
        type: String
    },

    status: {
        type: Boolean
    }

})


export default model ("Medicamentos", medicamentosSchema)