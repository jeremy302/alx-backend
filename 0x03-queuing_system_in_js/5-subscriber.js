import { createClient, print } from 'redis';
import { promisify } from 'util';

const sub = createClient();


sub.on('connect', async () => {
    console.log('Redis client connected to the server');
    await main();
});

sub.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});


async function main(){
    sub.on('message', (err, msg) => {
        console.log(msg);
        if (msg === 'KILL_SERVER') {
            sub.unsubscribe();
            sub.quit();
        }
    });
    await sub.subscribe('holberton school channel');
}
