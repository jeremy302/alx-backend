
const blacklist = [4153518780, 4153518781];

import kue from 'kue';



function sendNotification(phoneNumber, message, job, done){
    job.progress(0, 100);
    if (blacklist.includes(phoneNumber))
    {
        done(Error(`Phone number ${phoneNumber} is blacklisted`));
        return;
    }
    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    // job.progress(100, 100);
    done();
}

const queue = kue.createQueue();
queue.process('push_notification_code_2',2, (job, done) => {
    console.log('getting');
    sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
