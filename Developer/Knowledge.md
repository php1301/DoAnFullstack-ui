# Knowledge
Things I learned In this project
***
## :green_book: 1. ESLint
### :exclamation: Information
#### :star2: Usage
ESLint là một công cụ để xác định và báo cáo về các bugs được tìm thấy trong mã ECMAScript / JavaScript, với mục tiêu là strict code style rules, nhằm hạn chế bugs, looks prettier
#### :star2: Type
Codebase - Linter
#### :star2: Prerequisite
```
npm i -D eslint eslint-config-airbnb-base eslint-plugin-import
Create .eslintrc.js: module.exports = { "extends": "airbnb-base" };
In VS Code, Ctrl + Shift + X
Search ESLint
Install ESLint
Restart VS Code
```
#### :star2: Setup
+ [ESLint Setup](https://github.com/php1301/vexere-ui/blob/master/.eslintrc.js)
#### :star2: Rating
:no_mouth:	:open_mouth:
#### :pushpin: Noted
Config ở trên xài style AirBNB, các bạn có thể tham khảo trong cli những style khác, hoặc tự custom style, với sự ra mắt ES2020 thì 1 số nơi trong porject cũng nên tắt ESLint
***
## :green_book: 2. NextJS config
### :exclamation: Information
#### :star2: Usage
next.config.js là 1 file khá quan trọng của project, chủ yếu để customize với các plugin của zeit, có thể tới thời điểm bạn đọc cái này thì 1 số cái đã bị deprecated(hãy update nó). Trong project này mình config next.config.js như 1 .env để setup môi trường cho toàn project 1 cách thống nhất nhất có thể
#### :star2: Type
Codebase - Config - .env
#### :star2: Prerequisite
```
Tạo file next.config.js
```
#### :star2: Setup
+ [NextJS config Setup](https://github.com/php1301/vexere-ui/blob/master/next.config.js)
#### :star2: Rating
:no_mouth: :open_mouth:	:hushed:	
#### :pushpin: Noted
Tận dụng thiết kế project Monorepo và lợi dựng env:[] trong file này, tìm hiểu thêm các boilerplate nextJS config như thế nào trong file này
***
## :green_book: 3. Global Variables - ThemeProvider - GlobalStyle
### :exclamation: Information
#### :star2: Usage
Các global variables cho dự án, sử dụng {ThemeProvider} của styled component, Thiết kế Global Style, Các Global Style trong styled Component như này sẽ không bị hashed, có thể override về sau bằng component-level styling
#### :star2: Type
Codebase - Consts - Global Style
#### :star2: Prerequisite
```
yarn add styled-components @styled-system/theme-get
```
#### :star2: Setup
+ [Global Variables - Khai báo](https://github.com/php1301/vexere-ui/blob/master/themes/default.theme.js)
+ [createGlobalStyle](https://github.com/php1301/vexere-ui/blob/master/assets/style/Global.style.jsx)
#### :star2: Rating
:no_mouth:	:open_mouth:
#### :pushpin: Noted
Việc strict các variables, comment cẩn thận giúp cho Project là 1 thể thống nhất rất quan trọng, giúp chúng ta dễ quản lý project, bên cạnh đó thì tạo global style với styled-components bằng createGlobalStyle
***
## :green_book: 4. PropTypes
### :exclamation: Information
#### :star2: Usage
PropTypes là 1 core module của React, nó giúp cho việc manipulate props dễ dàng, strict, HOC, best usage có thể nói là validators, giúp trả về đúng data, đúng mục đích, có thể là bool, string, 1 mảng oneOf, trả về đúng string gắn vô className và render đúng element className tương umg71
#### :star2: Type
Techinique - Props - Data manipulating
#### :star2: Prerequisite
```
yarn add prop-types
```
#### :star2: Setup
+ Trong Functional Programming, ta có thể declare props bằng cách sau
![Imgur](https://i.imgur.com/PoryaLO.png)
+ Toàn bộ đều .PropTypes
+ 1 số cách sử dụng
  * Advance Inline Style
  ![Imgur](https://i.imgur.com/27zivTP.png)
  * Đổi className base on headerType
  ![Imgur](https://i.imgur.com/LbvhD9n.png?1)
  * Validate và trả đúng data
  ![Imgur](https://i.imgur.com/sDXQJel.png)
#### :star2: Rating
:no_mouth: :open_mouth:	:hushed: :frowning:
#### :pushpin: Noted
Phản quản lý props chặt chẽ, có workflow đúng, strict các conditional, trả đúng data và type, nên tận dụng tối đa propTypes cho việc trả đúng className validator bằng oneOf, xài tốt với styled-component
