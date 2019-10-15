import openSocket from 'socket.io-client'
import config from './config'
import ls from './localStorage'
import { env } from './config'

let currentSchema = "et_k15"
const strSchema = ls.getItem('schema')
if (strSchema) {
    let jsonSchema = JSON.parse(strSchema)
    currentSchema = jsonSchema.schema
}

let socket = null

function loadSocket(URL, asset) {
    socket = openSocket(URL, {
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 10,
        transports: ['websocket'],
        rejectUnauthorized: false,
        pingTimeout: 60000,
        pingInterval: 3000
    });

    socket.on("connect", function() {
        console.log("METODO DE CONNECT.");
        inRoom(asset);
    });
    socket.on('reconnect', function() {
        console.log("METODO DE RECONNECT.");
        inRoom(currentSchema);
    });
    console.log("SOCKET URL", URL);
    console.log("SOCKET OBJ", socket);
}

async function reconnectSocket(asset){
    socket.on('reconnect', function() {
        inRoom(asset);
    });
}

async function inRoom(asset){
    socket.emit("room", asset);
    console.log("ROOM ASSET", asset);
}

async function leaveRoom(asset){
    socket.emit("leave", asset);
    console.log("ROOM LIBERADO ASSET -> ", asset);
}

function subscribeTo(path, cb) {
    if (cb) {
        let url = config[env][currentSchema].wsUrl

        if (url !== window.socketUrl) {
            window.socketUrl = url;
            socket = null;
            loadSocket(url, currentSchema);
        }

        //window.socketUrl = url
        //socket = null
        //loadSocket(url)

        socket.on(path, data => {
            if (data.dbSchema !== undefined && data.dbSchema.asset === currentSchema) {
                cb(data)
            }
        })
    }
}

export { subscribeTo, inRoom, leaveRoom , reconnectSocket}
