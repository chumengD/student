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

	// 获取考试数据
	w.bind("getTestList", [](const string& req)->string {

		json res;
		json testList = json::array();
		json read_res = read_test();

		if (read_res["ok"]) {
			testList = read_res["test"];
			res["code"] = 200;
			res["msg"] = "获取考试数据成功";
			res["data"] = testList;
		}
		else {
			res["code"] = 500;
			res["msg"] = "获取考试数据失败";
			res["data"] = testList;
		}

		return res.dump();



		});
 
	// 上传考试数据
	w.bind("submitTest", [](string newTest) -> string {
		json n_test = json::parse(newTest)[0];


		for (int i = 0; i < n_test["students"].size(); i++) {
			n_test["students"][i] = CalculateScore(n_test["students"][i]);
		}

		json res;
		json testList = json::array();
		fstream file;

		//读取考试列表
		json read_res = read_test();
		if (read_res["ok"]) {
			testList = read_res["test"];
		}
		else {
			res["code"] = 500;
			res["msg"] = "获取考试信息失败";
		}

		//查找是否用重名考试
		for (const auto& test : testList) {
			if (test["testName"] == n_test["testName"]) {
				res["code"] = 500;
				res["msg"] = "有重名考试";
				return res.dump();
			}
		}

		//更新考试列表
		testList.push_back(n_test);

		if (write_test(testList)) {
			res["code"] = 200;
			res["msg"] = "写入考试成功";
		}
		else {
			res["code"] = 500;
			res["msg"] = "写入考试信息失败";
			
		}
		res["data"] = n_test;

		return res.dump(4);

		});

	//更新修改后的数据
	w.bind("updateTest", [](string changedTest)->string {
		//先处理数据，在储存数据
		json c_test = json::parse(changedTest)[0];
		json students = c_test["students"];
		json new_students = json::array();
		
		for (auto& student : students) {
			json n_student = CalculateScore(student);
			new_students.push_back(n_student);
		}
		c_test["students"] = new_students;



		json testList;
		
		json get_test;
		json read_res = read_test();
		json res;
		res["isUpdate"] = false;

		//先获取考试列表
		if (read_res["ok"]) {
			testList = read_res["test"];

			//寻找同名test对象
			for (auto& test : testList) {
				if (c_test["testName"] == test["testName"]) {

					//找到后直接替换
					test = c_test;
					res["isUpdate"] = true;
					break;
				}
			}

			//写入新testlist
			if (write_test(testList)) {
				res["isWrite"] = true;
			}
			else {
				res["isWrite"] = false;
			}

			return res.dump();

		}
	});

	//删除考试
	w.bind("deleteTest", [](string test_name)->string {
		json res;
		const string& name = json::parse(test_name)[0];
		json read_res = read_test();
		if (read_res["ok"]) {
			json testList = read_res["test"];

			//使用remove_if和lambda表达式删除同名考试
			testList.erase(
				std::remove_if(testList.begin(), testList.end(),
					[&name](const json& test) {
						return test["testName"] == name;
					}),
				testList.end()
			);

			//将修改后的考试列表写回文件
			if (write_test(testList)) {
				res["code"] = 200;
				res["msg"] = "删除考试成功";
			}
			else {
				res["code"] = 500;
				res["msg"] = "删除考试失败";
			};

		}
		else {
			res["code"] = 500;
			res["msg"] = "获取考试信息失败";
			
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
	//write_login_list(users);
	ifstream file("login.json");
	json json_users = json::parse(file);
	file.close();
	return json_users;

}

json write_login_list(vector<user> users) {
	ofstream file;
	file.open("login.json");
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


json read_test() {
	json res;
	json testList = json::array();
	ifstream file("test.json");
	if (file.is_open()) {
		try {
			testList = json::parse(file);
			res["test"] = testList;
			res["ok"] = true;

		}catch(const json::parse_error& e) {
			res["isParse"] = false;
			res["ok"] = false;
		}
	}
	else {
		res["open"] = false;
		res["ok"] = false;
	}

	return res;
}

bool write_test(json testList) {
	bool result = false;
	json res;
	ofstream file("test.json");
	if (file.is_open()) {
		file << testList.dump(2);
		result = true;
	}
	
	return result;
}



json CalculateScore(json student) {
	
	vector<int> scores = student["scores"];

	
	int sum = 0;
	double average = 0.0;  

	
	for (int& score:scores) {
		sum += score;
	}

	
	if (scores.size() > 0) {
		average = (double)sum / scores.size();
	}

	
	student["sum"] = sum;        // 总分
	student["average"] = average;   // 平均分

	return student;
}

