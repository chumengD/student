// CMake_student_management.cpp: 定义应用程序的入口点。
//

#include "main.h"

using namespace std;
using json = nlohmann::json;

int main()
{
    webview::webview w(true, nullptr);
    w.set_title("实践作业");
    w.set_size(1200, 800, WEBVIEW_HINT_NONE);

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

