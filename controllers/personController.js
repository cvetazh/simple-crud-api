const Person = require('../models/personModel');
const { getPostData } = require('../utils');

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
    const body = await getPostData(req);
    const { name, age, hobbies } = JSON.parse(body);
   
    const person = {
      name,
      age,
      hobbies,
    };
    
    if (person.name && person.age && person.hobbies.length!=0){

      const newPerson = await Person.create(person);
      res.writeHead(201, {'Content-Type':'application/json'});
      res.end(JSON.stringify(newPerson));
    }

    else{
      res.writeHead(400, {'Content-Type':'application/json'});
      res.end(JSON.stringify({message: "Name, age, hobbies are required"}));
    }

  } catch (error) {
      console.log(error);
  }
}

//@desc Update a person
//@route PUT/person/:personId
async function updatePerson(req, res, id) {
  try {
    const person = await Person.findByUUID(id);

    if(!person){
      res.writeHead(404, {'Content-Type':'text/html'});
      res.end(JSON.stringify({message : 'Person with that ID not found'}));
    } 
    else {
      const body = await getPostData(req);
      const { name, age, hobbies } = JSON.parse(body);
     
      const personData = {
        name: name || person.name,
        age: age || person.age ,
        hobbies: hobbies || person.hobbies,
      };
  
      const updatePerson = await Person.update(id, personData);
      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(JSON.stringify(updatePerson));
    }  
  } catch (error) {
      console.log(error);
  }
}

//@desc Delete one person
//@route DELETE/person/:personId
async function deletePerson(req, res, personUUID) {
  try {
    const person = await Person.findByUUID(personUUID);
    if (!person){
      res.writeHead(404, {'Content-Type':'text/html'});
      res.end(JSON.stringify({message : 'Person with that ID not found'}));
    } else{
      await Person.remove(personUUID);
      res.writeHead(204, {'Content-Type':'text/html'});
      res.end();
    }
  } catch (error) {
      console.log(error);
  }
}



module.exports = {getPersons, getPerson, createPerson, updatePerson, deletePerson};
