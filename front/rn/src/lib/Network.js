import { AsyncStorage } from 'react-native'
import { store } from '../store'
import { clearUserSession } from '../screens/login/actions'
import I18n from '../i18n/i18n'
import config from './config'
 
export default {
    get: async function (uri) {
        const state = store.getState()
        let schema = await AsyncStorage.getItem('schema') || 'apo_schulerA'
        //let config = require('./config')[state.session.domain] || require('./config')['production']
        let domain = (state.session && state.session.domain) || "production"
        //let domain = 'testing'
        let URL = ''
        let environment = config[domain];
        /*if (domain && (domain.includes("etesting") || domain.includes("production"))) {
            if (schema.includes("apo"))
                config = require('./config')["production"]
            else
                config = require('./config')["etesting"]
        }*/

        //let jsonSchema = JSON.parse(schema)
        //let asset = jsonSchema ? jsonSchema.schema : "apo_schulerA"
        URL = environment[schema].baseUrl +"/api/v1"+uri; 
        if(uri.includes('http') || uri.includes('https')){
            URL = uri;
        }
        //URL = `${config.baseUrl}/api/v1${uri}`
     
        let response = null
        let token = await AsyncStorage.getItem('sessionToken')

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        if (token) {
            headers['authorization'] = 'Bearer ' + token
        }
        headers['SCHEMA'] = schema

        //console.debug("Network GET: ")
        //console.debug(`\t URL: ${URL}`)
        //console.debug(`\t Headers: ${JSON.stringify(headers)}`)
        try {
            response = await fetch(URL, {
                method: 'GET',
                headers: headers,
            })
            // console.log(response)
            console.log("GET URL NETWORK", URL);
        } catch (err) {
            console.log(URL, err)
            return { success: false, message: I18n.t('network_no_connected_sensai') }
        }
        //console.debug(`\t Response:`)
        //console.debug(`\t\t Status: ${response.status}`)
        if (response.status != 200) {
            console.debug(`\t\t Body: ${response._bodyText}`)
        }
        if (response.status == 502 || response.status == 405) {
            return { success: false, message: I18n.t('network_no_connected_sensai') }
        }
        if (response.status == 403) {
            return { success: false, status: 403 }
        }
        if (response.status == 401) {
            await AsyncStorage.multiRemove(['sessionToken', 'sessionData'])
            store.dispatch(clearUserSession())
            return { success: false, status: 401, message: I18n.t('network_incorrect_user_data') }
        }
        if (response._bodyText == "") {
            return {}
        }
        if (response.status == 550) {
            data = await response.json()
            alert(data.err)
            return data
        }
        return response.json()
    },
    call: async function (uri, data, method, formData) {
        const state = store.getState()
        let schema = await AsyncStorage.getItem('schema') || 'apo_schulerA'
        //let config = require('./config')[state.session.domain] || require('./config')['production']
        let domain = (state.session && state.session.domain) || "production"
        //let domain = 'testing'
        let URL = ''
        let environment = config[domain];
        /*if (domain && (domain.includes("etesting") || domain.includes("metalsa"))) {
            if (schema.includes("apo"))
                config = require('./config')["metalsa"]
            else
                config = require('./config')["etesting"]
        }*/

        //URL = `${config.baseUrl}/api/v1${uri}`
        URL = environment[schema].baseUrl +"/api/v1"+uri; 
        if(uri.includes('http')){
            URL = uri;
        }
        let response = null
        let token = await AsyncStorage.getItem('sessionToken')

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        if (formData) {
            delete headers['Content-Type']
        }
        if (token) {
            headers['authorization'] = 'Bearer ' + token
        }
        headers['SCHEMA'] = schema

        //console.log(`Network ${method}: `)
        //console.log(`\t URL: ${URL}`)
        //console.log(`\t Headers: ${JSON.stringify(headers)}`)
        //console.log(`\t Data: ${JSON.stringify(data)}`)
        try {
            response = await fetch(URL, {
                method: method,
                headers: headers,
                body: formData ? data : JSON.stringify(data || {})
            })
            console.log("URL CALL", URL);
            console.log("DATA CALL", data);
            console.log("RESPONSE", response);
            // console.log(data)
        } catch (err) {
            console.log(URL, err)
            return { success: false, message: I18n.t('network_no_connected_sensai') }
        }
        //console.debug(`\t Response:`)
        //console.debug(`\t\t Status: ${response.status}`)
        if (response.status != 200) {
            console.debug(`\t\t Body: ${response._bodyText}`)
        }
        if(response.status == 201){
            return { success: true, data : await response.json() }
        }
        if(response.status == 502 || response.status == 405){
            return { success: false, message: I18n.t('network_no_connected_sensai') }
        }
        if (response.status == 550) {
            data = await response.json()
            alert(data.err)
            return data
        }
        if (response.status == 403) {
            return { success: false, status: 403 }
        }
        if (response.status == 307) {
            return { success: false, status: 307, message: I18n.t('network_no_internet') }
        }
        if (response.status == 401) {
            await AsyncStorage.multiRemove(['sessionToken', 'sessionData'])
            store.dispatch(clearUserSession())
            data = await response.json()
            alert(data.err)
            return data
        }
        if (response._bodyText == "") {
            return {}
        }
        return response.json()
    },
    post: async function (uri, data, formData = false) {
        return await this.call(uri, data, 'POST', formData)
    },
    put: async function (uri, data, formData = false) {
        return await this.call(uri, data, 'PUT', formData)
    },
    del: async function (uri) {
        return await this.call(uri, null, 'DELETE', null)
    },
}