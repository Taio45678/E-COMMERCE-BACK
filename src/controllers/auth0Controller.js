const axios = require("axios");
let accessToken = ""; // Variable global para almacenar el token de acceso
const { Usuario } = require('../db');
const options = {
  method: 'POST',
  url: 'https://dev-jzsyp78gzn6fdoo4.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  data: {
    client_id: 'aN3vLxrkH6EYbqR9LqtP3QvNLftjvUUd',
    client_secret: 'SGIdjZJ--_Ud8HJ4AzbmGvfHRsKeDpy8l1POwOs6-EecW6Atw4mi9jKgsgREBIZi',
    audience: 'https://dev-jzsyp78gzn6fdoo4.us.auth0.com/api/v2/',
    grant_type: 'client_credentials'
  }
};

axios(options)
  .then(response => {
    accessToken = response.data.access_token; // Almacenar el token de acceso en la variable global
    console.log("Token de acceso obtenido:", accessToken);
  })
  .catch(error => {
    console.error("Error al obtener el token de acceso:", error);
  });

  const obtenerDatosDeAuth0 = async () => {
    
    try {
      const response = await axios.get(`https://dev-jzsyp78gzn6fdoo4.us.auth0.com/api/v2/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          
        }
      });
  
      const users = response.data;
  
      for (const user of users) {
        const {
          created_at,
          email,
          email_verified,
          name,
          nickname,
          picture,
          updated_at,
          user_id,
          last_login,
          last_ip,
          logins_count
        } = user;
  
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await Usuario.findOne({ where: { sub: user_id } });
  
        if (existingUser) {
          // El usuario ya existe, actualizar los datos si es necesario
          existingUser.email = email;
          existingUser.emailVerified = email_verified;
          existingUser.name = name;
          existingUser.nickname = nickname;
          existingUser.picture = picture;
          existingUser.updated_at = updated_at;
          existingUser.last_login = last_login;
          existingUser.last_ip = last_ip;
          existingUser.logins_count = logins_count;
  
          await existingUser.save();
        } else {
          // El usuario no existe, crear un nuevo registro en la base de datos
          await Usuario.create({
            email,
            emailVerified: email_verified,
            name,
            nickname,
            picture,
            sub: user_id,
            password: '', // Agrega el valor correcto si es necesario
            rol: 1, // Agrega el valor correcto si es necesario
            isBan: false,
            created_at,
            updated_at,
            last_login,
            last_ip,
            logins_count
          });
        }
      }
    } catch (error) {
      console.error('Error al cargar los datos en la base de datos:', error);
      throw error;
    }
  };
  
  // Llamar a la función para cargar los datos al iniciar el servidor
 module.exports = obtenerDatosDeAuth0;