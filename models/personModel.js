const persons = require('../data/person')

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


module.exports = { findAll, findByUUID };