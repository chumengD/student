export async function ReadNote(id) {
    try {
        // 1. 尝试从本地存储获取数据
        const localData = localStorage.getItem('student_notes');
        let notes = [];

        if (localData) {
            notes = JSON.parse(localData);
        } else {
            // 2. 如果本地没有，去读初始的 json 文件作为默认值
            const response = await fetch("/notes.json");
            notes = response.ok ? await response.json() : [];
            // 初始化存入本地，下次就直接读本地了
            localStorage.setItem('student_notes', JSON.stringify(notes));
        }

        // 3. 查找对应 ID
        const data = notes.find(item => item.id === id);
        return data ? data.note : null;

    } catch (error) {
        console.error("读取本地存储失败:", error);
        return null;
    }
}