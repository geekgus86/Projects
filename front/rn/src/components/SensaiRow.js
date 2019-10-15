import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from "../styles/theme"

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: colors.silver
    },
})
export class SensaiRow extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        const sizes = this.props.sizes
        let margin = {}
        if (this.props.margin) {
            margin = {
                marginTop: 16,
                marginBottom: 16,
            }
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.row, margin, this.props.customStyle]}>
                    {React.Children.map(this.props.children, (child, i) => {
                        let size = 1;
                        if (sizes !== undefined) {
                            size = sizes[i] || 1;
                        }
                        return (
                            <View style={{ flex: size }}>
                                {child}
                            </View>
                        );
                    })}
                </View>
                {(this.props.divider) ? <View style={styles.divider} /> : null}
            </View>
        )
    }
}