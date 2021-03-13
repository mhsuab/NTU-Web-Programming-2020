# 109-1-Web-Hackathon02 - My Sudoku
A simple sudoku game made with ReactJS. [[demo video]](https://youtu.be/Y-CJbfves4Y)
![](https://i.imgur.com/nfCTHYt.png)

## Getting Started (Before class)
1. Go to [Github.com](https://github.com/)
2. Press "New Repository" to create a new repository ![](https://i.imgur.com/Qdlxgcf.png)
3. Set the project to **Private** and name it as **109-1-Web-Hackathon02**. DO NOT select a template
    ![](https://i.imgur.com/UN0RRam.png)

4. Make sure the repository is empty:
    ![](https://i.imgur.com/tDxcSDw.png)
    
5. Clone the empty repository into your computer 
    * Open your terminal, run `git clone https://github.com/<Your Username>/109-1-Web-Hackathon02.git`
    ![](https://i.imgur.com/lT6SjWv.png)
6.  Download [package.json](https://drive.google.com/file/d/1z_xm1WhudFH0uxCIm0YrRvMhSnUB8XPn/view?usp=sharing), and put it into your directory you just cloned (`109-1-Web-Hackathon02/package.json`)
7.  Install dependencies
    * Open your terminal, run `cd 109-1-Web-Hackathon02`
    * Run `npm install`
    ![](https://i.imgur.com/KM85CY9.png)
    
8. Remove the `package.json` and `package-lock.json` files

9. Go to "Settings" > "Manage access" > "Invite collaborators" 
![](https://i.imgur.com/ykYzuwP.png)



10. Add `ntuee-webprogramming` as a collaborator
![](https://i.imgur.com/Q3SQVMX.png)

> This step is REALLY IMPORTANT. It is the only way we can grade your work

## Getting Started (In Class)
11. Import code from template:
    ![](https://i.imgur.com/16fK6KB.png)
12. Import Template from `https://github.com/ntuee-webprogramming/109-1-Web-Hackathon02`

    ![](https://i.imgur.com/dmdDfOL.png)
    
13. Open terminal, run `cd 109-1-Web-Hackathon02/`
14. Run `git pull`
15. Run `npm start`
16. That's it! happy hacking! 😃

## Files Structure of the project
* The file structure is as follw:

    ![](https://i.imgur.com/bnG4QTc.png)
    
* We store the grid values in a 2D array:
    ![](https://i.imgur.com/LViqGD2.png)
    where the "0"s representing empty grids

## Requirements
1. **Implement Grid_1x1.js using either react component or react hook (50% in total)**
    * First, make sure you could **load the game correctly (30%)**
        * This File Grid_1x1.js is empty now and you will get errors if you try to load the game
        * You could decide to implement this file with either react component or react hook
        * **Hint.** Make sure you have the following code in your Grid_1x1.js if you are using **react component**:
        ```javascript=
        const gridStyle = {
            color: (this.props.selectedGrid.row_index === this.props.row_index && this.props.selectedGrid.col_index === this.props.col_index) || this.props.conflicted ? "#FFF" : this.props.fixed ? "#666" : "#6CC",
            backgroundColor: this.props.selectedGrid.row_index === this.props.row_index && this.props.selectedGrid.col_index === this.props.col_index ? "#333" : this.props.conflicted ? "#E77" : "#FFF",
        };
        return (
            <div className="grid_1x1" id={`grid-${this.props.row_index}*${this.props.col_index}`} tabindex="1" style={gridStyle} onClick={() => this.props.handle_grid_1x1_click(this.props.row_index, this.props.col_index)}>
                { this.props.value === "0" ? "" : this.props.value}
            </div>
        );
        ```
        or this if you are using **react hook**:
        ```javascript=
        const gridStyle = {
            color: (props.selectedGrid.row_index === props.row_index && props.selectedGrid.col_index === props.col_index) || props.conflicted ? "#FFF" : props.fixed ? "#666" : "#6CC",
            backgroundColor: props.selectedGrid.row_index === props.row_index && props.selectedGrid.col_index === props.col_index ? "#333" : props.conflicted ? "#E77" : "#FFF",
        };
        return (
            <div className="grid_1x1" id={`grid-${props.row_index}*${props.col_index}`} tabindex="1" style={gridStyle} onClick={() => props.handle_grid_1x1_click(props.row_index, props.col_index)}>
                { props.value === "0" ? "" : props.value}
            </div>
        );
        ```
        > Some properties given to the div are really important, make sure you don't miss any of them
        
        * To see the following figure: 
            If the Grid_1x1.js works, you should be able to load the values of the game by selecting the menu (Select test01.json to check)
        ![](https://i.imgur.com/VGzwCvg.png)
    
    * Further, You should **apply proper style on different Grid_1x1s depending on their positions (10%)**
        * The borders of each Grid_1x1 are different:
        ![](https://i.imgur.com/2BL0ehS.png)

        * **Hint.** The position is given by the **props.row_index** and **props.col_index**
        * You could refer to **Grid_9x9.js** for some information
    * Finally, **make the empty grid selectable (10%)**
        * When a grid_1x1 get clicked, its style should contain 
        ```css=
        backgroundColor: "#333", color: "#FFF"
        ```
        ![](https://i.imgur.com/eZ1d1DO.png)
        * **Hint.** You should completed the function "handle_grid_1x1_click" in Sudoku.js, which should set the state properly:
        ```json=
        selectedGrid: { row_index: -1, col_index: -1}
        ```
        
2. **Implement input functions (30% in total)**
    * Firstly, **complete the key board inupt function (20%)**
        * When user press the key (0~9), the currently selected grid should be update.
        * **Hint.** You should complete **hadleKeyDownEvent** function in Sudoku.js. (Given keyboard event, update **gridValues** in state correspondingly)
        * **Notice.** There are different keyCodes for number 0~9 (48~57 and 96~105). Make sure you handle them all.
    * Secondarily, **complete the screen keyboard input function (10%)**
        ![](https://i.imgur.com/J99Qqdp.png)
        * **Hint.** You should complete **hadleScreenKeyboardInput** function in Sudoku.js. (Given input number (0~9, Integer), update **gridValues** in state correspondingly)
3. **Check If the input is valid (20% in total)**
    * When user input a number (with keyboard or screen keyboard), you should **avoid the input if the input is not valid (20%)**

## Bonus
1. **Highlight conflicts grids (5%)**
    ![](https://i.imgur.com/aRXdJt1.png) 
    * When an invalid input is given, you should highlight the other conflicts grids
    * **Hint.** You should set the **conflicts in state properly
        
2. **Add error effect to the game board boarder (3%)**
    ![](https://i.imgur.com/8nvOT1K.png)
    * When an invalid input is given, you should make the border style of the gameboard (id="game-board") to `"8px solid #E77"` for 1 minute
    * **Hint.** You may use the following code:
        ```javascript=
        this.setState({ gameBoardBorderStyle: "8px solid #E77" });
        setTimeout(() => { this.setState({ gameBordBoarderStyle: "8px solid #333" }); }, 1000);
        ```
3. **Set off Firework effect when the user win (2%)**
    * **Hint.** You may use the following code:
        ```javascript=
        this.setState({ completeFlag: true });
        setTimeout(() => { this.setState({ completeFlag: false }); }, 2500);
        ```
## Challenge
1. **Implement the AUTOCOMPLETE function**
2. **Implement RESET GAME function**

## Running Tests
1. In your terminal, run `npm start` and make sure you are running your app using `localhost:3000`
2. Open another terminal, run `npm run test`
3. If error like `npx command not found` come out, please run`npm install -g npx` first
4. If everything goes well, you will see the following output:
    ![](https://i.imgur.com/Epj3zGZ.png)
    
## Push your code to Github
1. Run `git add .`
2. Run `git commit -m "test"`
3. Run `git push`
