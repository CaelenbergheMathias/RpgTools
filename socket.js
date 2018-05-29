var io = require("socket.io");
var socket = io();
var mysql = require("mysql");
const config = {
    connectionLimit: 100,
    host: 'localhost',
    port: 3306,
    database: "rpgtools",
    user: "root",
    password: "root"
};
const Q = {
    getDnDChars: "select character from dndcharacters where userId = ?",
    saveDnDChar: "insert into dndcharacters values (?, ?)"

};

var pool = mysql.createPool(config);


function sqlInsert(query, data)
{
    pool.getConnection(function (err, conn) {

        conn.query(query,data, function (err, result) {
            console.log(result);
            socket.emit("dndchars", result);
            conn.end();
        });
    })
}

function sqlQuery(query, user) {
    pool.getConnection(function (err, conn) {

        conn.query(query,user, function (err, result) {
            console.log(result);
            socket.emit("dndchars", result);
            conn.end();
        });
    });

}

socket.on("connection", function () {
    socket.emit("foo","bar");
    console.log("Connection received");

});


socket.on("getdndchars", function (data) {

    sqlQuery(Q.getDnDChars, data);
});

socket.on("dc", function(data){
    console.log("test");
    //sqlInsert(Q.saveDnDChar,data);
});
socket.on('disconnect', function(){
    console.log('user disconnected');
});

module.exports = socket;