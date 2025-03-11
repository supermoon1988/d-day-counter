// 📌 D-day 계산 기능
function calculateDday() {
    let inputDate = document.getElementById("dateInput").value;
    if (!inputDate) {
        alert("날짜를 선택해주세요!");
        return;
    }

    let today = new Date();
    let targetDate = new Date(inputDate);
    let diff = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

    document.getElementById("result").innerText = `D-day: ${diff}일 남았습니다!`;
}

// 📌 계산기 기능
let calcHistory = [];
function appendCalc(value) {
    document.getElementById("calcInput").value += value;
}

function clearCalc() {
    document.getElementById("calcInput").value = "";
}

function calculate() {
    let input = document.getElementById("calcInput").value;
    try {
        let result = eval(input);
        document.getElementById("calcInput").value = result;
        if (calcHistory.length >= 10) calcHistory.shift();
        calcHistory.push(`${input} = ${result}`);
        updateCalcHistory();
    } catch {
        alert("올바른 계산식을 입력하세요.");
    }
}

function updateCalcHistory() {
    let historyElement = document.getElementById("calcHistory");
    historyElement.innerHTML = "";
    calcHistory.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        historyElement.appendChild(li);
    });
}

// 📌 엔터 키 입력 지원
document.getElementById("calcInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") calculate();
});
