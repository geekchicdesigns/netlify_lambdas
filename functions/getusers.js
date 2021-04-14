const axios = require('axios');

exports.handler = function(event, context, callback) {
        // Adds to Env Variables => process.env;
        // Set during deployment
    const { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } = process.env;
        // Below is hard-coded during testing
    //const API_URL = 'https://api.github.com/users';
    //const API_CLIENT_ID = '';
    //const API_CLIENT_SECRET = '';

    const URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}`;

    // Send user response via CALLBACK
    const send = body => {
        callback(null, {
            statusCode: 200,
             // Work-around for CORS error
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify(body)
        });
    }

    // Perform API Call to GitHub
    const getUsers = () => {
        axios.get(URL)
        .then(res => send(res.data))
        .catch(err => send(err));
    }

    // Make sure method is GET
    if(event.httpMethod == 'GET') {
        getUsers();
    }
}


// modern JS style - encouraged
//export async function handler(event, context) {
//    const { name } = JSON.parse(event.body);

//    return {
//      statusCode: 200,
//      body: JSON.stringify({ message: `Hello `+name+ `! Is your age: ${Math.floor(Math.random() * 10)}? ` })
//    };
//  }

  //exports.handler = async (event, context) => {
   // return {
   //   statusCode: 200,
   //   body: "Hello, World"
   // };
  //};