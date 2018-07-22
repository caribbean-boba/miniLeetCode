let redis = require("redis");
let client = redis.createClient();


function get(key, cb) {
    client.get(key, function(error, res){
        if (!error){
            cb(res);
        } else {
            console.log(error);
            return;
        }
    })
}

function set(key, val, cb) {
    client.set(key, val, function(error, res){
        if (!error){
            cb(res);
        } else {
            console.log(error);
            return;
        }
    })
}

function expire(key, second) {
    client.expire(key, second);
}

function quit() {
    client.quit();
}

module.exports = {
    get: get,
    set: set,
    quit: quit,
    expire: expire,
    print: redis.print
}