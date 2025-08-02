const verticalGojuon = [
  ["あ", "い", "う", "え", "お"],
  ["か", "き", "く", "け", "こ"],
  ["さ", "し", "す", "せ", "そ"],
  ["た", "ち", "つ", "て", "と"],
  ["な", "に", "ぬ", "ね", "の"],
  ["は", "ひ", "ふ", "へ", "ほ"],
  ["ま", "み", "む", "め", "も"],
  ["や", "", "ゆ", "", "よ"],
  ["ら", "り", "る", "れ", "ろ"],
  ["わ", "", "を", "", "ん"]
];

// ← 列優先に変換しつつ、列の順番を逆にする（右から左）
const transposed = [];
const numRows = 5;
const numCols = verticalGojuon.length;

for (let row = 0; row < numRows; row++) {
  transposed[row] = [];
  for (let col = 0; col < numCols; col++) {
    const reversedCol = numCols - 1 - col; // ← ここがポイント
    transposed[row][col] = verticalGojuon[reversedCol][row] || "";
  }
}

const keyboardDiv = document.querySelector(".keyboard");
const output = document.getElementById("output");

transposed.forEach(row => {
  row.forEach(char => {
    const button = document.createElement("button");
    button.className = "char-btn";
    button.textContent = char || " ";
    button.disabled = char === "";
    button.addEventListener("click", () => {
      output.value += char;
    });
    keyboardDiv.appendChild(button);
  });
});

// 削除ボタンの処理
const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", () => {
  output.value = output.value.slice(0, -1);
});

// WebGazer 初期化
window.onload = function () {
  webgazer.setRegression('ridge')       // 推定モデル
          .setGazeListener((data, elapsedTime) => {
            if (data == null) return;
            const x = data.x; // 視線のx座標
            const y = data.y; // 視線のy座標

            // デバッグ用：座標を表示
            const dot = document.getElementById("gaze-dot");
            dot.style.left = x + "px";
            dot.style.top = y + "px";
          })
          .begin();

  webgazer.showPredictionPoints(false); // 赤点を非表示
};
