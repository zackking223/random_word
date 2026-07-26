"use strict";

const WORDS = [
  "học giỏi",
  "kiếm tiền",
  "nổi tiếng",
  "tài năng",
  "tốt bụng",
  "giúp đỡ",
  "chăm chỉ",
  "kiên trì",
  "sáng tạo",
  "dũng cảm",
  "trung thực",
  "tự tin",
  "kỷ luật",
  "trách nhiệm",
  "đoàn kết",
  "khiêm tốn",
  "lạc quan",
  "biết ơn",
  "tôn trọng",
  "chia sẻ",
  "vượt khó",
  "dẫn đầu",
  "chiến thắng",
  "đạt mục tiêu",
  "phá kỷ lục",
  "truyền cảm hứng",
];

const STORAGE_KEY = "ve-tu-gi-used-words";

const wordDisplay = document.querySelector("#wordDisplay");
const remainingCount = document.querySelector("#remainingCount");
const totalCount = document.querySelector("#totalCount");
const statusMessage = document.querySelector("#statusMessage");
const randomButton = document.querySelector("#randomButton");
const randomButtonText = document.querySelector("#randomButtonText");
const resetButton = document.querySelector("#resetButton");

function readUsedWords() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    const savedWords = savedValue ? JSON.parse(savedValue) : [];

    if (!Array.isArray(savedWords)) {
      return [];
    }

    return savedWords.filter((word) => WORDS.includes(word));
  } catch {
    return [];
  }
}

function saveUsedWords(words) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

function updateInterface() {
  const usedWords = readUsedWords();
  const total = WORDS.length;
  const remaining = total - usedWords.length;

  remainingCount.textContent = String(remaining);
  totalCount.textContent = String(total);
  resetButton.disabled = usedWords.length === 0;
  randomButton.disabled = remaining === 0;
  randomButtonText.textContent =
    remaining === 0 ? "Đã hết từ" : "Bốc từ ngẫu nhiên";
}

function showRandomWord() {
  const usedWords = readUsedWords();
  const availableWords = WORDS.filter((word) => !usedWords.includes(word));

  if (availableWords.length === 0) {
    statusMessage.textContent =
      "Đã dùng hết từ. Hãy reset để bắt đầu lại nhé!";
    updateInterface();
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const selectedWord = availableWords[randomIndex];
  const updatedUsedWords = [...usedWords, selectedWord];

  saveUsedWords(updatedUsedWords);

  wordDisplay.textContent = selectedWord;
  wordDisplay.classList.add("has-word");
  statusMessage.textContent =
    updatedUsedWords.length === WORDS.length
      ? "Đây là từ cuối cùng!"
      : "Vẽ từ này ở ngoài đời nhé — đừng bật mí!";

  updateInterface();
}

function resetUsedWords() {
  localStorage.removeItem(STORAGE_KEY);
  wordDisplay.textContent = "Từ bí mật sẽ hiện ở đây";
  wordDisplay.classList.remove("has-word");
  statusMessage.textContent = "Đã làm mới! Sẵn sàng chơi lại.";
  updateInterface();
}

randomButton.addEventListener("click", showRandomWord);
resetButton.addEventListener("click", resetUsedWords);

updateInterface();
