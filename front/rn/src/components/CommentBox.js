import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import LinearGradient from 'react-native-linear-gradient'
import { colors, theme } from '../styles/theme'
import I18n from '../i18n/i18n'

export class CommentBox extends PureComponent {
    state = {
        comment: '',
        extrapadding: 15
    }
    extraPadding = 15
    _mounted = null
    
    constructor(props){
        super(props)
    }

    componentDidMount(){
        //set comment on mount
        this.keyboardHideListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidHide': 'keyboardWillHide', this.keyboardHideListener.bind(this))
        this.keyboardDidShowListener = Keyboard.addListener(Platform.OS === 'android' ? 'keyboardDidShow': 'keyboardWillShow', this.keyboardShowListener.bind(this))
        this._mounted = true
        this.setState({ comment: this.props.commentText })
        if(this.props.commentText!=''){
            this.input.focus()
        }
        
    }

    keyboardHideListener() {
        this.extraPadding = 15
        this.setState({ extrapadding: 15 })
    }

    keyboardShowListener() {
        if(this.props.keyboardPadding && (Platform.OS === 'ios')){
            setTimeout(() => {
                this.extraPadding = 55
                this.setState({ extrapadding: 55 })
            }, 500);
        }
    }

    getPadding(){
        return this.extraPadding
    }

    componentDidUpdate(prevProps, prevState){
        //Update comment on new props.commentText
        if(prevProps.commentText!=this.props.commentText && this._mounted){
            this.setState({ comment: this.props.commentText })
            if(this.props.commentText!=''){
                this.input.focus()
            }
        }
    }

    componentWillUnmount() {
        this._mounted = false
    }

    callOnSendPress = () => {
        this.input.blur()
        this.props.onSendPress(this.state.comment)
        this.setState({ comment:'' })
    }

    render() {
        const { box, input, sendButton } = styles
        let { placeholder } = this.props
        if(!placeholder){
            placeholder = I18n.t('component_commentBox_message')
        }
        return (
            <View style={[box, {paddingBottom:this.getPadding()}]}>
                <TextInput
                    ref={(input) => { this.input = input }}
                    style={input}
                    autoCorrect={false}
                    onChangeText={(comment) => this.setState({ comment })}
                    autoCapitalize='none'
                    underlineColorAndroid='transparent'
                    placeholder={placeholder}
                    value={this.state.comment}
                />
                <LinearGradient
                    style={sendButton}
                    colors={[colors.azure, colors.ceruleanBlue]}
                    startPoint={{ x: 0.0, y: 0.0 }} endPoint={{ x: 0.0, y: 1.0 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this.callOnSendPress.bind(this)}>
                        <LineIcon name='paper-plane' size={20} color={colors.white} />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'rgba(209, 209, 212, 0.5)',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 2,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.silver,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})