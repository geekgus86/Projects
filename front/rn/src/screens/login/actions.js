import Network from '../../lib/Network'
import { AsyncStorage, Platform, Dimensions } from 'react-native'
import { inRoom  } from '../../lib/Socket'
import {
    SET_PUSH_TOKEN,
    DISPLAY_AUTH_ERROR,
    SET_SESSION_DATA,
    CLEAR_SESSION_DATA,
    SET_APP_DOMAIN,
    SET_ORIENTATION,
    CHECK_FOR_UPDATES
} from '../../store/actionTypes'

import { clearSession } from '../profile/actions'
import I18n from '../../i18n/i18n'

async function fetchLocalSession() {
    try {
        const storage = await AsyncStorage.multiGet(['sessionToken', 'sessionData'])
        const sessionToken = storage[0][1]
        const sessionData = storage[1][1]
        return { sessionToken, sessionData }
    } catch (error) {
        return error
    }
}

export function fetchServerSession() {
    return async (dispatch, getState) => {
        try {    
            actualResponse = await Network.post('/auth/checkLogin')    
            response = await AsyncStorage.getItem('sessionData')
            let schema = await AsyncStorage.getItem('machine')
            inRoom((JSON.parse(schema)['name']))
            if (!response) {
                dispatch(clearSession())
            } else {
                const response = await fetchLocalSession()
                if (response !== null) {          
                    const payload = JSON.parse(response.sessionData)
                    if(actualResponse.data.Profile.push_token !== payload.Profile.push_token){
                        dispatch(clearSession())
                    }else{       
                        dispatch(setUserSession(payload))
                    }
                } else {
                    dispatch(clearSession())
                }
            }
        } catch (error) {
            //dispatch(displayAuthErrors(error))
            console.log("Hubo error en cierre de sesión.")
            console.log(error);
        }
    }
}

export function loginUser(email, password, pushToken) {
    return async (dispatch, getState) => {
        try {
            let os = Platform.OS === 'ios' ? 'iOS' : 'Android'
            const response = await Network.post('/auth/login', {
                user:{
                    email: email,
                    password: password,
                    push_token: pushToken,
                    os_id: os,
                }
            })
            if (response.message || response.err) {
                dispatch(displayAuthErrors(response.message || response.err))
            } else {
                await AsyncStorage.multiSet([
                    ['sessionToken', response.UserLogin.token],
                    ['sessionData', JSON.stringify(response)]
                ])
                console.log(response.UserLogin.token)
                dispatch(setUserSession(response))
            }
        } catch (error) {
            dispatch(displayAuthErrors(error))
        }
    }
}

export function saveDomain(domain, secure) {
    return async (dispatch, getState) => {
        try {
            await AsyncStorage.multiSet([
                ['app-domain', domain],
                ['app-secure', `${secure}`]
            ])
            dispatch(setDomain({
                domain: domain,
                secure: secure
            }))
        }
        catch (error) {
            dispatch(displayAuthErrors(error))
        }
    }
}

export function checkForUpdates() {
    return async (dispatch, getState) => {
      try {
        const response = await Network.get('https://sfms.metalsa.com/api/v1/versionapp');
        dispatch(setUpdateVersion(response));
      } catch (error) {
        dispatch(setUpdateVersion(error));
      }
    }
  }

  export function updateLocale(id,locale) {
    return async (dispatch, getState) => {
      try {
        //const response = await Network.post('https://api-admin.azurewebsites.net/api/user/updateLocale',
        const response = await Network.post('http://i40appgateway.eastus.cloudapp.azure.com/admin/api/user/updateLocale',
        {id: id, localeID: locale});
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

export function fetchDomain() {
    return async (dispatch, getState) => {
        try {
            const storage = await AsyncStorage.multiGet(['app-domain', 'app-secure'])
            const domain = storage[0][1] || 'production'
            const secure = storage[1][1] || 'false'
            dispatch(setDomain({
                domain: domain,
                secure: secure
            }))
        }
        catch (error) {
            dispatch(displayAuthErrors(error))
        }
    }
}

export function setPushNotificationToken(token) {
    return  {
        type: SET_PUSH_TOKEN,
        payload: token
    }
}

export function displayAuthErrors(error) {
    return {
        type: DISPLAY_AUTH_ERROR,
        payload: error,
    }
}

export function setUserSession(sessionData) {
    return {
        type: SET_SESSION_DATA,
        payload: sessionData,
    }
}

export function clearUserSession() {
    return {
        type: CLEAR_SESSION_DATA,
    }
}

export function setDomain(data) {
    return {
        type: SET_APP_DOMAIN,
        payload: data
    }
}

export function setUpdateVersion(data) {
    return {
        type: CHECK_FOR_UPDATES,
        payload: data,
    }
}

export function setOrientation() {
    let data = false
    const {height, width} = Dimensions.get('window'); 
    const aspectRatio = height/width;
    if(aspectRatio>1.6) {
        //code phone
        data = false
    }else {
        //code tablet
        data = true
    }
    return {
        type: SET_ORIENTATION,
        payload: data
    }
}