import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();


client.on('connect', async () => {
    console.log('Redis client connected to the server');
    main();
});

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

function publishMessage(message, time){
    setTimeout(()=>{
        console.log(`About to send ${message}`);
        client.publish('holberton school channel', message);
    }, time);
}

function main(){
    publishMessage("Holberton Student #1 starts course", 100);
    publishMessage("Holberton Student #2 starts course", 200);
    publishMessage("KILL_SERVER", 300);
    publishMessage("Holberton Student #3 starts course", 400);
}
