import { Schema, model } from "mongoose";


const mascotasSchema = new Schema({

    name: {
        type: String
    },

    species: {
        type: String
    },

    age: {
        type: Number
    },

    owner: {
        type: String
    },

    photo: {
        type: String
    },

    status: {
        type: Boolean
    }

})


export default model ("Mascotas", mascotasSchema)