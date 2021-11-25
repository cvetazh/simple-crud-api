const Person = require('../models/personModel');

//@desc Gets all persons
//@route GET/person
async function getPersons(req, res) {
  try {
    const person = await Person.findAll();
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(JSON.stringify(person));
  } catch (error) {
    console.log(error);
  }
}

//@desc Gets one person
//@route GET/person/:personId
async function getPerson(req, res, personUUID) {
  try {
    const person = await Person.findByUUID(personUUID);
    if (!person){
      res.writeHead(404, {'Content-Type':'text/html'});
      res.end(JSON.stringify({message : 'Person with that ID not found'}));
    } else{
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(JSON.stringify(person));
    }
  } catch (error) {
    console.log(error);
  }
}

//@desc Create a person
//@route POST/person
async function createPerson(req, res) {
  try {
    let body = '';

    req.on('data', (chunk) => {
      console.log(chunk.toString());
      body += chunk.toString();
    });

    req.on('end', async () => {
      const {name, age, hobbies} = JSON.parse(body)

      const person = {
        name,
        age,
        hobbies,
      };
      
      const newPerson = await Person.create(person);
      res.writeHead(201, {'Content-Type':'application/json'});
      res.end(JSON.stringify(newPerson));
    });
    
  } catch (error) {
    console.log(error);
  }
}



module.exports = {getPersons, getPerson, createPerson};
