import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

class RowTable extends Comment{
    state = {
        checkedA: true,
        // checkedB: true,
        // checkedF: true,
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    }

    render() {
        return(
            <div>
                <Checkbox
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedA')}
                value="checkedA"
                />
                {/* <Checkbox
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedB')}
                value="checkedB"
                />
                <Checkbox
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedC')}
                value="checkedC"
                /> */}
                <Checkbox defaultChecked color="default" value="checkedG" />
            </div>    
        )
    }
}

export default RowTable;