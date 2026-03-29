// CMake_student_management.h: 标准系统包含文件的包含文件
// 或项目特定的包含文件。

#pragma once

#include <iostream>
#include <webview.h>
#include "json.hpp"

// TODO: 在此处引用程序需要的其他标头。
#include <string>   // C++ 字符串必须包含这个头文件
using namespace std;


struct StudentNode {
    long num;              // 学号
    char name[NAME_LEN];   // 姓名
    float score[COURSE_NUM]; // 课程成绩
    float sum;             // 总分
    float aver;            // 平均分

    struct StudentNode* next;
};
typedef struct StudentNode STUNode;

struct text {
    int student_num;
    int course_num;
    string course[];
    StudentNode* head;
};

struct return_text {
    int student_num;
    int course_num;
    string course[];
    StudentNode* head;
};
