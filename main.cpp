#include "main.h"

test g_test;


int main()
{
    webview::webview w(true, nullptr);
    w.set_title("实践作业");
    w.set_size(800, 600, WEBVIEW_HINT_NONE);

    

    // 登录
    w.bind("login", [](string loginMessage) -> string {
        json res;
		json j = json::parse(loginMessage);
        json data = j[0];
        json test = get_login_list();

        if (login(data)) {
            res["code"] = 200;
            res["msg"] = "登录成功";
        }
        else {
            res["code"] = 403;
            res["msg"] = "账号或密码错误";
            res["test"] = test;
            res["data"] = data;
        }
        return res.dump();
        });

 
    w.navigate("http://localhost:5173");
    w.run();
    return 0;
}


int login(json j) {
	json users = get_login_list();
    for (const auto& user : users) {
        if (j["id"].get<string>() == user["username"].get<string>() &&
            j["password"].get<string>() == user["password"].get<string>() &&
            j["role"].get<string>() == user["role"].get<string>()) return 1;
    }
    return 0;
}

json get_login_list() {
	ifstream file("./login.json");
	json json_users = json::parse(file);
    file.close();
    return json_users;

}

json write_login_list(vector<user> users) {
    ofstream file;
	file.open("./login.json");
    json json_users = json::array();
    if (file.is_open()) {
        for (const auto& user : users) {
            json j;
            to_Json(j, user);
			json_users.push_back(j);
        }
        file << json_users.dump(4);
		file.close();
    }
	return json_users;
}


void to_Json(json& j, const user& usr) {
    j = json{ {"username", usr.username}, {"password", usr.password},{"role",usr.role}};
}
