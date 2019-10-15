import React, { Component } from 'react'
import { View } from 'react-native'
import { PdfPage } from '../../components'

class Pdf extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <PdfPage src={'http://samples.leanpub.com/thereactnativebook-sample.pdf'}/>
            </View>
        )
    }
}

export default Pdf