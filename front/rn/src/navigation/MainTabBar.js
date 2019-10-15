import React, { PureComponent } from 'react'
import { Keyboard } from 'react-native'
import { TabBarBottom } from 'react-navigation'

export default class MainTabBar extends PureComponent {
    state = {
        isVisible: true
    }

    constructor(props) {
        super(props)
        this.keyboardWillShow = this.keyboardWillShow.bind(this)
        this.keyboardWillHide = this.keyboardWillHide.bind(this)
    }

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
    }

    keyboardWillShow = event => {
        this.setState({ isVisible: false })
    }

    keyboardWillHide = event => {
        this.setState({ isVisible: true })
    }

    render() {
        return this.state.isVisible ?
        <TabBarBottom {...this.props} />
        :
        null
    }
}