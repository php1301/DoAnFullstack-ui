# Chapter 3
Things I learned In this project
***
## :green_book: 11. Sự thống nhất trong project
### :exclamation: Information
#### :star2: Usage
Chủ yếu mình nhắc nhở các bạn nên có sự thống nhất trong cách styling, đặt tên, import export đễ dễ quản lý, bài này sẽ nói về import
#### :star2: Type
Miscellaneuos
#### :star2: Prerequisite
```
Có được đầy đủ codebase cần thiết cho 1 page (ví dụ ở đây là index.js)
```
#### :star2: Setup
![Imgur](https://i.imgur.com/xFbgCHQ.png)
#### :star2: Rating
:no_mouth: :open_mouth:
#### :pushpin: Noted
+ Có thể quăng các media img giữa mục responsive và style
+ Nếu loại nào chỉ chứa 1 file thì không cần cách 1 dòng với loại tiếp theo/trước đó
+ Import trên 2 consts thì xuống dòng mỗi consts
Có thể mình sẽ update lại khúc trên khi cần sử dụng thêm gì đó, trước mắt là thế
***
## :green_book: 12. Unit Test NextJS
### :exclamation: Information
#### :star2: Usage
+ Testing là 1 phần không thể thiếu, tất cả cases tests rất quan trọng, trong Frontend thì testing có phần hơi khó nhằn hơn BE với nhiều scenarios cần test và mục đích chính là cho ra output phù hợp, works như expected
+ Có rất nhiều lib để test. Bài này tập trung vào Jest và Enzyme
+ Jest là Javascript testing framework (dùng cho cả BE lẫn FE)
+ Enzyme là Javascript testing utility dành riêng cho React, thích hợp cho testing output của các components
#### :star2: Type
Codebase - Testing
#### :star2: Prerequisite
```
+ yarn add -D jest enzyme enzyme-adapter-react-16 babel-jest 
+ Optional : yarn add -D enzyme-to-json jest-watch-typeahead
+ Tạo folder __test__ và __mock__ trong pages như sau

 📂__test__     // Unit test cho pages (included built-in)
 ┗ 📜index.test.jsx
 📂__mock__     // Unit test temp folder cho parse non-extensions included
 ┣ 📜fileMock.js //media mock
 ┗ 📜styleMock.js //styling mock
```
#### :star2: Setup
+ Project của chúng ta khá đặc biệt vì sử dụng absolute path - Lưu ý các contexts, comments đã ghi trong files, có thể coi đây là Advance Jest Setup
+ [Tạo jest Setup - Giúp jest biết cần chạy gì, test gì, exclude gì, include gì, parser media, styling](https://github.com/php1301/vexere-ui/blob/master/jest.config.js)
+ [Utility cho Jest](https://github.com/php1301/vexere-ui/blob/master/jest.setup.js)
+ [Tạo enzyme adapter](https://github.com/php1301/vexere-ui/blob/master/settings/setup.js)
+ [Test render trang Index](https://github.com/php1301/vexere-ui/blob/master/pages/___test___/index.test.jsx)
+ Có vài thứ cho jest trong packages.json, chủ yếu để định nghĩa root và cho jest biết phải lookup ở đâu
+ Nhớ sửa đường dẫn file cho phù hợp với trong jest.config.js
+ enzyme-to-json format snapshot cho dễ đọc
+ jest-watch-typeahead filter các matchcases lúc "jesting" (watch mode) sử dụng regex
##### Nhớ tạo mock folder với các file đã ghi ở trên
#### :star2: Rating
:no_mouth: :open_mouth:	:hushed: :frowning: :astonished:
#### :pushpin: Noted
+ Với những test cases phù hợp thì sẽ rất dễ maitain, giúp đọc hiểu nhiệm vụ của các function, component
+ Không nên tạo những test cases không cần thiết, làm cho code khó đọc khó maintain
