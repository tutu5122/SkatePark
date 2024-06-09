import {  editStatus, getSkaters } from "../models/consultas.js"

export const vistaAdmin = async (req,res) => {
    try {
        const skaters = await getSkaters()
        res.render("Admin", {
            layout : 'main',
            skaters   
        })
        
    } catch (error) {
        res.status(500).send({
            error: 'Algo salio mal ${error}',
            code:500
        })
    }
}

export const editarEsatdo = async (req,res) =>{
    const { id, estado } = req.body;
    const skater = [estado,  id];
    try {
        await editStatus(skater);
        res.send("Los cambios se han realizado con éxito");
    } catch (error) {
        console.error('Algo salio mal', error);
    }
}