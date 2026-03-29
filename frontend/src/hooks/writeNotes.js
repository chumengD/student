export async function WriteNote({id, note}) {
    try {
        // 1. 获取当前已有的数据
        const localData = localStorage.getItem('student_notes');
        let notes = localData ? JSON.parse(localData) : [];

        // 2. 准备新数据
        const newData = { id, note };
        const index = notes.findIndex(item => item.id === id);

        if (index === -1) {
            notes.push(newData); // 如果不存在则新增
        } else {
            notes[index].note = note; // 如果存在则覆盖内容
        }

        // 3. 核心：写回浏览器本地存储
        localStorage.setItem('student_notes', JSON.stringify(notes));
        
        console.log("数据已持久化到浏览器中！ID:", id);
        return newData;

    } catch (error) {
        console.error("持久化失败:", error);
        return null;
    }
}