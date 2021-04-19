# ĐỒ ÁN FULLSTACK (UI)

___

---
+ [Wiki - GitLab](https://gitlab.com/php1301/DoAnReactJS/-/wikis/Project-Wiki-about)
+ [Project Overview](https://www.youtube.com/watch?v=__gm2ttLUiI)
+ [About](https://github.com/php1301/vexere-ui/blob/master/Developer/About.md)
+ [Project Structure](https://github.com/php1301/vexere-ui/blob/master/Developer/ProjectStructure.md)
+ [Tính năng nổi bật](https://github.com/php1301/vexere-ui/blob/master/Developer/SpecialFeatures.md)
+ [Log - Quá trình làm ](https://github.com/php1301/vexere-ui/tree/master/Developer/PROGRESS)
+ [Kiến thức học được](https://github.com/php1301/vexere-ui/blob/master/Developer/KNOWLEDGE)
+ [Hỗ trợ - Social Media](https://www.facebook.com/dioxittdn.phucprobb)
+ [Từ Tác Giả](https://github.com/php1301/vexere-ui/blob/master/Developer/Info.md)
---
***
## [Wiki - GitLab](https://gitlab.com/php1301/DoAnReactJS/-/wikis/Project-Wiki-about)
[Wiki - GitLab Page](https://gitlab.com/php1301/DoAnReactJS/-/wikis/Project-Wiki-about)
***
## [Project Overview](https://www.youtube.com/watch?v=__gm2ttLUiI)
[Project Overview](https://www.youtube.com/watch?v=__gm2ttLUiI)
***
## [About](https://github.com/php1301/DoAnReactJS/blob/master/Developer/About.md)

Đồ án Fullstack là... (TBA)
## [Project Structure](https://github.com/php1301/vexere-ui/blob/master/Developer/ProjectStructure.md)
### Monorepo With Yarn Workspaces:
Đây là cấu trúc tổ chức thư mục của Project (Chỉ show 1 vài file con của thư mục để ví dụ)
#### WIP

```bash
    📦FS-ui-client-next
 ┣ 📂assets                 //assets media
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📂backgrounds
 ┃ ┃ ┣ 📂banner             //Phân chia ảnh đúng mục đích
 ┃ ┃ ┃ ┣ 📜1.jpg
 ┃ ┃ ┃ ┣ 📜2.jpg
 ┃ ┃ ┃ ┗ 📜3.jpg
 ┃ ┃ ┣ 📂blog            
 ┃ ┃ ┣ 📂destinations
 ┃ ┃ ┣ 📂favicons
 ┃ ┃ ┣ 📂gallery
 ┃ ┃ ┣ 📂resources
 ┃ ┃ ┣ 📂shapes
 ┃ ┃ ┣ 📂team
 ┃ ┃ ┣ 📂testimonials        
 ┃ ┃ ┣ 📂tour
 ┃ ┃ ┣ 📜404.png             
 ┃ ┃ ┣ 📜404@2x.png         // Ví dụ về place file media
 ┃ ┗ 📂style
 ┃ ┃ ┗ 📜Global.style.jsx   // File global css
 ┣ 📂components             
 ┃ ┣ 📂Map
 ┃ ┃ ┗ 📜hotelMapMarker.png // Có thể để ảnh vô component
 ┃ ┣ 📂Navbar             // Ví dụ về 1 component thành phần chính là Navbar - sử dụng styled component
 ┃ ┃ ┣ 📜Navbar.jsx
 ┃ ┃ ┗ 📜Navbar.style.jsx
 ┃ ┗ 📂UI                 // Folder UI đặc biệt quan trọng sử dụng cho UI - libs, snippet, chưa nặng tính logic và custom
 ┃ ┃ ┣ 📂Antd             // Tổ chức import/export Antd 
 ┃ ┃ ┃ ┣ 📂Avatar
 ┃ ┃ ┃ ┣ 📂Button
 ┃ ┃ ┃ ┣ 📂Drawer
 ┃ ┃ ┃ ┣ 📂Icon
 ┃ ┃ ┃ ┣ 📂Input
 ┃ ┃ ┃ ┣ 📂Layout
 ┃ ┃ ┃ ┗ 📂Menu
 ┃ ┃ ┣ 📂Container
 ┃ ┃ ┣ 📂DatePicker
 ┃ ┃ ┣ 📂GlideCarousel
 ┃ ┃ ┣ 📂Heading
 ┃ ┃ ┣ 📂InputIncDec
 ┃ ┃ ┣ 📂Logo
 ┃ ┃ ┣ 📂Portal
 ┃ ┃ ┣ 📂Text
 ┃ ┃ ┣ 📂ViewWithPopup
 ┃ ┃ ┗ 📜Base.jsx       //File base Proptypes, tất cá components UI phải kế thừa từ mục base - default
 ┣ 📂container             //Phân chia Container mục đích
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📂Location
 ┃ ┃ ┗ 📂Search
 ┃ ┣ 📂Layout
 ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┗ 📜Layout.jsx
 ┃ ┗ 📜blankPage.jsx      //Blankpage cho mocking
 ┣ 📂context              //Thực hiện gọi API bằng context
 ┣ 📂Developer            //Markdowns file của project trừ README.md
 ┃ ┣ 📂PROGRESS
 ┃ ┗ 📜About.md
 ┣ 📂library
 ┃ ┣ 📂helpers      // Các lib universal hỗ trợ
 ┃ ┗ 📂hooks        // Custom Hooks
 ┣ 📂pages
 ┃ ┣ 📂__test__     // Unit test cho pages (included built-in)
 ┃ ┃ ┗ 📜index.test.jsx
 ┃ ┣ 📂__mock__     // Unit test temp folder cho parse non-extensions included
 ┃ ┃ ┣ fileMock.js //media mock
 ┃ ┃ ┗ styleMock.js //styling mock
 ┃ ┣ 📜index.jsx
 ┃ ┣ 📜_app.jsx    
 ┃ ┗ 📜_document.jsx
 ┣ 📂public
 ┃ ┣ 📂static       // Static data
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┣ 📂flag
 ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┣ 📜404.png
 ┃ ┃ ┃ ┣ 📜404@2x.png
 ┃ ┣ 📜favicon.ico
 ┃ ┗ 📜zeit.svg
 ┣ 📂settings
 ┃ ┣ 📜config.js    // Responsive
 ┃ ┣ 📜constants.js // Cho routing
 ┃ ┗ 📜setup.js // Unit Test setup Enzyme adapter
 ┣ 📂themes
 ┃ ┗ 📜default.theme.js // Variables
 ┣ 📜.eslintrc.js   // Linter
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.js // Prettier
 ┣ 📜Docker
 ┣ 📜jest.config.js
 ┣ 📜jest.setup.js
 ┣ 📜jsConfig.json
 ┣ 📜babel.config.js //Webpack config
 ┣ 📜mock
 ┣ 📜next.config.js  // Config cho next dùng css
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜yarn.lock
```
***
ĐỒ ÁN FULLSTACK - ... (TBA)
***
## [Tính năng nổi bật](https://github.com/php1301/vexere-ui/blob/master/Developer/SpecialFeatures.md)
+ ReactJS with SSR using NEXTJS
+ Responsive bắt mắt
+ Styled-Components
+ Thiết kế Medium-Styles
+ Validation
+ Có demo test bằng Jest/Enzyme và react/tesing
+ Context API
+ Sử dụng API nhà làm - tự thiết kế backend
+ Tích hợp Social Login + SSO dễ dàng đăng nhập
+ Update thường xuyên
+ SEO with SSR
+ AMP support (Accelerated Mobile Pages)
+ Strict với Folder Structure, Linter
***
## [Log - Quá trình làm ](https://github.com/php1301/vexere-ui/tree/master/Developer/PROGRESS)
### Theo dõi quá trình làm ĐỒ ÁN FULLSTACK (UI) - ... của mình tại đây
#### Phase 1
+ [1.1](https://github.com/php1301/vexere-ui/blob/master/Developer/PROGRESS/Phase%201/Phase-1_1.md)
+ [1.2](https://github.com/php1301/DoAnReactJS/blob/master/Developer/PROGRESS/Phase%201/Phase-1_2.md)
+ [1.3](https://github.com/php1301/DoAnReactJS/blob/master/Developer/PROGRESS/Phase%201/Phase-1_3.md)
#### Phase 2
+ [2.1](https://github.com/php1301/vexere-ui/blob/master/Developer/PROGRESS/Phase%202/Phase-2_1.md)
+ [2.2](https://github.com/php1301/DoAnReactJS/blob/master/Developer/PROGRESS/Phase%202/Phase-2_2.md)
+ [2.3](https://github.com/php1301/DoAnReactJS/blob/master/Developer/PROGRESS/Phase%202/Phase-2_3.md)
#### Phase 3
+ [3.1](https://github.com/php1301/DoAnReactJS/blob/master/Developer/PROGRESS/Phase%203/Phase-3_1.md)
+ [3.2](https://github.com/php1301/DoAnReactJS/blob/master/Developer/PROGRESS/Phase%203/Phase-3_2.md)
## [Kiến thức học được](https://github.com/php1301/vexere-ui/blob/master/Developer/KNOWLEDGE)
+ [Chapter 1](https://github.com/php1301/vexere-ui/blob/master/Developer/KNOWLEDGE/Knowledge_1.md)
+ [Chapter 2](https://github.com/php1301/vexere-ui/blob/master/Developer/KNOWLEDGE/Knowledge_2.md)
+ [Chapter 3](https://github.com/php1301/vexere-ui/blob/master/Developer/KNOWLEDGE/Knowledge_3.md)
## [Hỗ trợ - Social Media](https://www.facebook.com/dioxittdn.phucprobb)
+ [Facebook](https://www.facebook.com/dioxittdn.phucprobb)
+ [Gmail - UIT](19520854@gm.uit.edu.vn)
+ [Slack](https://join.slack.com/t/reactjsgroupe/shared_invite/enQtNzk4MzkxMjc2MDIyLWIzZTNlNzVlZmM4YjExYWYyMzhkMmZlYzg2YjJhNWRiMzQ5YmE5ZDMyNmYyNzVlN2VhYTNhYWEwNDhlODA4MWM)
***
## [Từ tác giả](https://github.com/php1301/vexere-ui/blob/master/Developer/Info.md)
Vì là dự án solo làm từ đầu đến cuối và nhiều assignments vào giai đoạn làm và cả đi quốc phòng nên khá là mệt nhưng cũng rất tâm huyết cho nó vì nhất định mình phải chạm tới được thứ mình nhắm tới
***
Everything will be fulfilled
