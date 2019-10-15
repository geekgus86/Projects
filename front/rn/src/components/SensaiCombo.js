import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Platform, Picker } from 'react-native'
import { colors } from '../styles/theme'
import { upperCase } from '../helpers'
import ModalSelector from 'react-native-modal-selector'
import I18n from '../i18n/i18n';
import { LabelTitle } from './'

export class SensaiCombo extends PureComponent {
    state = {
        selected:null,
    }
    componentWillMount() {
        this.setState({ selected:this.props.selected })
    }
    componentDidUpdate(prevProps, prevState){
        //Update selected on new props.selected
        if (prevProps.selected != this.props.selected) {
            this.setState({ selected: this.props.selected })
        }
    }
    componentWillReceiveProps(props){
        let index = 0
        const { label, items } = this.props
        let itemsWithIndex = items.map((i) => {
            i.index = index++
            return i
        })
        if (this.state.selected) {
            found = itemsWithIndex.filter((i) => i.value === this.state.selected)[0]
            if(!found){
                this.setState({ selected:-1})
            }
        }
    }
    itemChanged(itemValue, itemIndex) {
        this.setState({selected: itemValue})
        this.props.onChange && this.props.onChange(itemValue, itemIndex)
    }
    render() {
        const { label, items, defaultLabel } = this.props

        if(label && !items.find( item => item.value === -1)) {
    
            items.unshift({
                value: -1,
                label: defaultLabel ? I18n.t('pressSelector_select') : label, 
                enabled: false
            })
        }

        let pickerItems = items.map(function (rowinfo, i) {
            return (
                <Picker.Item label={rowinfo.label} value={rowinfo.value} key={i} enabled={false} />
            )
        })

        let picker = (
            <View style={{
                backgroundColor:'white',
                height: 40,
                justifyContent: "center",
                //marginTop: 5,
                //marginBottom: 5,
                width: '100%',
                borderColor: "#D1D1D4", 
                borderWidth: 1,
                borderRadius: 2
            }}>
                <Picker
                    selectedValue={this.state.selected}
                    onValueChange={(itemValue, itemIndex) => this.itemChanged(itemValue, itemIndex)}>
                    {items.length==0?
                        <Picker.Item label={'[Sin información...]'} value={''} key={-1}/>
                        :
                        pickerItems
                    }
                </Picker>
            </View>
        )
        if (Platform.OS === 'ios') {
            let index = 0
            let itemsWithIndex = items.map((i) => {
                i.index = index++
                return i
            })
            let initValue = this.props.label
            if (this.state.selected) {
                found = itemsWithIndex.filter((i) => i.value === this.state.selected)[0]
                initValue = found ? found.label : this.props.label
            }
            picker = (
                <View style={{
                    backgroundColor:'white',
                    marginTop: 5,
                    marginBottom: 5,
                    width: '100%', 
                }}> 
                    <ModalSelector
                        initValue = {defaultLabel ? I18n.t('pressSelector_select') : initValue}
                        cancelText = {I18n.t('cancel')}
                        data={itemsWithIndex}
                        keyExtractor= {item => item.value}
                        labelExtractor= {item => item.label}
                        onChange={(option) => {
                            this.itemChanged(option.value, option.index)
                        }}
                    />
                </View>
            )

        }

        let PickerComponent = 
        <View>
            <LabelTitle title={upperCase(label)} />
            {picker}
        </View>;

        if(this.props.horizontal){
            PickerComponent = 
                <View style={{flexDirection: "row", width: 350}}>
                    <View style={{width: "30%", marginTop: 15}}>
                        <Text style={styles.label2}>
                            {label}
                        </Text>
                    </View>
                    <View style={{width: "70%", marginLeft: 5 }}>
                        {picker}
                    </View>
                </View>;
        }

        return (
            <View style={{ marginBottom: 10 }}>
                {PickerComponent}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    label:{
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        marginTop: 5,
        width: '100%',
        marginBottom: 5,
        color: colors.coolGrey
    },
    label2:{
        fontFamily: 'Gotham Rounded',
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        marginTop: 5,
        width: '100%',
        marginBottom: 5,
        color: colors.darkGreyBlue
    },
})