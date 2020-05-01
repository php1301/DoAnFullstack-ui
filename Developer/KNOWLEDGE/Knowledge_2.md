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
## :green_book: 9. Override Styling Library
### :exclamation: Information
#### :star2: Usage
Override các styling library để custom khá quan trọng, về cả mặt UI lẫn UX, ở đây sẽ tập trung nói về UI của Antd
#### :star2: Type
Library - Styling
#### :star2: Prerequisite
```
Tích hợp các library styling như Material-UI, BS4, Antd
```
#### :star2: Setup
+ [Antd setup global sử dụng babel-plugin-import giảm bundle size](https://github.com/php1301/vexere-ui/blob/master/babel.config.js)
+ [Antd setup global, path setup như docs NextJS trong next.config.js ](https://github.com/php1301/vexere-ui/blob/master/pages/index.jsx)
+ [Antd override antd cấp global](https://github.com/php1301/vexere-ui/blob/master/assets/style/Global.style.jsx)
+ Việc import như trên giúp override được những gì ta muốn, 1 level global với cái hash khác nhau(nếu bạn override tiếp ở component-level), thanks to styled
+ Nên thực hiện việc import Antd components như thế này để tiện cho việc sử dụng và style theo ý thích component-level, phù hợp cho việc clone 1 antd-design mà bạn thích
+ ![Imgur](https://i.imgur.com/pOjHaWX.png)
#### :star2: Rating
:no_mouth: :open_mouth:	:hushed:
#### :pushpin: Noted
Sử dụng styling library giúp tăng tốc độ code đáng kể nhưng quan trọng nhất là mình biết cách làm chủ nó chứ không quá máy móc phụ thuộc nó
***
## :green_book: 10. Absolute Import
### :exclamation: Information
#### :star2: Usage
Việc sử dụng absolute import giúp giải quyết các vấn đề static path rất hiệu quả cho SEO, gọn gàng, dễ maintain đặc biệt trong các dự án scale lớn
#### :star2: Type
Codebase - Config - Alias - linter
#### :star2: Prerequisite
```
yarn add -D eslint-plugin-import

```
#### :star2: Setup
Config chuẩn alias phải thỏa mãn 3 yếu tố:
+ Webpack hiểu (ở đây tận dụng webpack plugin của next.config.js)
+ [Webpack - Mình đã commented trong file khúc nào là khúc cho alias](https://github.com/php1301/vexere-ui/blob/master/next.config.js)
+ ESLint không báo lỗi (.eslintrc.js)
+ [ESLint - Mình đã commented trong file khúc nào là khúc cho alias ](https://github.com/php1301/vexere-ui/blob/master/.eslintrc.js)
+ VSCode gợi ý được(.jsConfig.js) ở đây demo mẫu cho alias component
+ [VSCode gợi ý dược - demo cho alias component](https://github.com/php1301/vexere-ui/blob/master/next.config.js)
+ Demo absolute path cho 1 directory - component
![Imgur](https://i.imgur.com/ksNgEoO.png?1)
#### :star2: Rating
:no_mouth: :open_mouth:	:hushed:
#### :pushpin: Noted
Với SSR thì Absolute Path đặc biệt hữu ích cho SEO, với NextJS support hết mình cho việc này thì chúng ta nên tận dụng điều trên
