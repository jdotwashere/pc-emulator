import React, { useRef, useEffect, useState } from "react";
import EmulatorCore from "./EmulatorCore";
import "./index.css";

function EmulatorCanvas({ screen }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, 640, 400);

    // Draw emulator screen memory if available
    if (screen && screen.length) {
      for (let y = 0; y < 25; y++) {
        for (let x = 0; x < 80; x++) {
          const ch = screen[y * 80 + x];
          ctx.font = "16px monospace";
          ctx.fillStyle = "#0f0";
          ctx.fillText(ch || " ", x * 8, (y + 1) * 16);
        }
      }
    } else {
      ctx.font = "20px monospace";
      ctx.fillStyle = "#0f0";
      ctx.fillText("React PC Emulator", 180, 200);
      ctx.fillText(">> [Emulation screen]", 180, 230);
    }
  }, [screen]);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={400}
      style={{
        border: "2px solid #333",
        background: "#000",
        width: "100%",
        maxWidth: 640,
        aspectRatio: "16/10",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}

function App() {
  const [screen, setScreen] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "PC Emulator Ready.",
    "Type a command and press Enter."
  ]);

  // Handle input commands
  function handleCommand(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const output = EmulatorCore(input, history);
    setHistory([...history, "> " + input, ...output.split("\n")]);
    setInput("");
    // Optionally update screen memory here
  }

  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ textAlign: "center" }}>🖥️ PC Emulator</h1>
      <EmulatorCanvas screen={screen} />
      <div style={{ maxWidth: 640, margin: "2rem auto", background: "#181825", borderRadius: 8, padding: 24 }}>
        <div style={{ height: 200, overflowY: "auto", background: "#121212", padding: 12, borderRadius: 6, marginBottom: 8, fontFamily: "monospace", fontSize: 16 }}>
          {history.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <form onSubmit={handleCommand} style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ flex: 1, fontFamily: "monospace", fontSize: 16, padding: 8, borderRadius: 4, border: "1px solid #444", background: "#222", color: "#fff" }}
            placeholder="Enter command..."
            autoFocus
          />
          <button type="submit" style={{ padding: "8px 20px", fontSize: 16, borderRadius: 4, background: "#2b2", color: "#111", border: "none" }}>Run</button>
        </form>
      </div>
      <div style={{ textAlign: "center", marginTop: 32, color: "#aaa" }}>
        <p>Keyboard and mouse input will go here.</p>
        <p>This is a minimal emulator UI in React.</p>
      </div>
    </div>
  );
}

export default App;