## [Project Structure](https://github.com/php1301/vexere-ui/blob/master/Developer/Project-structure.md)
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
 ┃ ┗ 📜constants.js // Cho routing
 ┣ 📂themes
 ┃ ┗ 📜default.theme.js // Variables
 ┣ 📜.eslintrc.js   // Linter
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.js // Prettier
 ┣ 📜babel.config.js //Webpack config
 ┣ 📜mock
 ┣ 📜next.config.js  // Config cho next dùng css
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜yarn.lock
```
