const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'abdb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


app.get('/students', (req, res) => {
    mysqlConnection.query('SELECT * FROM students', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log(rows)
        } else
            console.log(err);
    })
});

app.get('/post', (req, res) => {

    singleRowInsert();

});



let singleRowInsert = () => {

    let query = `INSERT INTO students 
        (sno, Name, phone, email, course) VALUES (?, ?, ?, ?, ?);`;

    // Value to be inserted
    let userName = "monisa";
    let phn = 944433321;
    let sno = 2;
    let mail = "monisa@gmail.com";
    let course = "CSE"
        // Creating queries
    mysqlConnection.query(query, [sno, userName, phn, mail, course], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = " +
            rows.insertId);
    });
};