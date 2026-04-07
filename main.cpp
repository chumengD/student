#include "main.h"

using json = nlohmann::json;

test g_test;

int main()
{
    webview::webview w(true, nullptr);
    w.set_title("实践作业");
    w.set_size(800, 600, WEBVIEW_HINT_NONE);

   
    w.bind("submitTest", [](string jsonStr) -> string {
        try {
            json req = json::parse(jsonStr);

            // 读取前端 test 接口所有字段
            string testName = req["testName"];
            int stuNumber = req["stuNumber"];
            int course = req["course"];
            vector<string> courseName = req["courseName"];
            json studentsJson = req["students"];

            // 清空原有链表
            STUNode* p = head;
            while (p != NULL) {
                STUNode* temp = p;
                p = p->next;
                free(temp);
            }
            head = NULL;

            // 批量添加学生（匹配 new_student 接口）
            for (auto& item : studentsJson) {
                int id = item["id"];
                string name = item["name"];
                vector<float> scoresVec = item["scores"];

                float scores[COURSE_NUM] = { 0 };
                for (int i = 0; i < scoresVec.size() && i < COURSE_NUM; i++) {
                    scores[i] = scoresVec[i];
                }

                STUNode* node = CreateStudent(id, name.c_str(), scores, course);
                AppendRecord(&head, node);
            }

            // 保存到文件
            WritetoFile(head, course);

            // 返回成功结果
            json res;
            res["code"] = 200;
            res["msg"] = "提交成功";
            res["stuCount"] = GetStudentCount(head);
            return res.dump();
        }
        catch (...) {
            json err;
            err["code"] = 500;
            err["msg"] = "数据格式错误";
            return err.dump();
        }
        });

    // 提交考试数据
    w.bind("getTextList", [](string s) -> string {
        json result = loadTestFromFile();
        return result.dump();
        });

    // 登录
    w.bind("login", [](string loginMessage) -> string {
        json res;
		auto j = json::parse(loginMessage);
		int user = j["user"];
		string pwd = j["pwd"];

        if (login(user, pwd)) {
            res["code"] = 200;
            res["msg"] = "登录成功";
        }
        else {
            res["code"] = 403;
            res["msg"] = "账号或密码错误";
        }
        return res.dump();
        });

    //更新考试数据
    w.bind("updateTest", [](string jsonStr) -> string {
        updateTest(jsonStr);  // 直接覆盖本地数据

        json res;
        res["code"] = 200;
        res["msg"] = "考试数据已更新并覆盖本地";
        return res.dump();
        });

    // 创建考试
    w.bind("submitTest", [](string jsonStr) -> string {
        submitTest(jsonStr);  // 执行提交

        json res;
        res["code"] = 200;
        res["msg"] = "创建/提交考试成功";
        return res.dump();
        });
    // 获取统计数据

    //w.bind("getStatistic", [](string s) -> string {
    //    StatResult res = StatisticAnalysis(0, 0, head);
    //    json data = ConvertStatToJson(res);
    //    return data.dump();
    //    });

    w.navigate("http://localhost:5173");
    w.run();
    return 0;
}

// 创建学生节点（字段完全匹配 new_student）
STUNode* CreateStudent(int id, const char* name, float scores[], int courseCount) {
    STUNode* node = (STUNode*)malloc(sizeof(STUNode));
    node->id = id;
    strcpy(node->name, name);
    memcpy(node->scores, scores, sizeof(float) * courseCount);

    node->sum = 0;
    for (int j = 0; j < courseCount; j++) {
        node->sum += scores[j];
    }
    node->average = courseCount > 0 ? node->sum / courseCount : 0;
    node->next = NULL;
    return node;
}

// 尾部追加学生
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

// 计算单个学生总分/平均分
void CalculateSingleScore(STUNode* node, int m) {
    node->sum = 0;
    for (int j = 0; j < m; j++) {
        node->sum += node->scores[j];
    }
    node->average = m > 0 ? node->sum / m : 0;
}

// 计算每门课程总分&平均分
void CalculateScoreOfCourse(STUNode* head, int m, float courseSum[], float courseAver[]) {
    for (int j = 0; j < m; j++) courseSum[j] = 0;
    int count = 0;
    STUNode* p = head;
    while (p) {
        for (int j = 0; j < m; j++) courseSum[j] += p->scores[j];
        p = p->next; count++;
    }
    for (int j = 0; j < m; j++) courseAver[j] = count > 0 ? courseSum[j] / count : 0;
}

// 保存到文件
void WritetoFile(STUNode* head, int m) {
    FILE* fp = fopen("student_data.txt", "w");
    if (!fp) return;
    int n = GetStudentCount(head);
    fprintf(fp, "%d %d\n", n, m);
    STUNode* p = head;
    while (p) {
        fprintf(fp, "%d %s ", p->id, p->name);
        for (int j = 0; j < m; j++) fprintf(fp, "%.2f ", p->scores[j]);
        fprintf(fp, "%.2f %.2f\n", p->sum, p->average);
        p = p->next;
    }
    fclose(fp);
}

// 从文件读取
STUNode* ReadfromFile(int* m) {
    FILE* fp = fopen("student_data.txt", "r");
    if (!fp) { *m = 0; return NULL; }
    int n;
    fscanf(fp, "%d %d", &n, m);
    STUNode* head = NULL;
    for (int i = 0; i < n; i++) {
        STUNode* node = (STUNode*)malloc(sizeof(STUNode));
        fscanf(fp, "%d %s", &node->id, node->name);
        for (int j = 0; j < *m; j++) fscanf(fp, "%f", &node->scores[j]);
        fscanf(fp, "%f %f", &node->sum, &node->average);
        node->next = NULL;
        AppendRecord(&head, node);
    }
    fclose(fp);
    return head;
}

// 获取学生总数
int GetStudentCount(STUNode* head) {
    int cnt = 0;
    STUNode* p = head;
    while (p) { cnt++; p = p->next; }
    return cnt;
}

// 按学号查找
STUNode* FindStudentByNum(STUNode* head, int id) {
    STUNode* p = head;
    while (p) {
        if (p->id == id) return p;
        p = p->next;
    }
    return NULL;
}

// 按姓名查找
STUNode* FindStudentByName(STUNode* head, char name[]) {
    STUNode* p = head;
    while (p) {
        if (strcmp(p->name, name) == 0) return p;
        p = p->next;
    }
    return NULL;
}

// 删除学生
int DeleteStudent(STUNode** head, int id) {
    if (*head == NULL) return 0;
    STUNode* p = *head;
    STUNode* prev = NULL;
    if (p->id == id) {
        *head = p->next; free(p); return 1;
    }
    while (p && p->id != id) { prev = p; p = p->next; }
    if (!p) return 0;
    prev->next = p->next; free(p); return 1;
}

// 修改学生
int ModifyStudent(STUNode* head, int oldId, const char* newName, float newScores[], int m) {
    STUNode* p = head;
    while (p) {
        if (p->id == oldId) {
            strcpy(p->name, newName);
            memcpy(p->scores, newScores, sizeof(float) * m);
            CalculateSingleScore(p, m);
            return 1;
        }
        p = p->next;
    }
    return 0;
}

// 按索引获取学生
STUNode* GetStudentByIndex(STUNode* head, int index) {
    int cnt = 0;
    STUNode* p = head;
    while (p) {
        if (cnt == index) return p;
        cnt++; p = p->next;
    }
    return NULL;
}

// 按姓名排序
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

// 按学号排序
void SortbyNum(int n, int m, STUNode stu[]) {
    if (head == NULL || head->next == NULL) return;
    STUNode* p, * last = NULL;
    bool swapped;
    do {
        swapped = false;
        p = head;
        while (p->next != last) {
            if (p->id > p->next->id) {
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

// 按总分排序
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
// 16. 成绩统计（严格匹配前端）
// ==========================
StatResult StatisticAnalysis(STUNode* head) {
    StatResult res = { 0 };
    if (head == NULL) return res;

    STUNode* p = head;
    float totalSum = 0;
    int studentCount = 0;

    while (p) {
        totalSum += p->sum;
        studentCount++;
        p = p->next;
    }

    res.count = studentCount;
    res.avgSum = studentCount > 0 ? (totalSum / studentCount) : 0.0f;
    return res;
}

// 链表转JSON（完全匹配 new_student 接口）
json ConvertListToJson(STUNode* head, int courseNum)
{
    json arr = json::array();
    STUNode* p = head;
    while (p != NULL)
    {
        json stu;
        stu["id"] = p->id;
        stu["name"] = p->name;

        json scores = json::array();
        for (int i = 0; i < courseNum; i++) {
            scores.push_back(p->scores[i]);
        }

        stu["scores"] = scores;
        stu["sum"] = p->sum;
        stu["average"] = p->average;
        arr.push_back(stu);
        p = p->next;
    }
    return arr;
}

json ConvertStatToJson(StatResult res)
{
    json j;
    j["count"] = res.count;
    j["avgSum"] = res.avgSum;
    return j;
}


// 更新考试数据 —— 接收前端 JSON，覆盖本地 g_test
void updateTest(const string& jsonStr) {
    try {
        // 1. 解析前端传来的 JSON
        json req = json::parse(jsonStr);

        // 2. 创建新的 test 数据（用来覆盖旧数据）
        test newTestData;

        // 一一对应赋值
        newTestData.testName = req["testName"];
        newTestData.stuNumber = req["stuNumber"];
        newTestData.course = req["course"];
        newTestData.courseName = req["courseName"].get<vector<string>>();

        // 解析学生数组
        for (const auto& item : req["students"]) {
            new_student stu;
            stu.name = item["name"];
            stu.id = item["id"];
            stu.scores = item["scores"].get<std::vector<int>>();;

            // 可选字段：有就赋值，没有保持 0
            if (item.contains("sum")) stu.sum = item["sum"];
            if (item.contains("average")) stu.average = item["average"];

            newTestData.students.push_back(stu);
        }

        g_test = newTestData;

    }
    catch (...) {
        // 解析失败，不覆盖，保证安全
        return;
    }
}

// 从本地 test.json 读取考试数据到 g_test
json loadTestFromFile() {
    try {
        ifstream file("test.json");
        if (!file.is_open()) return false;

        json testList;
        file >> testList; 
    
        //// 直接解析到你的 g_test
        //g_test.testName = j["testName"];
        //g_test.stuNumber = j["stuNumber"];
        //g_test.course = j["course"];
        //g_test.courseName = j["courseName"].get<vector<string>>();

        //// 读取学生数组
        //g_test.students.clear();
        //for (auto& item : j["students"]) {
        //    new_student stu;
        //    stu.name = item["name"];
        //    stu.id = item["id"];
        //    stu.scores = item["scores"].get<vector<float>>();
        //    stu.sum = item["sum"];
        //    stu.average = item["average"];

        //    g_test.students.push_back(stu);
        //}


        file.close();
        return testList;
    }
    catch (...) {
        return false;
    }
}



// 创建/提交考试（接收前端JSON → 覆盖g_test → 保存到文件）
void submitTest(const string& jsonStr) {
    try {
        // 1. 解析前端传来的JSON
        json j = json::parse(jsonStr);

        // 2. 直接覆盖全局g_test（整结构赋值，极简）
        g_test = j;

        // 3. 自动保存到本地 test.json 文件
        saveTestToFile();
    }
    catch (...) {
        // 解析失败，不执行任何操作
    }
}

// 辅助：保存g_test到本地JSON文件
void saveTestToFile(const string& path = "test.json") {
    try {
        json j = g_test;
        ofstream file(path);
        file << j.dump(4); // 格式化保存
        file.close();
    }
    catch (...) {}
}


int login(int inputUser, string inputPwd) {
	json users = get_login_list();
    for (const auto& user : users) {
        if (inputUser == user["username"] && inputPwd == user["password"]) return 1;
    }
    return 0;
}

json get_login_list() {
    //write_login_list(users);
	fstream file("login.json");
	json json_users = json::parse(file);
    
    return json_users;

}

json write_login_list(vector<user> users) {
    ofstream file;
	file.open("login.json");
    json json_users = json::array();
    if (file.is_open()) {
        for (const auto& user : users) {
            json j;
            to_json(j, user);
			json_users.push_back(j);
        }
        file << json_users.dump(4);
		file.close();
    }
	return json_users;
}

void to_json(json& j, const user& usr) {
    j = json{ {"username", usr.username}, {"password", usr.password} };
}