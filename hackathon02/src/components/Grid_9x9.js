import React, { Component } from 'react';
import Grid_1x1 from './../components/Grid_1x1';

class Grid_9x9 extends Component {
    constructor(props) {
        super(props);
    }
    
    checkConflicted = (conflicts, row_index, col_index) => {
        return conflicts.find(c => c.row_index === row_index + 0 && c.col_index === col_index + 0) !== undefined;
    }

    render() {
        let gridStyle = {
            borderLeft: this.props.col_offset === 0 ? "" : "4px solid #666",
            borderRight: this.props.col_offset === 6 ? "" : "4px solid #666",
            borderTop: this.props.row_offset === 0 ? "" : "4px solid #666",
            borderBottom: this.props.row_offset === 6 ? "" : "4px solid #666",
            backgroundColor: "#999"
        };

        return (
            <div className="grid_9x9" style={gridStyle}>
                <div className="row">
                    <Grid_1x1
                        value={this.props.value[0]}
                        fixed={this.props.fixedValue[0] !== "0"}
                        row_index={this.props.row_offset + 0}
                        col_index={this.props.col_offset + 0}
                        handle_grid_1x1_click={this.props.handle_grid_1x1_click}
                        selectedGrid={this.props.selectedGrid}
                        conflicted={this.checkConflicted(this.props.conflicts, this.props.row_offset + 0, this.props.col_offset + 0)} />

                    <Grid_1x1
                        value={this.props.value[1]}
                        fixed={this.props.fixedValue[1] !== "0"}
                        row_index={this.props.row_offset + 0}
                        col_index={this.props.col_offset + 1}
                        handle_grid_1x1_click={this.props.handle_grid_1x1_click}
                        selectedGrid={this.props.selectedGrid}
                        conflicted={this.checkConflicted(this.props.conflicts, this.props.row_offset + 0, this.props.col_offset + 1)} />

                    <Grid_1x1
                        value={this.props.value[2]}
                        fixed={this.props.fixedValue[2] !== "0"}
                        row_index={this.props.row_offset + 0}
                        col_index={this.props.col_offset + 2}
                        handle_grid_1x1_click={this.props.handle_grid_1x1_click}
                        selectedGrid={this.props.selectedGrid}
                        conflicted={this.checkConflicted(this.props.conflicts, this.props.row_offset + 0, this.props.col_offset + 2)} />
                </div>
                <div className="row">
                    <Grid_1x1
                        value={this.props.value[3]}
                        fixed={this.props.fixedValue[3] !== "0"}
                        row_index={this.props.row_offset + 1}
                        col_index={this.props.col_offset + 0}
                        handle_grid_1x1_click={this.props.handle_grid_1x1_click}
                        selectedGrid={this.props.selectedGrid}
                        conflicted={this.checkConflicted(this.props.conflicts, this.props.row_offset + 1, this.props.col_offset + 0)} />

                    <Grid_1x1
                        value={this.props.value[4]}
                        fixed={this.props.fixedValue[4] !== "0"}
                        row_index={this.props.row_offset + 1}
                        col_index={this.props.col_offset + 1}
                        handle_grid_1x1_click={this.props.handle_grid_1x1_click}
                        selectedGrid={this.props.selectedGrid}
                        conflicted={this.checkConflicted(this.props.conflicts, this.props.row_offset + 1, this.props.col_offset + 1)} />

                    <Grid_1x1
                        value={this.props.value[5]}
                        fixed={this.props.fixedValue[5] !== "0"}
                        row_index={this.props.row_offset + 1}
                        col_index={this.props.col_offset + 2}
                        handle_grid_1x1_click={this.props.handle_grid_1x1_click}
                        selectedGrid={this.props.selectedGrid}
                        conflicted={this.checkConflicted(this.props.conflicts, this.props.row_offset + 1, this.props.col_offset + 2)} />
                </div>
                <div className="row">
                    <Grid_1x1
                        value={this.props.value[6]}
                        fixed={this.props.fixedValue[6] !== "0"}
                        row_index={this.props.row_offset + 2}
                        col_index={this.props.col_offset + 0}
                        handle_grid_1x1_click={this.props.handle_grid_1x1_click}
                        selectedGrid={this.props.selectedGrid}
                        conflicted={this.checkConflicted(this.props.conflicts, this.props.row_offset + 2, this.props.col_offset + 0)} />

                    <Grid_1x1
                        value={this.props.value[7]}
                        fixed={this.props.fixedValue[7] !== "0"}
                        row_index={this.props.row_offset + 2}
                        col_index={this.props.col_offset + 1}
                        handle_grid_1x1_click={this.props.handle_grid_1x1_click}
                        selectedGrid={this.props.selectedGrid}
                        conflicted={this.checkConflicted(this.props.conflicts, this.props.row_offset + 2, this.props.col_offset + 1)} />

                    <Grid_1x1
                        value={this.props.value[8]}
                        fixed={this.props.fixedValue[8] !== "0"}
                        row_index={this.props.row_offset + 2}
                        col_index={this.props.col_offset + 2}
                        handle_grid_1x1_click={this.props.handle_grid_1x1_click}
                        selectedGrid={this.props.selectedGrid}
                        conflicted={this.checkConflicted(this.props.conflicts, this.props.row_offset + 2, this.props.col_offset + 2)} />
                </div>
            </div>
        );
    }
}

export default Grid_9x9;