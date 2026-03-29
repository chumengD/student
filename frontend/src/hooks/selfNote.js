// 读取个人笔记
export function readSelfNote() {
    // localStorage 返回的是字符串，直接拿
    const data = localStorage.getItem('self_note_text');
    console.log(`读取个人笔记成功:${data}`);
    return data || ""; // 如果没有就返回空字符串
}

// 写入个人笔记
export function writeSelfNote(content) {
    try {
        localStorage.setItem('self_note_text', content);
        console.log("个人笔记已保存！");
    } catch (e) {
        console.error("保存失败:", e);
    }
}