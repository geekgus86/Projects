import React, { PureComponent } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { guid } from "../../lib/utils";

class Dropdown extends PureComponent {
  state = {
    selected: "",
    selectedItem: null
  }

  handleChange = event => {
    const { data, valueProp, onItemSelected } = this.props;
    const item = data.filter((d) => {
      return d[valueProp] === event.target.value;
    })[0];
    this.setState({ selected: event.target.value, selectedItem: item });
    onItemSelected && onItemSelected(this.state);
  }

  render() {
    const controlId = guid();
    const { label, data, valueProp, textProp } = this.props;
    
    return (
      <React.Fragment>
        <InputLabel htmlFor={controlId}>{label}</InputLabel>
        <Select 
          value={this.state.selected} 
          onChange={this.handleChange}
          inputProps={{
            id: controlId,
          }}>
          <MenuItem value="">None</MenuItem>
          {
            (() => {
              if (data && valueProp && textProp) {
                return data.map((d) => {
                  return <MenuItem value={d[valueProp]}>{d[textProp]}</MenuItem>;
                });
              } else {
                return null;
              }
            })()
          }
        </Select>
      </React.Fragment>
    );
  }
}

export default Dropdown;