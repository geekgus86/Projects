import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

class NotificationIcon extends Component {
    state = {
        notifications: 5
    }
    render() {
        const { tintColor } = this.props
        return (
            <View style={styles.notificationIcon}>
                <Icon name='bell' size={26} color={tintColor} />
                <View style={styles.notificationView}>
                    <Text style={styles.notificationText}>{this.state.notifications}</Text>
                </View>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    notificationIcon:{
        zIndex: 0,
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    notificationView: {
        position: 'absolute',
        top: 2,
        right: 25,
        padding: 2,
        paddingLeft: 7,
        paddingRight: 7,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'red',
        zIndex: 2
    },
    notificationText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
    }
})

export default NotificationIcon