import assert from 'assert';
import sinon from 'sinon';

import kue from 'kue';
import createPushNotificationsJobs from './8-job';


const queue = kue.createQueue();


describe('createPushNotificationsJobs', function(){
    const sandbox = sinon.createSandbox();
    before(function() {
        queue.testMode.enter();
    });
    beforeEach(function(){
        //sandbox.spy(console);
        sandbox.stub(console, "log");
    });

    afterEach(function() {
        queue.testMode.clear();
        sandbox.restore(); 
    });

    after(function() {
        queue.testMode.exit();
    });

    it('job is added', function(){
        createPushNotificationsJobs([], queue);
        assert(queue.testMode.jobs.length === 0);
        const obj = {name: 'foo'};
        createPushNotificationsJobs([obj], queue);
        console.log('len', queue.testMode.jobs.length===1);
        assert(queue.testMode.jobs.length === 1);
        assert(queue.testMode.jobs[0].data === obj);

        createPushNotificationsJobs([3, 4], queue);
        assert(queue.testMode.jobs.length === 3);
    });
    it('exception', function(){
        try{
            createPushNotificationsJobs({}, queue);
            assert(false);
        }
        catch(er){
            assert(er instanceof Error);
            assert(er.message === 'Jobs is not an array');
        }
    });
    it.skip('console logging', function(){
        createPushNotificationsJobs([{}], queue);
        const job = queue.testMode.jobs[0];
        assert(console.log.calledWith(`Notification job created: ${job.id}`));
    });
    
});
