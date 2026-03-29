import { useState, type ReactNode } from "react";
import { writeSelfNote } from "../hooks/selfNote";

type props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export function Note({text,setText}:props) {


  return (
    <div  className="textContainer">
      <textarea
    
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={async (e) => {
          console.log("失焦了");
          const latestText = e.target.value;
          await writeSelfNote(latestText);
          }}

        placeholder="为了在下次进入或等下提醒自己，在这里留下备注吧！"
        style={{
          position:"relative",
          width: "100%",
          height: "100%",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
          resize: "none",
          boxSizing:'border-box',
          padding:'16px'
        }}
      />
    </div>
  );
}