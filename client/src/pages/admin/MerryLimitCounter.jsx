import React, { useState } from "react";

function MerryLimitCounter() {
  const [count, setCount] = useState(0);

  const handleUpClick = () => {
    setCount(count + 1);
  };

  const handleDownClick = () => {
    setCount(count - 1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#ffffff",
      }}
    >
      <h1
        style={{
          fontSize: "100px",
          fontWeight: "bold",
          color: "#000000",
        }}
      >
        Merry Limit! {count}
      </h1>
      <button onClick={handleUpClick}>Up</button>
      <button onClick={handleDownClick}>Down</button>
    </div>
  );
}
