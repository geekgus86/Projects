import React, { PureComponent } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { colors } from '../styles/theme'
import { upperCase } from '../helpers'

export class SensaiInput extends PureComponent {
    
    state = {
        labelColor: colors.coolGrey,
        text: ''
    }

    onPress = () => {
        this.props.onPress && this.props.onPress()
    }

    textChanged(value) {
        if (this.refs['input']) {
            value = this.refs['input'].getRawValue()
        }
        this.setState({ text: value })
        this.props.onChangeText && this.props.onChangeText(value)
    }

    componentDidMount() {
        if(this.props.value){//Revisar checked value
            this.setState({ text: this.props.value })
        }
        if(this.props.focus){
            this.input.focus()
        }
    }

    componentDidUpdate(prevProps, prevState){
        //Update comment on new props.commentText
        if(prevProps.value!=this.props.value){
            value = this.props.value
            if(value=='null'){
                value=''
            }
            this.setState({ text: value })
        }
    }

    render() {
        const { label, input, field, inputWithError, errorText } = styles
        const withError = this.props.invalid === true ? inputWithError : null
        
        return (
            <View style={[field, this.props.inputStyle]}>
                <Text style={[label, { color: this.state.labelColor }]}>{upperCase(this.props.label)}</Text>
                <TextInput
                    ref={(input) => { this.input = input }}
                    autoCorrect={false}
                    style={[input, withError]}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secure}
                    keyboardType={this.props.keyboardType}
                    returnKeyType={this.props.returnKeyType}
                    maxLength={this.props.maxLength}
                    autoCapitalize='none'
                    underlineColorAndroid='transparent'
                    onFocus={()=>{
                        if(!this.props.nohighlight){
                            this.setState({ labelColor:'black' })
                        }
                    }}
                    onBlur={()=>{
                        this.setState({ labelColor:colors.coolGrey })
                    }}
                    value={this.state.text}
                    onChangeText={this.textChanged.bind(this)}
                    onSubmitEditing={() => this.onPress()}
                />
                {this.props.invalid ? <Text style={errorText}>{this.props.errorMessage}</Text> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    field: {
        marginBottom: 30,
    },
    label: {
        fontFamily: 'Gotham Rounded',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        marginBottom: 5,
    },
    input: {
        height: 45,
        borderRadius: 2,
        backgroundColor: colors.white,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.silver,
        fontFamily: 'OpenSans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: colors.coolGrey,
        paddingLeft: 4,
        paddingRight: 4
    },
    inputWithError: {
        backgroundColor: colors.orangeRed5,
        borderColor: colors.orangeRed,
    },
    errorText: {
        fontFamily: 'OpenSans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.39,
        textAlign: 'left',
        color: colors.white
    }
})