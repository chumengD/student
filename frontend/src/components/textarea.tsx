import { useState } from "react";


export function Note() {
  const [text, setText] = useState("");


  return (
    <div  className="textContainer">
      <textarea
    
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="在这里写点什么..."
        style={{
          position:"relative",
          width: "100%",
          height: "100%",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
          resize: "none"
        }}
      />
    </div>
  );
}