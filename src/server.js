const http = require('http');
const fs = require('fs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('../controllers/personController')
const {isExistsFile} = require('../utils')
const port = process.env.PORT || 8080 ;
const host = process.env.HOST || 'localhost';

const server = http.createServer((req, res) => {
 
  const urlWithValidId =/\/person\/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;

  if(req.url === '/person' && req.method === 'GET'){
    getPersons(req, res);
  } 

  else if ( req.method === 'GET') {
    if (req.url.match(urlWithValidId)){
      const personID = req.url.split('/')[2];
      getPerson(req, res, personID);
    }
    else {
      res.writeHead(400, {'Content-Type':'text/html'});
      res.end(JSON.stringify({message : "Wrong format ID"}));
    }

  }

  else if(req.url ==='/person' && req.method === 'POST'){
    createPerson(req, res);
  }

  else if (req.method === 'PUT') {
    if(req.url.match(urlWithValidId) ){
      const personID = req.url.split('/')[2];
      updatePerson(req, res, personID);
    }
    else {
        res.writeHead(400, {'Content-Type':'text/html'});
        res.end(JSON.stringify({message : "Wrong format ID"}));
    }
  }

  else if (req.method === 'DELETE') {
    if(req.url.match(urlWithValidId)){
      const personID = req.url.split('/')[2];
      deletePerson(req, res, personID);
    }
    else {
      res.writeHead(400, {'Content-Type':'text/html'});
      res.end(JSON.stringify({message : "Wrong format ID"}));
    }
  }
  
  else{
    res.writeHead(404, {'Content-Type':'text/html'});
    res.end(JSON.stringify({message : "Route Not Found"}));
  }
})


server.listen(port, host, () => {
  console.log(`Server running at port ${port} ${host}`)
})
