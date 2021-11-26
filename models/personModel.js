let persons = require('../data/person');
const {v4: uuidv4} = require('uuid');
const  {writeDataToFile } = require('../utils');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(persons);
  });
}

function findByUUID(uuid) {
  return new Promise((resolve, reject) => {
    const person = persons.find( p => p.id === uuid );
    resolve(person);
  });
}

function create(person) {
  return new Promise((resolve, reject) => {
    const newPerson = {id: uuidv4(), ...person};
    persons.push(newPerson);
    writeDataToFile('./data/person.json', persons);
    resolve(newPerson);
  });
}

function update(id, person) {
  return new Promise((resolve, reject) => {
    const index = persons.findIndex(p => p.id === id);
    persons[index] = {id, ...person};
    writeDataToFile('./data/person.json', persons);
    resolve(persons[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    persons = persons.filter(p => p.id !== id);
    writeDataToFile('./data/person.json', persons);
    resolve();
  });
}


module.exports = { findAll, findByUUID, create, update, remove };