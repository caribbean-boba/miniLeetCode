// module.exports  = function(io) {
//     io.on('connection', (socket) => {
//         console.log(socket);
//         var message = socket.handshake.query['message'];
//         console.log(message);
//         io.to(socket.id).emit('message', 'hehe from server');
//     });
// }
module.exports  = function(io) {
    var collabrationSessions = [];
    var sessionIds = [];

    io.on('connection', socket => {
        let sessionId = socket.handshake.query['sessionId'];
        sessionIds[socket.id] = sessionId;

        if (!(sessionId in collabrationSessions)) {
            collabrationSessions[sessionId] = { 'collabrators':[]};
        }
        collabrationSessions[sessionId]['collabrators'].push(socket.id);

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
            } else {
                console.log("could not tie socket_id to any collabration");
            }
        })
    })
}

