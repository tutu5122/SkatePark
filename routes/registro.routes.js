import express from 'express';
import { 
    vistaRegistro, 
    registroSkaters, 
    actualizarSkater,
    eliminarSkater 
} from '../controller/registroController.js';

const router = express.Router();

router.get('/', vistaRegistro )
router.post('/', registroSkaters )
router.put('/', actualizarSkater )
router.delete('/:id', eliminarSkater )


export default router;