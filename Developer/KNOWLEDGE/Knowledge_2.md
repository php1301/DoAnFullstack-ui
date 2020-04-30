# Chapter 2
Things I learned In this project
***
## :green_book: 6. NextJS workflow
### :exclamation: Information
#### :star2: Usage
Luồng đi của NextJS
NextJS có 3 files cơ bản rất quan trọng cho việc Routing và SSR: _app.js, _document.js, index.js (/)
Luồng đi:
_document.js->_app.js->index.js(/) / pages
+ _document.js: Chuyên để add các link cho Header như link font, CDN style, như bootstrap
+ _app.js: NextJS sử dụng _app.js để bắt đầu tiền xử lý page như 
  + áp dụng Global Style
  + Validation isLogin, 
  + Global state management
  + Giữ 1 layout hay component gì đó persistent(xuyên suốt)
  + ...
+ index.js(/) và các pages khác: Đây là nơi render nội dung
#### :star2: Type
Codebase - Advanced Override
#### :star2: Prerequisite
```
Tất cả các files trên phải được bỏ trong folder pages(VD: pages/_app.js)
```
#### :star2: Setup
+ [_document.js Setup](https://nextjs.org/docs/advanced-features/custom-document)
+ [_app.js Setup](https://nextjs.org/docs/advanced-features/custom-app)
#### :star2: Rating
:no_mouth: :open_mouth:	:hushed: :frowning:
#### :pushpin: Noted
Phải linh hoạt trong việc custom _document và _app, tùy từng loại style như tailwind hay styled-components của repo này mà cách config sẽ khác nhau, có thể vô tận source NextJS trên git để coi demo từng loại
***
## :green_book: 7. Get Device Type
### :exclamation: Information
#### :star2: Usage
Làm cho việc responsive trở nên dễ hơn với global setting dựa vào element cố định mà package này cung cấp sẵn
#### :star2: Type
Helpers - Responsive
#### :star2: Prerequisite
```
yarn add mobile-detect
```
#### :star2: Setup
+ [Get Device Type Setup](https://github.com/php1301/vexere-ui/blob/master/library/helpers/get_device_type.jsx)
#### :star2: Rating
:no_mouth: :open_mouth:
#### :pushpin: Noted
Hiểu rõ về SSR, tránh side-effects của người dùng, behaviour lạ, không được lạm dụng ở nhiều nơi, khuyến nghị chỉ sử dụng ở rendered page
+ Đọc thêm tại: https://www.npmjs.com/package/mobile-detect
***
***
## :green_book: 8. Global Responsive
### :exclamation: Information
#### :star2: Usage
Kĩ thuật làm responsive global đặc biệt hữu dụng cho thiết kế grid và flexbox
#### :star2: Type
Codebase - Styling - Responsive setup
#### :star2: Prerequisite
```
Am hiểu về Flexbox: Tỉ lệ flex-start, flex-end
Am hiểu về grid: Grid fraction
Hiểu cách sử dụng Get Device Type
```
#### :star2: Setup
+ [Khai báo column-start/end/Limit số lượng items](https://github.com/php1301/vexere-ui/blob/master/settings/config.js)
+ [Example setup ở index.js tránh quá lạm dụng vì đặc thù SSR và các pages phụ thuộc vào Get Device Type](https://github.com/php1301/vexere-ui/blob/master/pages/index.jsx)
#### :star2: Rating
:no_mouth: :open_mouth:	:hushed:
#### :pushpin: Noted
Setup global responsive rất quan trọng giúp cho layout thống nhất, dễ maintain hơn (cảm giác như xài lib chỉ việc thay số 1 2 3,...), nghiên cứu kĩ project để hiểu rõ thêm các advanced usage
***
