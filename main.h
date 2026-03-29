// CMake_student_management.h: 标准系统包含文件的包含文件
// 或项目特定的包含文件。

#pragma once

#include <iostream>
#include <webview.h>
#include "json.hpp"

// TODO: 在此处引用程序需要的其他标头。
#include <string>   // C++ 字符串必须包含这个头文件
using namespace std;

class Student {  // C++ 类名推荐首字母大写
public:
    // 成员变量（对应你原来的字段）
    string name;
    int id;
    string department;
    string grade;
    string from;
    string contact;
    string color;
    string note;
};
