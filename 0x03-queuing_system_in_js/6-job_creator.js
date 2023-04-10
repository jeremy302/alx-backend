import kue from 'kue';


const queue = kue.createQueue();
const obj = {
    phoneNumber: '+12 345679101',
    message: 'abc123',
};

const job = queue.create('push_notification_code', obj);
job.on('enqueue', ()=> console.log(`Notification job created: ${job.id}`));
job.on('complete', ()=>console.log('Notification job completed'));
job.on('failed', () =>
    console.log('Notification job failed'));
job.on('failed attempt', () =>
    console.log('Notification job attempt failed'));
job.save();
