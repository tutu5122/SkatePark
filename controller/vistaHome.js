import { getSkaters } from "../models/consultas.js"

export const vistaHome = async ( req , res) => {
    try {
        const skaters = await getSkaters()
        res.render("Home", {
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