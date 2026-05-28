const questions = [
  {
    category: "Part 5 / Vocabulary",
    question: "The manager will ______ the proposal before sending it to the client.",
    choices: ["evaluate", "decorate", "hesitate", "relocate"],
    answer: "evaluate",
    ja: "managerはclientに送る前にproposalを『評価する・検討する』。evaluate = 評価する。"
  },
  {
    category: "Part 5 / Connector",
    question: "______ the heavy rain, the outdoor event continued as scheduled.",
    choices: ["Despite", "Because", "During", "According"],
    answer: "Despite",
    ja: "Despite + 名詞で『〜にもかかわらず』。heavy rainは名詞句なのでDespiteが正解。"
  },
  {
    category: "Part 5 / Business",
    question: "All participants must submit the registration form no later than Friday.",
    choices: ["参加者", "競合他社", "所有者", "講師"],
    answer: "参加者",
    ja: "participants = 参加者。submit = 提出する。no later than = 遅くとも〜までに。"
  },
  {
    category: "Part 5 / Preposition",
    question: "The new policy was created in accordance ______ local safety requirements.",
    choices: ["with", "to", "for", "by"],
    answer: "with",
    ja: "in accordance with = 〜に従って。TOEIC頻出の固定表現。"
  },
  {
    category: "Part 7 / Vocabulary",
    question: "The warranty is valid for two years from the date of purchase.",
    choices: ["保証", "請求書", "候補者", "予算"],
    answer: "保証",
    ja: "warranty = 保証。valid = 有効な。purchase = 購入。"
  },
  {
    category: "Part 5 / Adverb",
    question: "The shipment was delayed, but the staff responded ______ to customer inquiries.",
    choices: ["promptly", "formerly", "rarely", "widely"],
    answer: "promptly",
    ja: "respondedを修飾する副詞。promptly = 迅速に。"
  },
  {
    category: "Part 5 / Phrase",
    question: "The office will be closed due ______ scheduled maintenance.",
    choices: ["to", "for", "with", "of"],
    answer: "to",
    ja: "due to = 〜のために。原因を表す頻出表現。"
  },
  {
    category: "Part 1 / Photo Vocabulary",
    question: "A wheelbarrow is parked beside the shed.",
    choices: ["一輪車", "掲示板", "歩道", "食器棚"],
    answer: "一輪車",
    ja: "wheelbarrow = 手押し一輪車。shed = 小屋。Part 1で出やすい物の名前。"
  },
  {
    category: "Part 5 / Word Family",
    question: "The report provides a ______ comparison of the two products.",
    choices: ["detailed", "detail", "details", "detailing"],
    answer: "detailed",
    ja: "comparisonを修飾する形容詞が必要。detailed comparison = 詳細な比較。"
  },
  {
    category: "Part 7 / Business",
    question: "Employees are encouraged to proofread documents before submitting them.",
    choices: ["校正する", "延期する", "購入する", "取り替える"],
    answer: "校正する",
    ja: "proofread = 校正する。submit = 提出する。文書・メール系で頻出。"
  }
];

let activeQuestions = [...questions];
let index = 0;
let correct = Number(localStorage.getItem("toeicSprintCorrect") || 0);
let mistakes = JSON.parse(localStorage.getItem("toeicSprintMistakes") || "[]");
let locked = false;

const $ = (id) => document.getElementById(id);
const progress = $("progress");
const correctCount = $("correctCount");
const barFill = $("barFill");
const category = $("category");
const question = $("question");
const choices = $("choices");
const result = $("result");
const card = $("card");

function render() {
  locked = false;
  if (index >= activeQuestions.length) {
    showFinish();
    return;
  }
  const q = activeQuestions[index];
  progress.textContent = `${index + 1} / ${activeQuestions.length}`;
  correctCount.textContent = correct;
  barFill.style.width = `${(index / activeQuestions.length) * 100}%`;
  category.textContent = q.category;
  question.textContent = q.question;
  result.classList.add("hidden");
  result.innerHTML = "";
  choices.innerHTML = "";
  q.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = choice;
    btn.onclick = () => answer(choice, btn);
    choices.appendChild(btn);
  });
}

function answer(choice, btn) {
  if (locked) {
    next();
    return;
  }
  locked = true;
  const q = activeQuestions[index];
  const isCorrect = choice === q.answer;
  document.querySelectorAll(".choice").forEach((b) => {
    if (b.textContent === q.answer) b.classList.add("correct");
  });
  if (!isCorrect) {
    btn.classList.add("wrong");
    if (!mistakes.includes(q.question)) mistakes.push(q.question);
  } else {
    correct += 1;
  }
  localStorage.setItem("toeicSprintCorrect", String(correct));
  localStorage.setItem("toeicSprintMistakes", JSON.stringify(mistakes));
  correctCount.textContent = correct;
  result.classList.remove("hidden");
  result.innerHTML = `<strong>${isCorrect ? "正解" : "不正解"}</strong><br>答え：${q.answer}<br>${q.ja}<br><small>画面をタップすると次へ進みます。</small>`;
}

function next() {
  if (!locked) return;
  index += 1;
  render();
}

function showFinish() {
  barFill.style.width = "100%";
  progress.textContent = `完了`;
  question.textContent = "Sprint 完了！";
  category.textContent = "Result";
  choices.innerHTML = "";
  result.classList.remove("hidden");
  result.innerHTML = `今回の正解数：<strong>${correct}</strong><br>間違えた問題は「復習」ボタンから再挑戦できます。`;
}

card.addEventListener("click", (event) => {
  if (event.target.classList.contains("choice")) return;
  next();
});

$("againBtn").onclick = () => {
  const mistakeSet = new Set(mistakes);
  activeQuestions = questions.filter(q => mistakeSet.has(q.question));
  if (activeQuestions.length === 0) activeQuestions = [...questions];
  index = 0;
  render();
};

$("resetBtn").onclick = () => {
  correct = 0;
  mistakes = [];
  localStorage.removeItem("toeicSprintCorrect");
  localStorage.removeItem("toeicSprintMistakes");
  activeQuestions = [...questions];
  index = 0;
  render();
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").catch(() => {});
}

render();
