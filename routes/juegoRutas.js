import express from 'express'
import {fetchCapitales} from '../src/fetchCapitales.js'
import {fetchBanderas} from '../src/fetchBanderas.js'
import {fetchLimitrofes} from '../src/fetchLimitrofes.js'

export const router = express.Router()

router.get('/', (req, res) => {
    res.render('inicio')
});

router.get('/otraruta', (req, res) => { 

    // fetchCapitales(req, res)
    // fetchBanderas(req, res)
    // fetchLimitrofes(req, res)
    
})