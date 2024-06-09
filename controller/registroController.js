import {  addSkaters , updateSkater, deleteSkater} from "../models/consultas.js"
import { fileURLToPath } from 'url'
import { dirname } from "path";
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )


export const vistaRegistro = (req,res) => {
    res.render('Registro',{
        layout:'main'
    })
}

export const registroSkaters = async (req,res) =>{
    console.log( 'salida de req.body' , req.body)
    console.log( 'salida de req.files' , req.files)
    const skater = req.body
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).send('No viene ninguna imagen');
    }

    const { foto } = req.files;
    const { name } = foto;
    const urlFoto = `/uploads/${name}`;  
    console.log('salida de name', name)
    foto.mv(`${__dirname}/../public${urlFoto}`, async (err) => {
        try {
            if(err){
                console.error(err)
            }else{
                skater.foto = urlFoto
                await addSkaters(skater)
                res.status(201).redirect('/login')
            }
            
        } catch (error) {
            console.error('Algo salio mal', error);
        }
    })

}

export const actualizarSkater = async (req,res) =>{
    const { id, nombre, password, anos_experiencia, especialidad } = req.body;
    const skater = [nombre, password, anos_experiencia, especialidad, id];
    try {
        await updateSkater(skater);
        res.send("Los cambios se han realizado con éxito");
    } catch (error) {
        console.error('Algo salio mal', error);
    }
}


export const eliminarSkater = async (req,res) =>{
    const skaterId  = req.params.id;
    try {
        await deleteSkater(skaterId);
        res.send("Los cambios se han realizado con éxito");
    } catch (error) {
        console.error('Algo salio mal', error);
    }
}