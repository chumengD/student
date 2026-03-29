// CMake_student_management.cpp: 定义应用程序的入口点。
//

#include "main.h"

using namespace std;
using json = nlohmann::json;

int main()
{
    webview::webview w(true, nullptr);
    w.set_title("实践作业");
    w.set_size(800, 600, WEBVIEW_HINT_NONE);

    // 绑定 C++ 函数，前端可直接调用 window.add(a, b)
    w.bind("greet", [](string s) -> string {
        string data = "hello " + s + "\\n its a good day";
        json response;
        response["message"] = data;
        return response.dump();

        });

       
    w.navigate("http://localhost:5173"); // 开发环境下指向 Vite 端口
    w.run();
    return 0;
}

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define COURSE_NUM 10
#define NAME_LEN 10

// 链表节点（前端界面最适配的数据结构）

// ==========================
// 1. 创建新学生节点（供前端调用）
// ==========================
STUNode* CreateStudent(long num, const char* name, float scores[], int courseCount) {
    STUNode* node = (STUNode*)malloc(sizeof(STUNode));
    node->num = num;
    strcpy(node->name, name);
    memcpy(node->score, scores, sizeof(float) * courseCount);

    // 计算总分 & 平均分
    node->sum = 0;
    for (int j = 0; j < courseCount; j++) {
        node->sum += scores[j];
    }
    node->aver = node->sum / courseCount;
    node->next = NULL;

    return node;
}

STUNode* return_CreateStudent() {
    const result = CreateStudent()
        return serialixeLIst(result);
}

// ==========================
// 2. 尾部追加学生（前端“添加”按钮直接用）
// ==========================
void AppendRecord(STUNode** head, STUNode* newNode) {
    if (*head == NULL) {
        *head = newNode;
    }
    else {
        STUNode* p = *head;
        while (p->next) p = p->next;
        p->next = newNode;
    }
}

// ==========================
// 3. 计算单个学生总分平均分
// ==========================
void CalculateSingleScore(STUNode* node, int m) {
    node->sum = 0;
    for (int j = 0; j < m; j++) {
        node->sum += node->score[j];
    }
    node->aver = node->sum / m;
}

// ==========================
// 4. 计算每门课程的总分 & 平均分（前端统计显示用）
// ==========================
void CalculateScoreOfCourse(STUNode* head, int m, float courseSum[], float courseAver[]) {
    for (int j = 0; j < m; j++) {
        courseSum[j] = 0;
    }

    int count = 0;
    STUNode* p = head;
    while (p) {
        for (int j = 0; j < m; j++) {
            courseSum[j] += p->score[j];
        }
        p = p->next;
        count++;
    }

    for (int j = 0; j < m; j++) {
        courseAver[j] = courseSum[j] / count;
    }
}

// ==========================
// 5. 保存链表到文件（前端“保存”按钮）
// ==========================
void WritetoFile(STUNode* head, int m) {
    FILE* fp = fopen("text.json", "w");
    if (!fp) return;

    // 统计学生数
    int n = 0;
    STUNode* p = head;
    while (p) { n++; p = p->next; }

    fprintf(fp, "%10d%10d\n", n, m);

    p = head;
    while (p) {
        fprintf(fp, "%ld\t%s\t", p->num, p->name);
        for (int j = 0; j < m; j++) {
            fprintf(fp, "%.2f\t", p->score[j]);
        }
        fprintf(fp, "%.2f\t%.2f\n", p->sum, p->aver);
        p = p->next;
    }

    fclose(fp);
}

// ==========================
// 6. 从文件读取并构建链表（前端“加载”按钮）
// ==========================
STUNode* ReadfromFile(int* m) {
    FILE* fp = fopen("text.json", "r");
    if (!fp) {
        *m = 0;
        return NULL;
    }

    int n;
    fscanf(fp, "%10d%10d\n", &n, m);

    STUNode* head = NULL;
    for (int i = 0; i < n; i++) {
        STUNode* node = (STUNode*)malloc(sizeof(STUNode));
        fscanf(fp, "%ld\t%s\t", &node->num, node->name);

        for (int j = 0; j < *m; j++) {
            fscanf(fp, "%f\t", &node->score[j]);
        }
        fscanf(fp, "%f\t%f\n", &node->sum, &node->aver);
        node->next = NULL;

        AppendRecord(&head, node);
    }

    fclose(fp);
    return head;
}

// ==========================
// 7. 获取链表长度（前端显示总数）
// ==========================
int GetStudentCount(STUNode* head) {
    int count = 0;
    STUNode* p = head;
    while (p) {
        count++;
        p = p->next;
    }
    return count;
}

// ==========================
// 8. 按学号查找学生（前端查询功能）
// ==========================
STUNode* FindStudentByNum(STUNode* head, long num) {
    STUNode* p = head;
    while (p) {
        if (p->num == num) return p;
        p = p->next;
    } 
    return NULL;
}

// ==========================
// 9. 按姓名查找学生（前端查询功能）
// ==========================
STUNode* FindStudentByName(STUNode* head, char name[])
{
    // 链表为空，直接返回
    if (head == NULL)
        return NULL;

    STUNode* p = head;

    // 遍历整个链表
    while (p != NULL)
    {
        // 字符串比较：相同返回0，所以用 == 0 判断
        if (strcmp(p->name, name) == 0)
        {
            return p; // 找到，返回当前节点
        }
        p = p->next;
    }

    return NULL; // 遍历完没找到
}





// ==========================
// 10. 删除学生（前端删除按钮）
// ==========================
int DeleteStudent(STUNode** head, long num) {
    if (*head == NULL) return 0;

    STUNode* p = *head;
    STUNode* prev = NULL;

    if (p->num == num) {
        *head = p->next;
        free(p);
        return 1;
    }

    while (p && p->num != num) {
        prev = p;
        p = p->next;
    }

    if (!p) return 0;

    prev->next = p->next;
    free(p);
    return 1;
};


// ==========================
// 11. 修改学生记录（前端删除按钮）
// ==========================
int ModifyStudent(STUNode* head, long oldNum, const char* newName, float newScores[], int m)
{
    STUNode* p = head;
    while (p != NULL)
    {
        if (p->num == oldNum)
        {
            // 修改姓名
            strcpy(p->name, newName);

            // 修改成绩
            memcpy(p->score, newScores, sizeof(float) * m);

            // 重新计算总分和平均分
            p->sum = 0;
            for (int j = 0; j < m; j++)
            {
                p->sum += p->score[j];
            }
            p->aver = p->sum / m;

            return 1; // 修改成功
        }
        p = p->next;
    }
    return 0; // 未找到
}
// ==========================
// 12. 获取第 index 个学生的记录（前端表格刷新专用）
// ==========================
STUNode* GetStudentByIndex(STUNode* head, int index)
{
    int count = 0;
    STUNode* p = head;
    while (p != NULL)
    {
        if (count == index)
            return p;
        count++;
        p = p->next;
    }
    return NULL;
}