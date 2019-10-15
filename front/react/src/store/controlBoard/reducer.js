import { SET_ERROR, SET_LAST_PRODUCTION_RECORD, SET_PRODUCTION, SET_OAPR, SET_REPORTS_OF_THE_DAY, SET_WEEK_PRODUCTION, SET_PROFILE, UPDATE_LAST_HOUR, SET_LAST_HOUR } from "./types";
import moment from "moment-timezone";
import "moment/locale/es";

const initialState = {
  production: null,
  productionControlOA: null,
  profile: null,
  weekProduction: null,
  lastRecord: null,
  reports: null,
  comments: null,
  error: null
};

export function prodControlReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LAST_PRODUCTION_RECORD:
      return { ...state, lastRecord: action.payload, error: null }
    case SET_PRODUCTION:
      return { ...state, production: action.payload, error: null }
    case SET_OAPR:
      return { ...state, productionControlOA: action.payload, error: null }
    case SET_REPORTS_OF_THE_DAY:
      return { ...state, reports: action.payload, error: null }
    case SET_WEEK_PRODUCTION:
      return { ...state, weekProduction: action.payload, error: null }
    case SET_PROFILE:
      return { ...state, profile: action.payload, error: null }
    case SET_ERROR:
      return { ...state, error: action.payload }
    case UPDATE_LAST_HOUR:
      return { ...state, lastHourUpdate: action.payload }
    case SET_LAST_HOUR:
      return { ...state, lastHour: action.payload }
    default:
      return state;
  }
}

export function getGroupedData(state) {
  const { production, reports } = state.prodControl;
  if (production && reports) {
    production.forEach((hourRecord) => {
      const currentHour = moment(hourRecord.hora);
      const nextHour = moment(hourRecord.hora).add(1, 'hour')
      let downtimes = {};
      let coDowntimes = {};
      let _reports = [];
      let total = 0;

      const filtered = reports.filter((reportRecord) => {
        return moment(reportRecord.createdAt).isBetween(currentHour, nextHour, 'milliseconds', '[)'); // right inclusive
      });
      
      filtered.forEach((f) => {
        _reports.push(f);
        //Only the issuetype 5 dont sum to column total
        if(f.id !== 5){
          total += f.diff;
        }        
        //Verificamos los paros, else: C/O
        if (f.report_type === 1) {
          //#1 - Tiempo no reportado
          if (!f.id && f.diff >= 1) {
            let d = downtimes["tnr"] || 0;
            downtimes["tnr"] = d + f.diff;
          } else {
            //#2 - Areas por id
            if(!downtimes[f.id]) {
              downtimes[f.id] = 0
            }
            downtimes[f.id] += f.diff;
          }
        } else {
          if (!f.id && f.diff >= 1) {
            // TNR
            let d = coDowntimes["tnr"] || 0;
            coDowntimes["tnr"] = d + f.diff;
          } else {
            // Areas
            if(!coDowntimes[f.id]) {
              coDowntimes[f.id] = 0
            }
            coDowntimes[f.id] += f.diff;
          }
        }
      });

      hourRecord.downtimes = downtimes;
      hourRecord.coDowntimes = coDowntimes;
      
      hourRecord.reports = _reports.sort((a,b) => {
        return moment(a.createdAt).isSameOrBefore(moment(b.createdAt)) ? 0 : 1
      })

      hourRecord.total = total;
    });

    /*const grouped = groupBy(production, (d) => {
      return moment(d.hora).utc().hour();
    });*/

    let groupedData = [];
    production.forEach((record) => {
      let tools = record.tool
      let speeds = record.spm
      let objectives = record.piezas_p
      let real = record.piezas
      let oa = record.oa_h;
      //let acum_p = record.acumulado_p;
      //let acum_r = record.acumulado_r;
      let oa_a = record.oa_a;
      let coDowntimesGrouped = {};
      let downtimesGrouped = {};
      //let total = 0;

      for (let d in record.downtimes) {
        let r = downtimesGrouped[d] || 0;
        downtimesGrouped[d] = r + record.downtimes[d];
      }

      for (let d in record.coDowntimes) {
        let r = coDowntimesGrouped[d] || 0;
        coDowntimesGrouped[d] = r + record.coDowntimes[d];
      }
      let newRecord = Object.assign({}, record);
      newRecord.downtimes = downtimesGrouped;
      newRecord.coDowntimes = coDowntimesGrouped;
      newRecord.tool = tools;
      newRecord.spm = speeds;
      newRecord.piezas_p = objectives;
      newRecord.piezas = real;
      newRecord.oa_h = oa;
      newRecord.oa_a = oa_a;
      newRecord.dateperiod = record.dateperiod
      groupedData.push(newRecord);
    })  
    return groupedData;
  }
  return null;
}

export function getHeaderData(state) {
  const { profile } = state.prodControl
  if (profile !== null) {
    let headerData = {
      shift: '',
      tl: '',
      gl: '',
    }
    if (profile.organization) {
      headerData.shift = `${profile.shift || 1}${profile.organization.alias || 'C'}`
    }
    if (profile.tl) {
      headerData.tl = `${profile.tl.nombre || ''} ${profile.tl.apellidoPaterno || ''} ${profile.tl.apellidoMaterno || ''}`
    }
    if (profile.gl) {
      headerData.gl = `${profile.gl.nombre || ''} ${profile.gl.apellidoPaterno || ''} ${profile.gl.apellidoMaterno || ''}`
    }
    return headerData
  }
  return null
}

export const getDownTimes = (reports) => {
  let downtimes = {
    changeOver: {},
    downtime: {},
    total: 0
  }

    downtimes.downtime['7'] = 0
    reports.forEach((report) => {
    let downtimeKey = 'changeOver'
    if(report.report_type === 1) {
      downtimeKey = 'downtime'
    }
    let reportKey = report.id || 'tnr'
    
    if (!downtimes[downtimeKey][reportKey]) {
      downtimes[downtimeKey][reportKey] = 0
    }

    if (report.diff > 1) {
      downtimes[downtimeKey][reportKey] += report.diff
    } else {
      downtimes.downtime['7'] += report.diff
    }
    if (report.id !== 5) downtimes.total += report.diff  
  })
  return downtimes
}