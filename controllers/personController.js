const Person = require('../models/personModel');

//@desc Gets all persons
//@route GET/person
async function getPersons(res, res) {
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
async function getPerson(res, res, personUUID) {
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

module.exports = {getPersons, getPerson};
