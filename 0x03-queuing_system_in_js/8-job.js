import kue from 'kue';


export default function createPushNotificationsJobs(jobs, queue){
    if (!(jobs instanceof Array))
        throw Error('Jobs is not an array');
    jobs.forEach(obj=>{
        const job = queue.create('push_notification_code_3', obj);
        job.on('enqueue', ()=> console.log(`Notification job created: ${job.id}`));
        job.on('complete', ()=>console.log(`Notification job ${job.id} completed`));
        job.on('failed', (err) =>
            console.log(`Notification job ${job.id} failed: ERROR`));
        job.on('progress', (progress)=>{
            console.log(`Notification job ${progress}% complete`);
        });
        job.save();
    });
}
