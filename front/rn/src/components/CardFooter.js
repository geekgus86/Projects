import React, { PureComponent } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { colors } from '../styles/theme'
import { upperCase } from '../helpers'

export class CardFooter extends PureComponent {
    callOnPress = () => {
        this.props.onPress && this.props.onPress()
    }
    render() {
        const { container, text } = styles
        let { icon } = this.props
        if(!icon){
            icon = 'arrow-right'
        }
        return (
            <TouchableWithoutFeedback onPress={this.callOnPress.bind(this)}>
                <View style={container}>
                    <Text style={text}>{this.props.text}</Text>
                    <Icon name={icon} size={25} color={colors.coolGrey} />
                </View>
            </TouchableWithoutFeedback>
        )
    }    
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginBottom: 10,
    },
    text: {
        fontFamily: "Gotham Rounded",
        fontSize: 16,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: -0.39,
        textAlign: "center",
        color: "#898b8e",
    }
}