# CMakeList.txt: CMake_student_management 的 CMake 项目，在此处包括源代码并定义
# 项目特定的逻辑。
#
cmake_minimum_required (VERSION 3.10)
project ("CMake_student_management")


# 如果支持，请为 MSVC 编译器启用热重载。
if (POLICY CMP0141)
  cmake_policy(SET CMP0141 NEW)
  set(CMAKE_MSVC_DEBUG_INFORMATION_FORMAT "$<IF:$<AND:$<C_COMPILER_ID:MSVC>,$<CXX_COMPILER_ID:MSVC>>,$<$<CONFIG:Debug,RelWithDebInfo>:EditAndContinue>,$<$<CONFIG:Debug,RelWithDebInfo>:ProgramDatabase>>")
endif()


# WIN32 标志确保程序启动时不显示黑乎乎的控制台窗口
add_executable(CMake_student_management  main.cpp main.h)


if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET CMake_student_management PROPERTY CXX_STANDARD 20)
endif()

# TODO: 如有需要，请添加测试并安装目标。
# 设置输出目录
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")

include(FetchContent)

# 声明并获取 webview 库
FetchContent_Declare(
  webview
  GIT_REPOSITORY https://github.com/webview/webview
  GIT_TAG 0.12.0
)
FetchContent_MakeAvailable(webview)

# 创建可执行文件


target_sources(CMake_student_management PRIVATE main.cpp)

# 链接库
target_link_libraries(CMake_student_management PRIVATE webview::core)