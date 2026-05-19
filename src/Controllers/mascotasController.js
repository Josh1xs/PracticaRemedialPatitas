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


//Obtener por especie 
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


//Obtener por edad

mascotasController.getMascotasByAge = async (req,res) => {
    try {

        const {min, max} = req.body

         const mascota = await mascotasModel.find({
            age: {$gte: min, $lte: max}
         })


         if(!mascota){
            return res.status(404).json({message: "Not pets with this range of age "})
         }

         return res.status(200).json(mascota)


    } catch (error) {
          console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}



//Insertar mascota

mascotasController.insertMascota = async (req,res) => {

try {
       const {name, species,age,owner,status} = req.body


    const newMascota = new mascotasModel({
        name,
        species,
        age,
        owner,
        status,
        image: req.file.path,
        public_id: req.file.filename
    })
    await newMascota.save();
    return res.status(200).json({message: "Pet saved"})

} catch (error) {
     console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"});
}
 
}


//Actualizar mascota 

mascotasController.updateMascota = async (req,res) => {
    try {
        
        const {name, species,age,owner,status} = req.body
        const mascotaFound = await mascotasModel.findById(req.params.id)

            const updateData = {
                name, 
                species,
                age,
                owner,
                status

            }


            if(req.file){

                await cloudinary.uploader.destroy(mascotaFound.public_id)

                updateData. = req.file.path;
                updateData.public_id = req.file.filename;


            }


    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export default mascotasController;