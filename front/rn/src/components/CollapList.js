import React, { PureComponent } from "react";
import { View } from "react-native";
import { LogCard } from './LogCard'
import { ToolHeader } from '../screens/production/ToolHeader'

import moment from 'moment-timezone'
import 'moment/locale/es'
import I18n from '../i18n/i18n';

export class CollapList extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        const { data, returnFunction, showButton, showOptions, failureFunction, showMaximo } = this.props
        return data.map((value, i)=>{
            let startDate = moment(value.inicio).format("hh:mm A")
            let endDate = moment(value.fin).format("hh:mm A")
            if(startDate == 'Invalid date'){
                startDate = I18n.t('actual')
            }
            if(endDate == 'Invalid date'){
                endDate = I18n.t('actual')
            }
            return <View key={i} style={{ marginBottom: 10 }}>
                <ToolHeader
                    number={value.tool}
                    start={startDate}
                    end={endDate}
                    collapse
                    onPress={()=>{
                        value.show = !value.show
                        this.forceUpdate()
                    }}
                    show={!value.show}
                />
                {!value.show?
                    (value.data).map((value_v, i_v)=>{
                        return <LogCard item={value_v} returnFunction={returnFunction} 
                                showOptions={showOptions&&value_v.report_statusID!=19} 
                                failureFunction={failureFunction} showButton={showButton} key={i_v}
                                showMaximo={showMaximo} />
                    }):null
                }
            </View>
        })
    }
};