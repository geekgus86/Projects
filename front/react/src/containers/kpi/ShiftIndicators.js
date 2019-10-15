import React, { PureComponent } from "react";
import ShiftTable from "./ShiftTable/ShiftTable";
import ShiftRow from "./ShiftTable/ShiftRow";

class ShiftIndicators extends PureComponent {
    render() {
        const { data } = this.props;
        let content = null;
        if (data !== null) {
            content = (
                <ShiftTable>
                    {data.map((shift, i) => {
                        let  coMin = (shift.avgCo) ? shift.avgCo.toFixed(2) : (shift.avgCo || 0);
                        return (
                            <ShiftRow label={shift.title} oa={shift.oapr} gspm={shift.gspm.toFixed(2)} changeover={coMin} strokes={shift.strokes} />
                        )
                    })}
                </ShiftTable>
            );
        }
        return content
    }
}
export default ShiftIndicators;