// CMake_student_management.h: 标准系统包含文件的包含文件
// 或项目特定的包含文件。

#pragma once

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <string>
using namespace std;

#define COURSE_NUM 10
#define NAME_LEN 10

// ===================== 链表结构体定义（统一正确）=====================
typedef struct StudentNode {
    long num;
    char name[NAME_LEN];
    float score[COURSE_NUM];
    float sum;
    float aver;
    struct StudentNode* next;
} STUNode;

// 前端统计结果结构体
typedef struct  {
    int count;
    float avgSum;
} StatResult;

extern STUNode* head;  // 全局链表头
STUNode* head = NULL;
