import express from 'express';
import { vistaLogin, loginUsuario, validarToken } from '../controller/loginController.js';

const router = express.Router();

router.get('/', vistaLogin )
router.post('/', loginUsuario )
router.get('/datos', validarToken )

export default router;