document.addEventListener("DOMContentLoaded", function () {
    updateVisitorCount();
});

// 메뉴 전환 기능 (선택한 페이지만 표시)
function showPage(pageId) {
    let pages = document.querySelectorAll(".page");
    pages.forEach(page => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}

// ★ D-day 계산기 기능
function calculateDday() {
    let dateInput = document.getElementById("dateInput").value;
    if (!dateInput) {
        document.getElementById("result").innerText = "날짜를 선택해주세요.";
        return;
    }
    let selectedDate = new Date(dateInput);
    let today = new Date();
    // 시간 부분을 제거하여 날짜만 비교
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    let diffTime = selectedDate.getTime() - today.getTime();
    let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    let resultText = "";
    if (diffDays > 0) {
         resultText = `D-${diffDays}`;
    } else if (diffDays === 0) {
         resultText = "D-Day입니다!";
    } else {
         resultText = `D+${Math.abs(diffDays)}`;
    }
    document.getElementById("result").innerText = resultText;
}

// ★ 계산기 기능

// 입력란에 값 추가
function appendCalc(value) {
    document.getElementById("calcInput").value += value;
}

// 입력란 초기화
function clearCalc() {
    document.getElementById("calcInput").value = "";
}

// 계산 및 히스토리 업데이트
function calculate() {
    let calcInputElem = document.getElementById("calcInput");
    let input = calcInputElem.value.trim();
    if (!input) return;
    let originalInput = input;
    // 특수 기호 변환: '×' -> '*', '÷' -> '/'
    input = input.replace(/×/g, "*").replace(/÷/g, "/");
    try {
        let result = eval(input);
        calcInputElem.value = result;
        // 계산 내역 기록 추가
        let historyElem = document.getElementById("calcHistory");
        let li = document.createElement("li");
        li.textContent = originalInput + " = " + result;
        historyElem.prepend(li);
    } catch (e) {
        alert("올바른 계산식을 입력하세요.");
    }
}

// ★ 원형 타이머 기능 (기존 코드)
let timerInterval;
function startTimer() {
    let seconds = parseFloat(document.getElementById("timerInput").value);
    let totalTime = seconds;
    if (isNaN(seconds) || seconds <= 0) return;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        let progress = (seconds / totalTime) * 314;
        document.getElementById("progressCircle").style.strokeDashoffset = progress;
        document.getElementById("timerDisplay").innerText = `${seconds.toFixed(2)}초 남았습니다.`;

        if (seconds <= 0) clearInterval(timerInterval);
        else seconds -= 0.01;
    }, 10);
}

// ★ 방문자 카운트 기능 (기존 코드)
function updateVisitorCount() {
    let today = new Date().toISOString().split("T")[0];
    let lastVisit = localStorage.getItem("lastVisitDate");

    if (lastVisit !== today) {
        localStorage.setItem("lastVisitDate", today);
        let todayCount = parseInt(localStorage.getItem("todayCount") || "0") + 1;
        localStorage.setItem("todayCount", todayCount);
    }

    let totalCount = parseInt(localStorage.getItem("totalCount") || "0") + 1;
    localStorage.setItem("totalCount", totalCount);

    document.getElementById("todayCount").innerText = localStorage.getItem("todayCount");
    document.getElementById("totalCount").innerText = localStorage.getItem("totalCount");
}
