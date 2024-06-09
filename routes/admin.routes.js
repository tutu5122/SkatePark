import express from 'express';
import { editarEsatdo, vistaAdmin } from '../controller/adminController.js';

const router = express.Router();

router.get('/', vistaAdmin )
router.put('/', editarEsatdo )

export default router;