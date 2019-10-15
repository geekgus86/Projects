import api from "../../lib/api";
import ls from "../../lib/localStorage";
import messages_en from "../../i18n/en.json"
import messages_es from "../../i18n/es.json"
import React, { Component } from 'react';
import { SET_USER_SESSION, SET_ERROR, CLEAR_SESSION, SET_USERS, SET_USER, SET_SCHEMA, SET_ARR_ASSETS } from "./types";

export function fetchUserList() {
  return async (dispatch, getState) => {
    try {
      const response = await api.get("/useremployee?limit=1000")
      dispatch(setUsers(response))
    } catch (error) {
      dispatch(setError(error.error))
    }
  }  
}

export function fetchUser(id) {
  return async (dispatch, getState) => {
    try {
      const response = await api.get(`/useremployee/${id}`)
      dispatch(setUser(response))
    } catch (error) {
      dispatch(setError(error.error))
    }
  }  
}

export function fetchUserSession() {
  return async (dispatch, getState) => {
    try {
      const token = ls.getItem('token') 
      const session = ls.getItem('sessionData')       

      if (session && token) {
        await api.get(`/auth/verify/`)
        var nSess = JSON.parse(session)
        dispatch(setUserSession(nSess))
      } else {
        let validaRed = networkStatus()
        if(validaRed > 0){
          ls.clear()
          dispatch(clearSession())
        }
      }
    } catch (error) {
      let validaRed = networkStatus()
      if(validaRed > 0){
        ls.clear()
        dispatch(clearSession())
      }
      let jsonP = JSON.stringify(error.error)
      if(jsonP != '{}'){
        dispatch(setError(error.error));
      }else{
        if(ls.getItem('language') === "es"){
          dispatch(setError(messages_es['controlBoard.connection']));
        }else{
          dispatch(setError(messages_en['controlBoard.connection']));
        }
      }
    }
  }
}

export function networkStatus(){
  let resVal = 0
  var xhr = new XMLHttpRequest();
      var file = "https://sfms.metalsa.com/api/v1/versionapp";
  
      xhr.open('GET', file, true);
      xhr.send();
      
      xhr.addEventListener("readystatechange", processRequest, false);
  
      function processRequest(e) {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 304) {
            resVal = 1
            console.log("NETWORK STATUS : ","Connection exists!")
          } else {
            resVal = 0
            console.log("NETWORK STATUS : ","Connection doesn't exist!")
          }
        }
      }
    return resVal
}

export function loginUser(credentials) {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("/auth/login", credentials)
      ls.setItem("sessionData", JSON.stringify(response.Profile))
      ls.setItem("token", response.UserLogin.token)
      ls.setItem("changePress",true)
      dispatch(setUserSession(response.Profile))
    } catch (error) {
      dispatch(setError('Las credenciales son inválidas'))
    }
  }
}

export function fetchSchema() {
  return async (dispatch, getState) => {
    try {

      const arrAssets = [
        {
          id: 1,
          type: "Schuler",
          name: "A",
          fullName: "Schuler A",
          schema: "apo_schulerA",
          default_lg: "es",
          andonURL: "/showroom-sa-chrome/build/",
          plant: 1
        },
        {
          id: 2,
          type: "Schuler",
          name: "B",
          fullName: "Schuler B",
          schema: "apo_schulerB", 
          default_lg: "es",
          andonURL: "/showroom-sb-chrome/build/",
          plant: 1
        },
        {
          id: 3,
          type: "Fagor",
          name: "A",
          fullName: "Fagor A",
          schema: "apo_fagorA", 
          default_lg: "es",
          andonURL: "/showroom-fa-chrome/build/",
          plant: 1
        },
        {
          id: 4,
          type: "Fagor",
          name: "B",
          fullName: "Fagor B",
          schema: "apo_fagorB", 
          default_lg: "es",
          andonURL: "/showroom-fb-chrome/build/",
          plant: 1
        },
        {
          id: 5,
          type: "K",
          name: "1200",
          fullName: "K1200",
          schema: "apo_k1200", 
          default_lg: "es",
          andonURL: "/showroom-k1200-chrome/build/",
          plant: 1
        },
        {
          id: 6,
          type: "",
          name: "Jinan",
          fullName: "Jinan",
          schema: "apo_jinan", 
          default_lg: "es",
          andonURL: "/showroom-jinan-chrome/build/",
          plant: 1
        },
        {
          id: 7,
          type: "",
          name: "Aida",
          fullName: "Aida",
          schema: "apo_aida", 
          default_lg: "es",
          andonURL: "/showroom-aida-chrome/build/",
          plant: 1
        },
        {
          id: 8,
          type: "E",
          name: "1500",
          fullName: "E1500",
          schema: "apo_e1500", 
          default_lg: "es",
          andonURL: "/showroom-e1500-chrome/build/",
          plant: 1
        },
        {
          id: 9,
          type: "D",
          name: "800",
          fullName: "D800",
          schema: "apo_d800", 
          default_lg: "es",
          andonURL: "/showroom-d800-chrome/build/",
          plant: 1
        },
        {
          id: 10,
          type: "K",
          name: "1",
          fullName: "K1",
          schema: "et_k1",
          default_lg: "en",
          andonURL: "/showroom-etk1-chrome/build/",
          plant: 2
        },
        {
          id: 11,
          type: "K",
          name: "2",
          fullName: "K2",
          schema: "et_k2",
          default_lg: "en",
          andonURL: "/showroom-etk2-chrome/build/",
          plant: 2
        },
        {
          id: 12,
          type: "K",
          name: "3",
          fullName: "K3",
          schema: "et_k3",
          default_lg: "en",
          andonURL: "/showroom-etk3-chrome/build/",
          plant: 2
        },
        {
          id: 13,
          type: "K",
          name: "4",
          fullName: "K4",
          schema: "et_k4",
          default_lg: "en",
          andonURL: "/showroom-etk4-chrome/build/",
          plant: 2
        },
        {
          id: 14,
          type: "K",
          name: "5",
          fullName: "K5",
          schema: "et_k5",
          default_lg: "en",
          andonURL: "/showroom-etk5-chrome/build/",
          plant: 2
        },
        {
          id: 15,
          type: "K",
          name: "6",
          fullName: "K6",
          schema: "et_k6",
          default_lg: "en",
          andonURL: "/showroom-etk6-chrome/build/",
          plant: 2
        },
        {
          id: 16,
          type: "K",
          name: "7",
          fullName: "K7",
          schema: "et_k7",
          default_lg: "en",
          andonURL: "/showroom-etk7-chrome/build/",
          plant: 2
        },
        {
          id: 17,
          type: "K",
          name: "8",
          fullName: "K8",
          schema: "et_k8",
          default_lg: "en",
          andonURL: "/showroom-etk8-chrome/build/",
          plant: 2
        },
        {
          id: 18,
          type: "K",
          name: "9",
          fullName: "K9",
          schema: "et_k9",
          default_lg: "en",
          andonURL: "/showroom-etk9-chrome/build/",
          plant: 2
        },
        {
          id: 19,
          type: "K",
          name: "14",
          fullName: "K14",
          schema: "et_k14",
          default_lg: "en",
          andonURL: "/showroom-etk14-chrome/build/",
          plant: 2
        },
        {
          id: 20,
          type: "K",
          name: "15",
          fullName: "K15",
          schema: "et_k15",
          default_lg: "en",
          andonURL: "/showroom-etk15-chrome/build/",
          plant: 2
        }
      ]

      dispatch(setSchema(arrAssets[0]))
      dispatch(setArrAssets(arrAssets))

      let schema = await ls.getItem("schema")
      if(schema){
        schema = JSON.parse(schema)
        dispatch(setSchema(schema))
      }else{
        ls.setItem("schema", JSON.stringify(arrAssets[0]))
      }

    } catch (error) {
      dispatch(setError(error.error))
    }
  }
} 

export function fetchChangeLang(id, locale) {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("http://odix.metalsa.com/admin/api/user/updateLocale", { "id": id, "localeID": locale});
      console.log("LANG SAVE:",response+'-'+id+'-'+locale)
      //dispatch(setRollos(data));
    } catch (error) {
      console.log("LANG SAVE ERROR:",error)
    }
  }
}

export function setActualSchema(schema) {
  return async (dispatch, getState) => {
    try {
      ls.setItem("schema", JSON.stringify(schema))
      dispatch(setSchema(schema))
    } catch (error) {
      dispatch(setError(error.error))
    }
  }
}

export function logoutUser() {
  return async (dispatch, getState) => {
    try {
      // ruta de logout?
      // await api.get("/user/logout");
      ls.clear();
      dispatch(clearSession())
    } catch (error) {
      dispatch(setError(error.error));
    }
  }
}

export function setSchema(schema) {
  return {
    type: SET_SCHEMA,
    payload: schema
  }
}

export function setArrAssets(arrAssets) {
  return {
    type: SET_ARR_ASSETS,
    payload: arrAssets
  }
}

export function setUserSession(session) {
  return {
    type: SET_USER_SESSION,
    payload: session
  }
}

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error
  }
}

export function clearSession() {
  return {
    type: CLEAR_SESSION
  }
}

export function setUsers(userList) {
  return {
    type: SET_USERS,
    payload: userList,
  }
}

export function setUser(singleUser) {
  return {
    type: SET_USER,
    payload: singleUser,
  }
}