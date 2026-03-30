// CMake_student_management.cpp: 定义应用程序的入口点。
//

// 1. 创建新学生节点
// ==========================
STUNode* CreateStudent(long num, const char* name, float scores[], int courseCount) {
    STUNode* node = (STUNode*)malloc(sizeof(STUNode));
    node->num = num;
    strcpy(node->name, name);
    memcpy(node->score, scores, sizeof(float) * courseCount);

    node->sum = 0;
    for (int j = 0; j < courseCount; j++) {
        node->sum += scores[j];
    }
    node->aver = node->sum / courseCount;
    node->next = NULL;
    return node;
}

// ==========================
// 2. 尾部追加学生
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
// 4. 计算每门课程总分 & 平均分
// ==========================
void CalculateScoreOfCourse(STUNode* head, int m, float courseSum[], float courseAver[]) {
    for (int j = 0; j < m; j++) courseSum[j] = 0;
    int count = 0;
    STUNode* p = head;
    while (p) {
        for (int j = 0; j < m; j++) courseSum[j] += p->score[j];
        p = p->next; count++;
    }
    for (int j = 0; j < m; j++) courseAver[j] = courseSum[j] / count;
}

// ==========================
// 5. 保存到文件
// ==========================
void WritetoFile(STUNode* head, int m) {
    FILE* fp = fopen("text.txt", "w");
    if (!fp) return;
    int n = 0;
    STUNode* p = head;
    while (p) { n++; p = p->next; }
    fprintf(fp, "%10d%10d\n", n, m);
    p = head;
    while (p) {
        fprintf(fp, "%ld\t%s\t", p->num, p->name);
        for (int j = 0; j < m; j++) fprintf(fp, "%.2f\t", p->score[j]);
        fprintf(fp, "%.2f\t%.2f\n", p->sum, p->aver);
        p = p->next;
    }
    fclose(fp);
}

// ==========================
// 6. 从文件读取
// ==========================
STUNode* ReadfromFile(int* m) {
    FILE* fp = fopen("text.txt", "r");
    if (!fp) { *m = 0; return NULL; }
    int n;
    fscanf(fp, "%10d%10d\n", &n, m);
    STUNode* head = NULL;
    for (int i = 0; i < n; i++) {
        STUNode* node = (STUNode*)malloc(sizeof(STUNode));
        fscanf(fp, "%ld\t%s\t", &node->num, node->name);
        for (int j = 0; j < *m; j++) fscanf(fp, "%f\t", &node->score[j]);
        fscanf(fp, "%f\t%f\n", &node->sum, &node->aver);
        node->next = NULL;
        AppendRecord(&head, node);
    }
    fclose(fp);
    return head;
}

// ==========================
// 7. 获取学生总数
// ==========================
int GetStudentCount(STUNode* head) {
    int cnt = 0;
    STUNode* p = head;
    while (p) { cnt++; p = p->next; }
    return cnt;
}

// ==========================
// 8. 按学号查找
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
// 9. 按姓名查找
// ==========================
STUNode* FindStudentByName(STUNode* head, char name[]) {
    STUNode* p = head;
    while (p) {
        if (strcmp(p->name, name) == 0) return p;
        p = p->next;
    }
    return NULL;
}

// ==========================
// 10. 删除学生
// ==========================
int DeleteStudent(STUNode** head, long num) {
    if (*head == NULL) return 0;
    STUNode* p = *head;
    STUNode* prev = NULL;
    if (p->num == num) {
        *head = p->next; free(p); return 1;
    }
    while (p && p->num != num) { prev = p; p = p->next; }
    if (!p) return 0;
    prev->next = p->next; free(p); return 1;
}

// ==========================
// 11. 修改学生
// ==========================
int ModifyStudent(STUNode* head, long oldNum, const char* newName, float newScores[], int m) {
    STUNode* p = head;
    while (p) {
        if (p->num == oldNum) {
            strcpy(p->name, newName);
            memcpy(p->score, newScores, sizeof(float) * m);
            CalculateSingleScore(p, m);
            return 1;
        }
        p = p->next;
    }
    return 0;
}

// ==========================
// 12. 按索引获取学生
// ==========================
STUNode* GetStudentByIndex(STUNode* head, int index) {
    int cnt = 0;
    STUNode* p = head;
    while (p) {
        if (cnt == index) return p;
        cnt++; p = p->next;
    }
    return NULL;
}

// ==========================
// 13. 按姓名排序
// ==========================
void SortbyName(int n, int m, STUNode stu[]) {
    if (head == NULL || head->next == NULL) return;
    STUNode* p, * last = NULL;
    bool swapped;
    do {
        swapped = false;
        p = head;
        while (p->next != last) {
            if (strcmp(p->name, p->next->name) > 0) {
                STUNode tmp = *p;
                *p = *p->next;
                *p->next = tmp;
                swapped = true;
            }
            p = p->next;
        }
        last = p;
    } while (swapped);
}

// ==========================
// 14. 按学号排序
// ==========================
void SortbyNum(int n, int m, STUNode stu[]) {
    if (head == NULL || head->next == NULL) return;
    STUNode* p, * last = NULL;
    bool swapped;
    do {
        swapped = false;
        p = head;
        while (p->next != last) {
            if (p->num > p->next->num) {
                STUNode tmp = *p;
                *p = *p->next;
                *p->next = tmp;
                swapped = true;
            }
            p = p->next;
        }
        last = p;
    } while (swapped);
}

// ==========================
// 15. 按总分排序
// ==========================
void SortbyScore(int n, int m, STUNode stu[]) {
    if (head == NULL || head->next == NULL) return;
    STUNode* p, * last = NULL;
    bool swapped;
    do {
        swapped = false;
        p = head;
        while (p->next != last) {
            if (p->sum < p->next->sum) {
                STUNode tmp = *p;
                *p = *p->next;
                *p->next = tmp;
                swapped = true;
            }
            p = p->next;
        }
        last = p;
    } while (swapped);
}

// ==========================
// 16. 成绩统计
// ==========================
StatResult StatisticAnalysis(int n, int m, STUNode* stu) {
    StatResult res = { 0 };
    if (head == NULL) return res;
    STUNode* p = head;
    //res.maxSum = p->sum;
    //res.minSum = p->sum;
    float total = 0;
    while (p) {
        //if (p->sum > res.maxSum) res.maxSum = p->sum;
        //if (p->sum < res.minSum) res.minSum = p->sum;
        //if (p->aver >= 60) res.passCount++;
        //else res.failCount++;
        //res.count++;

        total += p->sum;
        p = p->next;
    }
    if (res.count > 0) res.avgSum = total / res.count;
    return res;
}

json ConvertListToJson(STUNode* head, int courseNum)
{
    json arr = json::array(); // 创建 JSON 数组

    STUNode* p = head;
    while (p != NULL)
    {
        json stu;
        stu["num"] = p->num;              // 学号
        stu["name"] = p->name;            // 姓名

        // 把成绩数组转成 JSON 数组
        json scores = json::array();
        for (int i = 0; i < courseNum; i++)
        {
            scores.push_back(p->score[i]);
        }
        stu["scores"] = scores;
        stu["sum"] = p->sum;              // 总分
        stu["aver"] = p->aver;            // 平均分

        arr.push_back(stu); // 加入数组s
        p = p->next;
    }
    return arr;
}
json ConvertStatToJson(StatResult res)
{
    json j;
    j["count"] = res.count;
    j["avgSum"] = res.avgSum;
    j["passCount"] = res.passCount;
    j["failCount"] = res.failCount;
    return j;
}