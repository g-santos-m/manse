import app from './app.ts';
import { getAll }  from './repository.ts';
import { Parte } from '../../shared/interfaces.ts';

app.get('/partes', (req, res) => {
    try {
        const partes: Parte[] = getAll();
        res.send({ success: true, data: partes });
    } catch (error) {
        console.log(error)
        res.send({ success: false, data: null });
    }
});

app.post('/partes', (req, res) => {
    try {
        const parte: Parte = JSON.parse(req.body.data);
        
        res.send({ success: true, data: null });
    } catch (error) {
        console.log(error)
        res.send({ success: false, data: null });
    }
})

app.put('/partes', (req, res) => {

})

app.delete('/partes', (req, res) => {

})
