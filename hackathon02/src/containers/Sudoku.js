import React, { Component } from 'react';
import ReactLoading from "react-loading";
import { Fireworks } from 'fireworks/lib/react'

import "./Sudoku.css"
import Header from '../components/Header';
import Grid_9x9 from '../components/Grid_9x9';
import ScreenInputKeyBoard from '../components/ScreenInputKeyBoard'
import { problemList } from "../problems"

class Sudoku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, // Return loading effect if this is true.
            problem: null, // Stores problem data. See "../problems/" for more information.This is the origin problem and should not be modified. This is used to distinguish the fixed numbers from the editable values
            gridValues: null,  // A 2D array storing the current values on the gameboard. You should update this when updating the game board values.
            selectedGrid: { row_index: -1, col_index: -1 }, // This objecct store the current selected grid position. Update this when a new grid is selected.
            gameBoardBorderStyle: "8px solid #000", // This stores the gameBoarderStyle and is passed to the gameboard div. Update this to have a error effect (Bonus #2).
            completeFlag: false, // Set this flag to true when you wnat to set off the firework effect.
            conflicts: [{ row_index: -1, col_index: -1 }] // The array stores all the conflicts positions triggered at this moment. Update the array whenever you needed.
        }
    }

    handle_grid_1x1_click = (row_index, col_index) => {
        // TODO

        // Useful hints:
        // console.log(this.state.problem['content'])
        // console.log(row_index, col_index)
        // console.log(this.state.selectedGrid)
        // console.log(this.state.gridValues[row_index][col_index])
        // console.log(this.problem);
        if (this.state.problem.content[row_index][col_index] === '0') {
            this.setState({selectedGrid: { row_index: row_index, col_index: col_index }});
        }
        else {
            this.setState({selectedGrid: { row_index: -1, col_index: -1 }});
        }
    }

    handleKeyDownEvent = (event) => {
        // TODO
        let value = '';
        // console.log(this.state.gridValues);

        // Useful hints:
        // console.log(this.state);
        if (this.state.selectedGrid.row_index === -1 || this.state.selectedGrid.col_index === -1) return;
        if (this.state.gridValues !== null && this.state.selectedGrid.row_index !== -1 && this.state.selectedGrid.col_index !== -1) {
            if (event.keyCode >= 48 && event.keyCode <= 57) value = event.keyCode - 48;
            else if (event.keyCode >= 96 && event.keyCode <= 105) value = event.keyCode - 96;
        }
        // console.log(this.state.problem.content)
        if (value !== '') {
            if (this.state.problem.content[this.state.selectedGrid.row_index][this.state.selectedGrid.col_index] === "0" && this.checkValid(value.toString())) {
                this.setState({
                    gridValues : this.state.gridValues.map((arr, i) =>
                        arr.map((item,j) =>{
                            if (i === this.state.selectedGrid.row_index && j === this.state.selectedGrid.col_index) {
                                if (value === 0) return ''
                                else return value.toString()
                            }
                            else return item;
                        })
                    )
                });
            }
        }
        this.checkCompleted();
    }

    handleScreenKeyboardInput = (num) => {
        // TODO
        // console.log(num);
        if (this.state.selectedGrid.row_index === -1 || this.state.selectedGrid.col_index === -1) return;
        if (this.state.problem.content[this.state.selectedGrid.row_index][this.state.selectedGrid.col_index] === "0" && this.checkValid(num.toString())) {
            // console.log(this.state.conflicts)
            this.setState({
                gridValues : this.state.gridValues.map((arr, i) =>
                    arr.map((item,j) =>{
                        if (i === this.state.selectedGrid.row_index && j === this.state.selectedGrid.col_index) {
                            if (num === 0) return ''
                            else return num
                        }
                        else return item;
                    })
                )
            });
        }
        this.checkCompleted();
    }

    checkValid = (num) => {
        // console.log(this.state.conflicts)
        // console.log(this.state.gridValues)
        if (num === "0") {
            this.setState({
                conflicts: [{row_index: -1, col_index: -1}]
            });
            return true;
        }
        // console.log(this.state.conflicts)
        let conflicts = [];
        let val, blockX, blockY;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                val = this.state.gridValues[i][j];
                blockX = Math.floor((this.state.selectedGrid.row_index)/3);
                blockY = Math.floor((this.state.selectedGrid.col_index)/3);
                if (i === this.state.selectedGrid.row_index && val === num) conflicts.push({row_index: i, col_index: j})
                else if (j === this.state.selectedGrid.col_index && val === num) conflicts.push({row_index: i, col_index: j})
                else if (Math.floor(i/3) === blockX && Math.floor(j/3) === blockY && val === num) conflicts.push({row_index: i, col_index: j})
            }
        }
        // console.log(conflicts);
        if (conflicts.length === 0) {
            this.setState({
                conflicts: [{row_index: -1, col_index: -1}]
            });
            return true;
        }
        else {
            this.setState({
                conflicts: conflicts,
                gameBoardBorderStyle: "8px solid #E77"
            });
            setTimeout(function(){
                this.setState({ gameBoardBorderStyle: "8px solid #333" });
           }.bind(this),1000);
            return false;
        }
    }

    checkCompleted = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.state.gridValues[i][j] === "" || this.state.gridValues[i][j] === "0") {
                    return false
                }
            }
        }
        this.setState({ completeFlag: true });
        setTimeout(function(){
            this.setState({ completeFlag: false }); 
       }.bind(this),2500);
    }

    componentDidMount = () => {
        window.addEventListener('keydown', this.handleKeyDownEvent);
    }

    loadProblem = async (name) => {
        this.setState({
            loading: true,
            problem: null,
            gridValues: null,
            selectedGrid: { row_index: -1, col_index: -1 }
        });

        const problem = await require(`../problems/${name}`)
        if (problem.content !== undefined) {
            let gridValues = [];
            for (let i = 0; i < problem.content.length; i++)
                gridValues[i] = problem.content[i].slice();
            this.setState({ problem: problem, gridValues: gridValues, loading: false });
        }
    }

    extractArray(array, col_index, row_index) {
        let rt = []
        for (let i = row_index; i < row_index + 3; i++) {
            for (let j = col_index; j < col_index + 3; j++) {
                rt.push(array[i][j])
            }
        }
        return rt;
    }

    render() {
        const fxProps = {
            count: 3,
            interval: 700,
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight,
            colors: ['#cc3333', '#81C784'],
            calc: (props, i) => ({
                ...props,
                x: (i + 1) * (window.innerWidth / 3) * Math.random(),
                y: window.innerHeight * Math.random()
            })
        }
        return (
            <>
                <Header problemList={problemList} loadProblem={this.loadProblem} gridValues={this.state.gridValues} problem={this.state.problem} />
                {this.state.loading ? (<ReactLoading type={"bars"} color={"#777"} height={"40vh"} width={"40vh"} />) : (
                    <div id="game-board" className="gameBoard" style={{ border: this.state.gameBoardBorderStyle }}>
                        <div className="row">
                            <Grid_9x9 row_offset={0} col_offset={0}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 0, 0)}
                                fixedValue={this.extractArray(this.state.problem.content, 0, 0)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={0} col_offset={3}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 3, 0)}
                                fixedValue={this.extractArray(this.state.problem.content, 3, 0)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={0} col_offset={6}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 6, 0)}
                                fixedValue={this.extractArray(this.state.problem.content, 6, 0)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />
                        </div>
                        <div className="row">
                            <Grid_9x9 row_offset={3} col_offset={0}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 0, 3)}
                                fixedValue={this.extractArray(this.state.problem.content, 0, 3)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={3} col_offset={3}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 3, 3)}
                                fixedValue={this.extractArray(this.state.problem.content, 3, 3)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={3} col_offset={6}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 6, 3)}
                                fixedValue={this.extractArray(this.state.problem.content, 6, 3)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />
                        </div>
                        <div className="row">
                            <Grid_9x9 row_offset={6} col_offset={0}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 0, 6)}
                                fixedValue={this.extractArray(this.state.problem.content, 0, 6)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={6} col_offset={3}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 3, 6)}
                                fixedValue={this.extractArray(this.state.problem.content, 3, 6)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={6} col_offset={6}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 6, 6)}
                                fixedValue={this.extractArray(this.state.problem.content, 6, 6)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />
                        </div>
                    </div>
                )}
                {this.state.completeFlag ? (<Fireworks {...fxProps} />) : null}
                {this.state.loading ? null : (<ScreenInputKeyBoard handleScreenKeyboardInput={this.handleScreenKeyboardInput} />)}
            </>
        );
    }
}

export default Sudoku;