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


function setNewSchool(schoolName, value){
    client.set(schoolName, value, (err, res)=> print(`Reply: ${res}`));
}

async function displaySchoolValue(schoolName){
    const p = promisify(client.get).bind(client);
    const res = await p(schoolName);
    console.log(res);
}


function main(){
    const key = 'HolbertonSchools';
    const data =  {
        Portland:50,
        Seattle: 80,
        'New York':20,
        Bogota: 20,
        Cali: 40,
        Paris: 2
    };
    Object.entries(data).forEach(v=>{
        client.HSET(key, v[0], v[1], print);
    });
    

    client.HGETALL(key, (_, r)=> console.log(r));
}
