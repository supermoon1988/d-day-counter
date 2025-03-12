document.addEventListener("DOMContentLoaded", function () {
    // 📌 메뉴 전환 기능 (버튼 클릭 시 작동)
    document.querySelectorAll(".sidebar ul li a").forEach(link => {
        link.addEventListener("click", function () {
            let pageId = this.getAttribute("data-page");
            showPage(pageId);
        });
    });

    // 📌 D-day 계산 이벤트 연결
    document.getElementById("ddayBtn").addEventListener("click", calculateDday);

    // 📌 타이머 시작 이벤트 연결
    document.getElementById("timerBtn").addEventListener("click", startTimer);

    // 📌 계산기 엔터키 이벤트 연결
    document.getElementById("calcInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            calculate();
        }
    });
});

// 📌 메뉴 전환 함수
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

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
    let input = document.getElementById("calcInput").value.trim();
    if (!input) return;

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

// 📌 타이머 기능
let timerInterval;
function startTimer() {
    let seconds = parseFloat(document.getElementById("timerInput").value);
    if (isNaN(seconds) || seconds <= 0) {
        alert("올바른 시간을 입력하세요.");
        return;
    }

    let totalTime = seconds;
    clearInterval(timerInterval);

    function updateTimer() {
        let progress = (seconds / totalTime) * 100;
        document.getElementById("progressBar").style.width = progress + "%";
        document.getElementById("timerDisplay").innerText = `${seconds.toFixed(2)}초 남았습니다.`;

        if (seconds <= 0) {
            clearInterval(timerInterval);
            document.getElementById("timerDisplay").innerText = "⏳ 타이머 종료!";
            document.getElementById("progressBar").style.width = "0%";
        } else {
            seconds -= 0.01;
        }
    }

    timerInterval = setInterval(updateTimer, 10);
    updateTimer();
}
