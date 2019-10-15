import config from './config'
import ls from './localStorage'
import { env } from './config'

class Api {
    _config = null
    _storage = null

    constructor(config, storage) {
        this._config = config
        this._storage = storage
    }

    _request(_method, uri, data) {
        try {
            const strSchema = this._storage.getItem('schema')
            let URL
            // let schemaUrl = "";

            let environment = config[env];

            /*if(env === "production"){
                let jsonSchema = JSON.parse(strSchema)
                environment =  config[(jsonSchema && jsonSchema.schema.indexOf('apo') < 0) ? 'etesting' : 'production'] || config['production']
                //schemaUrl = "/"+((jsonSchema && jsonSchema.schema) || "apo_schulerA");
            }*/
            let jsonSchema = JSON.parse(strSchema)
            let asset = jsonSchema ? jsonSchema.schema : "apo_schulerA"
            if(uri.includes('http') || uri.includes('https')){
                URL = uri;
            }else{
                URL = environment[asset].baseUrl +"/api/v1"+uri; 
            }
            /*if (!strSchema) {     
                URL = config.baseUrl+"/apo_schulerA/api/v1"+uri
            }else{
                let jsonSchema = JSON.parse(strSchema)
                URL = config.baseUrl+"/"+jsonSchema.schema +"/api/v1"+uri
            }*/
                       
            let _headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

            const token = this._storage.getItem('token')
            if (token) {                
                _headers['Authorization'] = 'Bearer ' + token
            }

            //const strSchema = this._storage.getItem('schema')
            if (strSchema) {                
                let jsonSchema = JSON.parse(strSchema)
                _headers['schema'] = jsonSchema.schema
            }

            let options = {
                headers: _headers,
                method: _method
            }
            if (data) {
                options.body = JSON.stringify(data)
            }
            return new Promise((resolve, reject) => {
                fetch(URL, options).then((response) => {
                    if (response.status === 403 || response.status === 401 || response.status === 500 || response.status === 404) {                        
                        reject({ success: false, status: response.status, error: response.statusText })
                    }
                    if (response.status === 200 && response._bodyText === '') {
                        resolve({})
                    }
                    return response.json()
                }).then((json) => {
                    resolve(json)
                }).catch((error) => {
                    reject({ success: false, error: error })
                })
            })
        } catch (err) {
            console.log(err)
        }  
    }
    get(uri, params = null) {
        let completeUri = `${uri}`
        if(params) {
            completeUri += '?'
            let keys = Object.keys(params)
            keys.forEach( (key, index) => {
                completeUri += `${key}=${params[key]}${index === keys.length - 1 ? '' : '&'}`
            })
        }
        return this._request('GET', completeUri, null)
    }
    post(uri, data) {
        return this._request('POST', uri, data)
    }
    put(uri, data) {
        return this._request('PUT', uri, data)
    }
    delete(uri) {
        return this._request('DELETE', uri, null)
    }
}
let _api = new Api(config, ls)
export default _api