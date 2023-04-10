import { createClient, print } from 'redis';

const client = createClient();


client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});


function setNewSchool(schoolName, value){
    client.set(schoolName, value);
    print(`${schoolName}: ${value} has been set`);
}

function displaySchoolValue(schoolName){
    console.log(`school key: ${schoolName}`);
    client.get(schoolName);
}


displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
