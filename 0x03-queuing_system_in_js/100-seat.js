import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';
import kue from 'kue';


const client = createClient();
let reservationEnabled = true;

function reserveSeat(number){
    client.SET('available_seats', number);
}

async function getCurrentAvailableSeats(){
    const p = promisify(client.get).bind(client);
    return Number(await p('available_seats'));
}


const queue = kue.createQueue();
const app = express();
const port = 1245;

app.get('/available_seats', async (req, res) => {
    res.json({numberOfAvailableSeats: await getCurrentAvailableSeats() || 0});
});
app.get('/reserve_seat', async (req, res) => {
    if (!reservationEnabled)
    {
        res.json({status: "Reservation are blocked" });
        return;
    }
    const job = queue.create('reserve_seat2');
    job.on('enqueue', ()=> res.json({ status: "Reservation in process" }));
    job.on('failed', ()=> res.json({ status: "Reservation in process" }));
    job.on('complete', ()=> console.log(`Seat reservation job ${job.id} completed`));
    job.on('failed', ()=> console.log(`Seat reservation job ${job.id} failed`));
    job.save((err)=>{
        if (err)
            res.json({ status: "Reservation failed" });
    });
});

app.get('/process', async (req, res) => {
    queue.process('reserve_seat2', async (job, done)=>{
        let seatCount = await getCurrentAvailableSeats();
        
        if (seatCount <= 0)
        {
            reservationEnabled = false;
            done(Error('Not enough seat available'));
        }
        if (seatCount > 0){
            reserveSeat(seatCount - 1);
            seatCount--;
        }
        if (seatCount == 0)
            reservationEnabled = false;
        done();
    });
    res.json({ status: "Queue processing" });
});
app.listen(port, ()=>{
    reserveSeat(50);
});
