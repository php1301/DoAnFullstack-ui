# Knowledge
Things I learned In this project
***
## :green_book:1. ESLint
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
:no_mouth:	:hushed:
#### :sunny: Noted
Config ở trên xài style airbnb, các bạn có thể tham khảo trong cli những style khác, hoặc tự custom style, với sự ra mắt ES2020 thì 1 số nơi trong porject cũng nên tắt ESLint
***
***
## :green_book:2. NextJS config
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
+ [ESLint Setup](https://github.com/php1301/vexere-ui/blob/master/.eslintrc.js)
#### :star2: Rating
:no_mouth:	:hushed:
***
