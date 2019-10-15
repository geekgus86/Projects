import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { colors, theme } from '../styles/theme';
import { subscribeTo, unsubscribe } from '../lib/Socket';
import { upperCase } from '../helpers'
import I18n from '../i18n/i18n'

const styles = StyleSheet.create({
    textMachine: {
        color: colors.white,
        fontWeight: "600",
        marginLeft: 10
    },
    textWorking: {
        color: colors.white
    },
    row: {
        flexDirection: "row"
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        top: 5
    },
    redCircle: {
        backgroundColor: colors.tomato
    },
    greenCircle: {
        backgroundColor: colors.green
    }
});

export default class RunningMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            machine: 'Schuler'
        }
        this.onHitReceived = this.onHitReceived.bind(this);
        subscribeTo("andon", this.onHitReceived)
    }

    async componentWillMount() {
        let localMachine = JSON.parse(await AsyncStorage.getItem('machine'));
        this.setState({machine: localMachine.label})

    }

    async onHitReceived(data) {
        this.setState({ running: data.CurrentStrokeRate != 0 ? true : false} );
    }

    componentWillUnmount() {
        unsubscribe("andon");
    }

    render() {
        return (
            <View style={{ top: 10 }}>
                <Text style={styles.textMachine}>{this.state.machine}</Text>
                <View style={styles.row}>
                    <View style={[styles.circle, this.state.running ? styles.greenCircle : styles.redCircle]}><Text></Text></View>
                    <View><Text style={styles.textWorking}> {this.state.running ? upperCase(I18n.t('machine_okStatus')) : upperCase(I18n.t('machine_failureStatus'))}</Text></View>
                </View>
            </View>
        );
    }
}