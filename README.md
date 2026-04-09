
```
CMake_student_management
├─ frontend                前端项目
│  ├─ eslint.config.js     
│  ├─ index.html 
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public               图片资源
│  │  ├─ bg.png
│  │  ├─ close.png
│  │  ├─ fz-kuangcao.ttf
│  │  ├─ icon.png
│  │  ├─ luna.png
│  │  ├─ nns.png
│  │  ├─ returnArrow.png
│  │  ├─ 企鹅.png
│  │  └─ 杭电icon.png
│  ├─ README.md 
│  ├─ src                 前端主要源码
│  │  ├─ App.css
│  │  ├─ App.tsx
│  │  ├─ components        组件
│  │  │  ├─ inupt.tsx
│  │  │  ├─ search.tsx
│  │  │  ├─ table.css
│  │  │  ├─ table.tsx
│  │  │  └─ textarea.tsx
│  │  ├─ hooks             功能函数
│  │  │  ├─ readNote.js
│  │  │  ├─ selfNote.js
│  │  │  ├─ State.tsx
│  │  │  └─ writeNotes.js
│  │  ├─ index.css
│  │  ├─ interface.tsx     定义数据类型
│  │  ├─ main.tsx
│  │  └─ pages             主要界面实现
│  │     ├─ createTest.tsx
│  │     ├─ DeleteModal.tsx
│  │     ├─ home.tsx
│  │     ├─ login.tsx
│  │     ├─ showTest.tsx
│  │     └─ styles          主要界面样式 
│  │        ├─ chageText.css
│  │        ├─ del.css
│  │        ├─ home.css
│  │        ├─ login.css
│  │        ├─ searchResult.css
│  │        └─ showTest.css
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
├─ CMakeLists.txt          cmake项目配置文件
├─ CMakePresets.json
├─ login.json
├─ main.cpp                 后端源码
├─ main.h                   后端头文件
└─ out
   └─build
     └─ x64-debug   
        ├─test.json         考试信息储存文件
        └─login.json        登录信息储存文件

```