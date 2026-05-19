const mascotasController = {};

import mascotasModel from "../models/mascotas.js"
import {v2 as cloudinary} from "cloudinary";



//SELECT
mascotasController.getMascotas = async(req,res) => {
    try {
        
        const mascotas = await mascotasModel.find();
        return res.status(200).json(mascotas)

    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}


//Obtener por id
mascotasController.getMascotasId = async (req,res) => {
    try {
        const mascota = await mascotasModel.findById(req.params.id)

        if(!mascota){
            return res.status(404).json({message: "Pet with this ID not found"})
        }

        return res.status(200).json(mascota)

    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}

//Contar las mascotas 

mascotasController.countMascotas = async (req,res) => {
    try {
        
        const count = await mascotasModel.countDocuments();

        return res.status(200).json({count})

    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}

mascotasController.getMascotasBySpecie = async (req, res) => {
    try {
        
        const {species} = req.body
        const mascota = await mascotasModel.find({species:{$regex: species, $options: "i"}})

        return res.status(200).json(mascota)

    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}



export default mascotasController;