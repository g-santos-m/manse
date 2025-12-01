import app from './app.ts';
import { getAll, create, update, remove }  from './repository.ts';
import { Parte } from '../../shared/interfaces.ts';

app.get('/api/partes', (req, res) => {
    try {
        const partes: Parte[] = getAll();
        res.send({ success: true, data: partes });
    } catch (error) {
        console.log(error)
        res.send({ success: false, data: null });
    }
});

app.post('/api/parte', (req, res) => {
    try {
        console.log('Recibido', req.body);
        const parte: Parte = JSON.parse(req.body.data);
        create(parte);
        res.send({ success: true, data: null });
    } catch (error) {
        console.log(error)
        res.send({ success: false, data: null });
    }
})

app.put('/api/parte', (req, res) => {
    try {
        const parte: Parte = JSON.parse(req.body.data);
        update(parte);
        res.send({ success: true, data: null });
    } catch (error) {
        console.log(error)
        res.send({ success: false, data: null });
    }
})

app.delete('/api/parte', (req, res) => {
    try {
        const id: number = Number(req.body.data);
        remove(id);
        res.send({ success: true, data: null });
    } catch (error) {
        console.log(error)
        res.send({ success: false, data: null });
    }
})
