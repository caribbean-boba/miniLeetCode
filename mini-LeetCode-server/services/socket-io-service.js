let client = require("../modules/redis-client");

module.exports  = function(io) {
    var collabrationSessions = [];
    var sessionIds = [];
    var sessionPath = "/minileetcode_session/";

    io.on('connection', socket => {
        let sessionId = socket.handshake.query['sessionId'];
        sessionIds[socket.id] = sessionId;
        if (sessionId in collabrationSessions) {
            collabrationSessions[sessionId]['collabrators'].push(socket.id);
        } else {
            client.get(sessionPath+"/"+sessionId, function(data) {
                if (data) {
                    console.log("from redis");
                    collabrationSessions[sessionId] = {
                        "cachedEvents": JSON.parse(data),
                        "collabrators": []
                    };
                } else {
                    console.log("new session");
                    collabrationSessions[sessionId] = {
                        "cachedEvents": [],
                        "collabrators": []
                    };
                }
                collabrationSessions[sessionId]['collabrators'].push(socket.id);
            });
        }


        socket.on('change', delta => {
            console.log("change"+sessionIds[socket.id] + " " + delta);
            let sessionId = sessionIds[socket.id];
            if (sessionId in collabrationSessions) {
                let collabrators = collabrationSessions[sessionId]['collabrators'];
                for (let i = 0; i < collabrators.length; i++){
                    if (collabrators[i] != socket.id) {
                        io.to(collabrators[i]).emit("change", delta);
                    }
                }
                collabrationSessions[sessionId]["cachedEvents"].push(["change", delta, Date.now]);

            } else {
                console.log("could not tie socket_id to any collabration");
            }
        });

        socket.on("update", () => {
            let sessionId = sessionIds[socket.id];
            console.log("restore buffer for "+sessionId);
            if (sessionId in collabrationSessions){
                let changes = collabrationSessions[sessionId]["cachedEvents"];
                for (let i = 0; i < changes.length; i++){
                    socket.emit(changes[i][0], changes[i][[1]]);
                }
            }
        })
        socket.on('cursorMove', cursor => {
            console.log("cursorMove"+sessionIds[socket.id] + " " + cursor);
            let sessionId = sessionIds[socket.id];
            cursor = JSON.parse(cursor);
            cursor["socketId"] = socket.id;
            if (sessionId in collabrationSessions) {
                let collabrators = collabrationSessions[sessionId]['collabrators'];
                for (let i = 0; i < collabrators.length; i++){
                    if (collabrators[i] != socket.id) {
                        io.to(collabrators[i]).emit("cursorMove", JSON.stringify(cursor));
                    }
                }
            } else {
                console.log("could not tie socket_id to any collabration");
            }
        });
        socket.on('disconnect', function() {
            let sessionId = sessionIds[socket.id];
            console.log(socket.id + "disconnect");
            if (sessionId in collabrationSessions){
                let collabrators = collabrationSessions[sessionId]['collabrators'];
                let index = collabrators.indexOf(socket.id);
                if (index < 0){

                } else {
                    collabrators.splice(index,1);
                    if (collabrators.length === 0) {
                        console.log("last left");
                        let key = sessionPath+"/"+sessionId;
                        let value = JSON.stringify(collabrationSessions[sessionId]["cachedEvents"]);
                        client.set(key, value, client.print);
                        client.expire(key, 300000);
                        delete collabrationSessions[sessionId];
                    }
                }
            }
        });
    })
}

