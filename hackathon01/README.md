# 109-1WebProg-Hackathon01-boilerPlate
Boiler plate for first in-class hackathon.
This is a personal calendar. You can add events onto it with desired color. You can also choose or make your own color theme of the whole calendar.


## Get started
1. Press and enter "New Repository" page.
2. On the top of the Page, choose "Import a repository"
![](https://i.imgur.com/FoQNwZp.png)
3. Set the link in the top to
```
https://github.com/VivianChan1998/109-1WebProg-Hackathon01-boilerPlate
```
4. Set the project's name as
```
109-1-Web-Hackathon01
```
5. Set the project to **Private**

> The settings should be like this:
![](https://i.imgur.com/MocaAqS.png)

6. Go to "Settings" > "Manage access" > "Invite collaborators"
![](https://i.imgur.com/ykYzuwP.png)

7. Add `ntuee-webprogramming` as a collaborator
![](https://i.imgur.com/Q3SQVMX.png)

> This step is REALLY IMPORTANT. It is the only way we can grade your work

8. Clone your own repository to a local folder, and, happy hacking! :)


## Demo video

[Link to Youtube](http://www.youtube.com/watch?v=0iNcW_kkF3I)

## Checkpoints
0. **Important Warnings: DO NOT change the class names, id names, and variable names that are already defined.**
1. Make the calendar into 4 weeks. (10%)
2. Change the color of a cell to black(`#000000`) when they are hovered. (20%)
3. Change the color of a cell to `rgba(0, 0, 0, 0.103)` after they are clicked. (30%)
4. When the user types something and clicks the "Add to calendar" button, store the text content in the cell that is currently selected. (35%)
5. Add text to cell when the key "Enter" is pressed. (5%)

## Bonus
1. Store the text WITH the color selected by the user. 
2. Implement your own theme. 
> Hint: The key words are CSS variables. 
> Note that the grading process is based on the black theme, so please DON'T change the default theme.

## Testing
- 如要測試，請先 [安裝 node.js](https://nodejs.org/en/download/) 以及 npm (裝 node.js 的時候應該就會自動安裝 npm 了)
- 如果無法安裝 node.js, 就請手動測試吧！成功安裝者，請進行以下步驟。

    1. In your repo folder, install dependencies with the command "npm install"
    ```
    $ npm install
    ```
    2. Enter "npm run test" to test your code.
    ```
    $ npm run test
    ```
    3. It takes few minutes to run the tests, and the results will be displayed in the terminal afterwards.
