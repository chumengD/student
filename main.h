#pragma once

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <string>
#include <webview.h>
#include<vector>
#include<fstream>
#include "json.hpp"

using namespace std;
using json = nlohmann::json;

#define COURSE_NUM 10
#define NAME_LEN 30
#define TEXT_LEN 50



// ==============================
// 完整学生信息（对应 interface student）
// ==============================
typedef struct StudentNode {
    // 基础信息
    int id;             // id:number
    char name[NAME_LEN];// name:string

    // 扩展信息
    char appearance[TEXT_LEN]; // appearance:string
    char department[TEXT_LEN];  // department:string
    char grade[TEXT_LEN];       // grade:string
    char from[TEXT_LEN];        // from:string
    char contact[TEXT_LEN];     // contact:string
    char color[TEXT_LEN];       // color:string
    char note[TEXT_LEN];        // note?:string

    // 成绩
    float scores[COURSE_NUM];   // scores:number[]
    float sum;                  // sum?:number
    float average;              // average?:number

    struct StudentNode* next;
} STUNode;

// ==============================
// 统计结果（只返回 count + avgSum）
// ==============================
typedef struct {
    int count;      // 学生总数 stuNumber
    float avgSum;   // 所有学生总分平均值
} StatResult;

extern STUNode* head;
STUNode* head = NULL;


struct new_student{
    string name;
    int  id;
    vector<int> scores;
    int average=0;
    int sum=0;
};

struct test {
    string testName;
    int stuNumber;
    int course;
    vector<string> courseName;
    vector<new_student> students;
};


struct user {
    string username;
    string password;
    string role;
};

vector<user> users = {
    {"25050907", "12345678","学生"},
    {"25050916", "12345678","教师"},
    {"11451419", "12345678","教师"}
};


//声明函数
void to_Json(json& j, const user& usr);
int login(json j);
json get_login_list();
json write_login_list(vector<user> users);