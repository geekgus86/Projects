import React, { PureComponent } from 'react'
import { SensaiInput, SensaiButton } from '../components'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { colors } from '../styles/theme'
import { navigate } from '../helpers'
import Icon from 'react-native-vector-icons/FontAwesome'

import BottomSheet from 'react-native-bottomsheet';
import I18n from '../i18n/i18n';

export class SensaiCheckbox extends PureComponent {
    state = {
        checked: false,
        showActions: false,
        comment: '',
        editable: true,
    }

    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        let val = !this.state.checked
        let comment = this.state.comment
        this.setState({ checked: val })
        this.props.onChange && this.props.onChange(val, comment)
    }

    checkboxStyle() {
        let style = {
            width: 36,
            height: 36,
            borderRadius: 6,
            backgroundColor: colors.white,
            borderStyle: 'solid',
            borderWidth: 1.5,
            borderColor: colors.azure,
            justifyContent: 'center',
            alignItems: 'center',
        }
        if (this.state.checked === true) {
            style.backgroundColor = colors.azure
        }else{
            if(this.state.showActions){
                style.borderColor = colors.orangeRed
            }
        }
        return style
    }

    _loadOptions() {
        BottomSheet.showBottomSheetWithOptions({
            // options: ['Dejar un comentario', 'Alta de anormalidad', 'Cancelar'],
            options: [I18n.t('write_message'), I18n.t('cancel')],
            title: I18n.t('checklist_options'),
            dark: false,
            cancelButtonIndex: 1,
        }, (value) => {
            switch(value){
                case 0:
                    if(this.props.selectedId){//Return selected id if exists
                        this.props.selectedId.returnF(this.props.selectedId.id)
                    }
                    this.setState({ showActions: true })
                    break;
                // case 1:
                //     navigate('NewReportModal', { showAb: true})
                //     break;
                case 1:
                    this.setState({ showActions: false, comment:'', editable: true, checked: false })
                    this.props.onChange(false, '')
                    break;
            }
        });
    }

    componentDidMount() {
        if(this.props.checked){//Revisar checked value
            this.setState({ checked: this.props.checked })
        }
        if(this.props.comment){//Revisar comment value
            this.setState({ comment: this.props.comment, showActions: true })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.showActions){//Enviar comment si esta habilitada la caja
            let val = this.state.checked
            let comment = this.state.comment
            this.props.onChange && this.props.onChange(val, comment)
        }

        if(this.props.selectedId && this.state.comment==""){//Hide al checkbox except selected
            const { selectedId } = this.props
            if(selectedId.id != selectedId.selectedId){
                if(this.state.showActions){
                    this.setState({ showActions: false })
                }
            }
        }

        if(prevProps.checked!=this.props.checked){//Revisar checked value
            this.setState({ checked: this.props.checked })
        }

        if(prevProps.comment!=this.props.comment){//Revisar comment value
            this.setState({ comment: this.props.comment, showActions: true })
        }
    }

    render() {
        const { container, checkbox, label } = styles
        const { showButton } = this.props
        let { checkStyle, checkContainerStyle } = this.props
        if (!checkStyle) {//Default checkbox styles
            checkStyle = {
                paddingTop: 5,
                borderBottomWidth :1,
                borderBottomColor: colors.silver,
            }
        }
        if (!checkContainerStyle) {
            checkContainerStyle = {}
        }
        return (
            <View style={checkStyle}>
                <View style={[container, checkContainerStyle]}>
                    <TouchableWithoutFeedback onPress={this.onPress}>
                        <View style={this.checkboxStyle()}>
                            {
                                this.state.checked?
                                <Icon name="check" style={checkbox} size={32} />:<View>
                                {
                                    this.state.showActions?
                                    <Text style={{ color: colors.orangeRed }}>{"!"}</Text>:null
                                }
                                </View>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.onPress}>
                        <View style={{ justifyContent: 'center', width: '85%' }}>
                            <Text style={label}>{this.props.label}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {
                        (showButton)?
                        <TouchableOpacity 
                            style={{ width: 30, paddingLeft: 10, marginLeft: -10 }}
                            onPress={() => this._loadOptions()}
                        >
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Icon name="ellipsis-v" size={32} />
                            </View>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>
                {
                    (this.state.showActions)?
                    <View style={{
                        flex: 1,
                        marginLeft: 10,
                        flexDirection: 'row',
                        width: '95%'
                    }}>
                        <View style={{
                            width: '100%',
                            marginBottom: -10,
                        }}>
                            <SensaiInput
                                editable={this.state.editable}
                                value={this.state.comment}
                                label={I18n.t('comment')}
                                placeholder={`${I18n.t('write_message')}`}
                                onChangeText={(comment) => this.setState({ comment:comment })} 
                            />
                        </View>
                    </View>
                    :
                    null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '95%',
        alignItems: 'center',
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        paddingBottom: 10,
    },
    label: {
        fontFamily: 'Open Sans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.darkGreyBlue,
        marginLeft: 15,
        marginRight: 15,
    },
    checkbox: {
        color: colors.white,
    }
})