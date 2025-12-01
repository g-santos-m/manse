import { getAll, create, update, remove }  from './repository.ts';
import { Parte } from './interfaces.ts';
import express from 'express';

const router = express.Router();

router.get('/partes', (req, res) => {
    try {
        const partes: Parte[] = getAll();
        res.send({ success: true, data: partes });
    } catch (error) {
        console.log(error)
        res.send({ success: false, data: null });
    }
});

router.post('/parte', (req, res) => {
    try {
        const parte: Parte = req.body;
        create(parte);
        res.send({ success: true, data: null });
    } catch (error) {
        console.log(error)
        res.send({ success: false, data: null });
    }
})

router.put('/parte', (req, res) => {
    try {
        const parte: Parte = JSON.parse(req.body);
        update(parte);
        res.send({ success: true, data: null });
    } catch (error) {
        console.log(error)
        res.send({ success: false, data: null });
    }
})

router.delete('/parte', (req, res) => {
    try {
        const id: number = Number(req.body);
        remove(id);
        res.send({ success: true, data: null });
    } catch (error) {
        console.log(error)
        res.send({ success: false, data: null });
    }
})

export default router;