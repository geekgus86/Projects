import {
    CLEAR_DOWNTIMES,
    SET_DOWNTIME,
    SET_DOWNTIMES,
    SET_DAILY_REPORT,
    SET_TOOL_LIST,
    SET_TOOL_REPORTS,
    SET_ALL_TOOLS
} from '../../store/actionTypes'
import moment from 'moment-timezone'
import { reducers } from '../../store/rootReducer';

const initialState = {
    production: null,
    tools: [],
    reports: [],
    dailyReport: [],
    downtimes: [],
    downtime: [],
}

export function groupByToolName(state) {
    const { production } = state.tools
    if (production != null) {
        if (production.data.length != 0) {
            let grouped = []
            let init = ''
            let end = ''
            let acum = 0

            for (let i = 0; i < production.data.length; i++) {
                let record = production.data[i]
                let next = production.data[i + 1]

                if (next) {
                    if (record.tool == next.tool) {
                        if (init == '') {
                            init = record.hora
                        }
                        acum += record.piezas
                    } else {
                        if (init == '') {
                            init = record.hora
                            end = next.hora
                        }else{
                            end = next.hora
                        }
                        grouped.push({
                            tool: record.tool,
                            start: init,
                            end: end,
                            piezas: (acum + record.piezas),
                            spm: record.spm
                        })
                        acum = 0
                        init = ''
                    }
                } else {
                    //Set last production hour hardcoded 1 hours
                    end = moment(record.hora).add(1, 'hours').format('YYYY-MM-DD HH:00:00')
                    if (init == '') {
                        init = record.hora
                    }
                    grouped.push({
                        tool: record.tool,
                        start: init,
                        end: end,
                        piezas: (acum + record.piezas),
                        spm: record.spm
                    })
                    acum = 0
                    init = ''
                    end = ''
                }
            }
            return grouped
        }
    }
    return production
}

export function getDateRange(state) {
    const { production } = state.tools
    if (production != null) {
        return {
            title: production.range,
            from: moment(production.fromDate).add(-1, 'day').format('YYYY-MM-DD'),
            to: moment(production.toDate).format('YYYY-MM-DD')
        }
    }
    return {
        title: '',
        from: null,
        to: null,
    }
}

export function toolsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOOL_LIST:
            return {
                ...state,
                production: action.payload
            }
        case SET_TOOL_REPORTS:
            return {
                ...state,
                reports: action.payload
            }
        case SET_ALL_TOOLS:
            return {
                ...state,
                tools: action.payload
            }
        case SET_DAILY_REPORT:
            return {
                ...state,
                dailyReport: action.payload
            }
        case SET_DOWNTIMES:
            return {
                ...state,
                downtimes: action.payload
            }
        case SET_DOWNTIME:
            return {
                ...state,
                downtime: action.payload
            }
        case CLEAR_DOWNTIMES:
            return {
                ...state,
                downtimes: []
            }
        default:
            return state
    }
}
