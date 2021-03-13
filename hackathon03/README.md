# 109-1-Web-Hackathon03

<!-- 🚀 [demo video](https://youtu.be/Y-CJbfves4Y) -->

## 考前準備
1. 前往 [Github.com](https://github.com/) 創建新的 repo
2. Repo 名稱請命名為 "**109-1-Web-Hackathon03**"，同時請設為 private
    ![](https://i.imgur.com/f9Emt0Q.png)
   
3. 把 repo clone 到電腦本地端，打開 terminal / cmd, 執行 `git clone https://github.com/<Your Username>/109-1-Web-Hackathon03.git`

4. 為避免大家在考試的當下同時 install 造成網路塞車，請先下載 [package.json](https://drive.google.com/drive/folders/13oFbEnnlNwSfE6dWigRku1sbGIA7-KTN?usp=sharing)，然後放到你剛剛 clone 的 repo 裡面

5. 打開 terminal / cmd，執行以下動作：
    * `cd 109-1-Web-Hackathon03`
    * `yarn`
    
6. 這時資料夾裡面應該會出現 node_modules 以及 yarn-lock.json，請移除 package.json 以及 yarn-lock.json

7. 到 Github 網站，找到你剛剛創建的 Repo --> Settings --> Manage access --> Invite collaborators 
![](https://i.imgur.com/mIUD76L.png)

8. 將 `ntuee-webprogramming` 加入協作者
![](https://i.imgur.com/OtAGeS7.png)

> 沒執行此步驟將會被扣 10% 的分數，請務必注意

## 考試步驟
9. 到 Github 網站，找到你剛剛創建的 Repo --> Import code from template:
    ![](https://i.imgur.com/GXI2F1p.png)

10. URL 請填入 `https://github.com/ntuee-webprogramming/109-1-Web-Hackathon03`，然後點擊 Begin Import
> 若持續出現錯誤以致無法 import，有可能是網路塞車，請稍後再試。
> 若真的還是不行，請直接下載題目的 zip 檔 (https://drive.google.com/drive/folders/13oFbEnnlNwSfE6dWigRku1sbGIA7-KTN?usp=sharing)
> 解壓縮後將所有檔案放進你的 repo 資料夾，並且確認 .gitignore 有在 repo 資料夾裡面 (如果沒有，可輸入指令：進入題目的資料夾後 `mv .gitignore ../109-1-Web-Hackathon03`)
    
11. 打開 terminal / cmd 執行 `cd 109-1-Web-Hackathon03`
12. 執行 `git pull`
13. 後端開啟請執行 `yarn server`
14. 前端請開第二個 terminal / cmd，一樣 `cd 109-1-Web-Hackathon03` 後執行 `yarn start`

## Function 說明

這個題目是做一個簡易的答題系統，題目與答案存在後端的 MongoDB，前端在開啟或是 reload 的時候會把題目透過 axios (RESTful APIs) 從後端資料庫取得。

使用者可以透過前端點選答案，並按「next」進入下一題，在全部題目作答完畢之後，後端會比對答案，並計算成績，呈現在螢幕上。

底下是示範影片：

### Demo GIF
![](https://i.imgur.com/qa8KGAD.gif)

### Frontend：
1. getContents()：呼叫後端 API 以取得問答的題目
2. choose()：按下選項後會選擇該選項
3. next()：按下 NEXT 按鈕會切換至下一題，如果是最後一題則呼叫後端 API 計算答題的分數

### Backend：
1. GetContents()：從 MongoDB 拿取題目並回傳給前端
2. CheckAns()：從 MongoDB 拿取正確答案並計算前端傳來的答案，計算完回傳分數至前端

## 測試項目
**考試時提供的題目只是供你們寫出正確的程式碼，批改測試時會換掉 MongoDB 連結，也就是說會是不同的 questions 及選項(選項個數也可能會不一樣，但答案都會是單選)，因此請記得不要將程式碼寫死**

**這次提供 class 及 hook 兩個版本的檔案，請同學自行決定要使用哪一個，分別是 Question.js 以及 Question_hook.js，預設是用 class 版本，如果要使用 hook 版本請自行到 src/App.js 改掉 import 來源**

1. 連接到 MongoDB (10%)

    * 在 server/server.js 補上可以連到 Mongo 的程式碼
    * Hackathon 時使用的 MongoDB 的連結網址如下，請將此網址放在 .env 裏頭，而不是寫死在程式裡，以免我們在實際用別的 DB(題目) 測試時造成錯誤。 **若沒有做到這一點而造成助教在批改上的困難，會扣 10% 的成績**
    `mongodb+srv://Peter:hackathon3@cluster1.clsel.gcp.mongodb.net/hackathon3?retryWrites=true&w=majority`
    
    * dboption 可用可不用，如要用請放在第二個參數

2. 從 MongoDB 拿到 questions (10%)

    * 請完成 server/routes/question.js 裡的 GetContents()，從 MongoDB 中抓出所有 questions
    * questions model 已經寫好也 import 好了 (server/models/question.js)，你不用更改，也請勿更改
    * 回傳的時候請務必遵照以下格式：
      * 順利從 MongoDB 裡面拿到資料的話，請將回傳的 statusCode 設為 200，並將 `message: 'success', contents: <data fetch from MongoDB>` 包裝成物件回傳
      * 若拿到的資料是空陣列或是發生任何錯誤，請將回傳的 statusCode 設為 403，並將 `message: 'error', contents: []` 包裝成物件回傳

3. 將 questions 呈現在前端 (30%)

    * questions 會有數題，每一個的結構如下：
    ```javascript=
      questionID: Number
      question: String
      options: [String]
    ```
    * questionID 代表題號，question 代表問題內容，options 代表該問題所包含的選項內容
    
    **實作 function 的時候請自行判斷是否要用參數以及使用 async/await**
    **沒有硬性規定 state 變數名稱要取什麼，同學們可自行改掉或沿用**
    
    (1) 請實作 src/Question.js (or src/Question_hook.js) 裡面的 getContents()
        使用 axios get 取得 questions
        API route 為 `'/getContents'`

    (2) 請在 `<div className="question-box-inner"></div>` 內填入現在呈現的是第幾號題
        舉例來說，如果總共有四題，然後現在出現的是第一題，請顯示：Question 1 of 4

    (3) 請在 `<div id="question-title"></div>` 內填入該題目的內容

    (4) 請在 `<div id="options"></div>` 加入該題目的選項  
        如果該題目有四個選項，則應該要有 4 個 `<div className="each-option"></div>`  
        每個 each-option 裡面應該要包含一個 `<input type="radio" />` 及一個 `<span></span>`  
        每個 radio input 的 id 命名須遵照以下規則：如果是第一題的第四個選項，請命名為 `q1_4`  
        請在 span 裡填入該選項的文字內容  
    * 這邊提供同學們可能會需要用到的寫法：
        ```javascript=
          <input
            type="radio"
            name=
            id=
            value=
            checked=
            onChange=
          />
        ```
        **不一定每個 attribute 都會被用到，請同學們自己斟酌要使用哪些**

4. 實作換題的功能 (10%)

    * 請實作 src/Question.js (or src/Question_hook.js) 裡的 next()，當按下 NEXT 按鈕的時候切換至下一題

5. 記錄所選答案、傳到後端並算分 (20%)
    **按下選項這個動作，可以自行決定要針對 input 按或是對parent div 按，這兩種寫法都可以接受**
    * 每次選擇選項後請記錄起來，例如選擇了第三個選項，請記錄 3 這個數字，記得不要寫成 "3" 或是 2 (index)
    * 請將全部所選答案放進一個 array，例：[1, 2, 3, 4] (如果總共四題)
    * 請稍微修改 next()，在最後一題按下 NEXT 的時候，會呼叫 axios post，並將所記錄的答案傳至後端算分
      * API route 為 `'/checkAns'`
    * 請實作 server/routes/question.js 裡的 CheckAns()，從 MongoDB 抓出對應題目的答案，Answer model 結構如下：
    ```javascript=
      questionID: Number
      answer: Number
    ```
    * questionID 代表題號，answer 代表答案是第幾個選項，**不是選項的 index**
    * 請將前端傳送的答案與正確答案比較並計算分數，假設總共四題，對了三題，則分數應該為 3
    * 回傳的時候請務必遵照以下格式：
      * 順利從 MongoDB 裡面拿到資料的話，請將回傳的 statusCode 設為 200，並將 `message: 'success', score: <correct score after calculation>` 包裝成物件回傳
      * 若拿到的資料是空陣列或是發生任何錯誤，請將回傳的 statusCode 設為 403，並將 `message: 'error', score: -1` 包裝成物件回傳

6. 答題結束後，將分數回傳至前端並顯示 (20%)

    * 請將後端回傳的分數顯示在 `<div id="question-title"></div>` 裡面，假設四題對了三題，則應該顯示：Your Score : 3 / 4 (直接蓋掉原本最後一題的題目內容)
    * 同時隱藏 `<div id="options"></div>` 以及 `<div id="actions">NEXT</div>`，隱藏方法為把它們變成 `<div></div>`
    
## Push your code to Github
1. Run `git add .`
2. Run `git commit -m "upload"`
3. Run `git push`
