const mysql = require('mysql2');

const conn = mysql.createConnection({
            host:'project-db-s.smhrd.com',
            user:'campus_23IS_IoT2_P2_2',
            password:'smhrd2',
            port:'3307',
            database:'campus_23IS_IoT2_P2_2'
        });

conn.connect();

module.exports = conn;