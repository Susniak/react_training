import mysql from 'mysql';

let connectionInstance = false;

class Connection {
    static getInstance(config = false) {
        if (!connectionInstance && config) {
            const connection = mysql.createConnection(config);

            try {
                connection.connect();
                connectionInstance = connection;
            } catch (error) {
                console.error(error);
                return false;
            }
        }

        return connectionInstance;
    }
}

export default Connection;
