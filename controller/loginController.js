import {  selectSkater } from "../models/consultas.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const vistaLogin = (req,res) => {
    res.render('Login',{
        layout:'main'
    })
}

export const loginUsuario = async ( req , res) => {
    const { email, password } = req.body;
    try {   
        const secretKey = process.env.SECRET_KEY
        const skater = await selectSkater(email, password);
        
        if(skater){
            const token = jwt.sign(
                skater,
                secretKey,
                {
                    expiresIn: Math.floor(Date.now() / 1000) + 240 // 4 minutos
                }
            )
            res.status(200).send({ token });

        }else {
            res.status(401).send('Credenciales incorrectas')
        }

    } catch (error) {
        console.error('algo salio mal', error)
    }
}

export const validarToken = async (req , res) => {
    const { token } = req.query;
    const secretKey = process.env.SECRET_KEY

    jwt.verify(token, secretKey, (err, skater) => {
        if (err) {
            return res.status(401).send('Token inválido');
        }
        res.render('Datos', { skater });
    } )
}

