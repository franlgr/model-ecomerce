import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';

const app = feathers();

// Connect to a different URL
const restClient = rest('http://localhost:3030')

// Configure an AJAX library (see below) with that client 
app.configure(restClient.fetch(window.fetch.bind(window)));

// Available options are listed in the "Options" section
app.configure(auth({
    storage: window.localStorage,
    storageKey: 'feathers-jwt'
}));
  
export default app; // Exporta la instancia configurada para su uso en otros componentes
