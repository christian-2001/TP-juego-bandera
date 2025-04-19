import express from 'express'
import {fetchCapitales} from '../js/obtenerCapitales.js'

export const router = express.Router()

router.get('/', (req, res) => {
    res.render('inicio')
});

router.get('/otraruta', (req, res) => { 

    fetchCapitales(req, res)

})