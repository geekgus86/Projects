import { AsyncStorage } from 'react-native'
import openSocket from 'socket.io-client'
import { store } from '../store'
import config from './config'

let socket = null

function loadSocket(URL,asset) {
    socket = openSocket(URL, {
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 2000,
        transports: ['websocket'],
        agent: false,
        upgrade: false,
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
        inRoom(asset);
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

async function subscribeTo(path, cb) {
    if (cb) {
        const state = store.getState()
        let schema = await AsyncStorage.getItem('schema') || 'apo_schulerA'
        //let config = require('./config')[state.session.domain] || require('./config')['metalsa']
        let domain = (state.session && state.session.domain) || "production"
        let environment = config[domain];
        /*if (domain && (domain.includes("etesting") || domain.includes("metalsa"))) {
            if (schema.includes("apo"))
                config = require('./config')["metalsa"]
            else
                config = require('./config')["etesting"]
        }*/
        //let jsonSchema = JSON.parse(schema)
        //let asset = jsonSchema ? jsonSchema.schema : "apo_schulerA"
        let url = environment[schema].wsUrl
        
        if (url !== global.socketUrl) {
            global.socketUrl = url
            socket = null
            loadSocket(url,schema)
        }
        socket.on(path, data =>{
            const state = store.getState()
            if (data && state.userMachine.machine) {
                if (typeof data.dbSchema !== 'undefined') {
                    schema = state.userMachine.machine.name
                    if(data.dbSchema.schema == 'Admin'){
                        cb(data)
                    }
                    if(data.dbSchema.asset == schema){
                        cb(data)
                    }
                }
            }
        })
    }
}

function unsubscribe(path){
    socket.removeListener(path)
}

export { subscribeTo, unsubscribe , inRoom, leaveRoom ,reconnectSocket}
