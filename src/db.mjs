import { MongoClient } from "mongodb"

// /**
//  * Establece una conexión a la base de datos MongoDB utilizando la cadena de conexión definida en las variables de entorno.
//  * Retorna una promesa que, cuando se resuelve, entrega una instancia del cliente de MongoDB conectado.
//  * En caso de fallar durante el intento de conexión, la promesa es rechazada con el error correspondiente.
//  * 
//  * @returns {Promise<MongoClient>} Promesa que resuelve con una instancia del cliente de MongoDB.
//  */
// const connect = () => {
//     return new Promise((resolve, reject) => {
//         try {
//             const client = new MongoClient(process.env.MONGO_CONNECTION_STRING);
//             resolve(client);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

/**
 * Crea una nueva instancia de MongoClient y establece una conexión a la base de datos MongoDB utilizando la URI de conexión.
 * La URI de conexión es obtenida de las variables de entorno del sistema. Esta función es utilizada para iniciar
 * una conexión a la base de datos antes de realizar operaciones como consultas o actualizaciones.
 *
 * @returns {MongoClient} Una instancia de MongoClient conectada a la base de datos especificada en la URI de conexión.
 */
const connect = () =>  new MongoClient(process.env.MONGO_CONNECTION_STRING);

const closeConnection = (db) => db.close().then(() => console.log("Conexion cerrada"))


export { connect, closeConnection };