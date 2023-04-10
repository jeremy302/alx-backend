import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();


client.on('connect', async () => {
    console.log('Redis client connected to the server');

    await displaySchoolValue('Holberton');
    setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');

});

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});


function setNewSchool(schoolName, value){
    client.set(schoolName, value, (err, res)=>print(`Reply: ${res}`));
}

async function displaySchoolValue(schoolName){
    const p = promisify(client.get).bind(client);
    const res = await p(schoolName);
    console.log(res);
}


