document.addEventListener("DOMContentLoaded", function () {
    updateVisitorCount();

    // 계산기: 입력 필드에 엔터키 이벤트 추가
    const calcInput = document.getElementById("calcInput");
    if (calcInput) {
        calcInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                calculate();
            }
        });
    }
});

// 로컬 날짜(YYYY-MM-DD) 문자열 반환 (UTC가 아닌 현지 시간 기준)
function getLocalDateString() {
    let d = new Date();
    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

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
    if (isNaN(selectedDate.getTime())) {
        document.getElementById("result").innerText = "유효한 날짜를 입력해주세요.";
        return;
    }
    let today = new Date();
    // 날짜만 비교하도록 시간 정보 제거
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    let diffTime = selectedDate.getTime() - today.getTime();
    let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    let resultText = "";
    if (diffDays > 0) {
         resultText = `${diffDays}일 남았습니다.`;
    } else if (diffDays === 0) {
         resultText = "오늘입니다.";
    } else {
         resultText = `${Math.abs(diffDays)}일 지났습니다.`;
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

// ★ 원형 타이머 기능 (수정된 종료 메시지)
let timerInterval;
function startTimer() {
    let seconds = parseFloat(document.getElementById("timerInput").value);
    if (isNaN(seconds) || seconds <= 0) return;
    let totalTime = seconds;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timerInterval);
            document.getElementById("timerDisplay").innerText = "끝났습니다";
            document.getElementById("progressCircle").style.strokeDashoffset = 0;
            return;
        }
        let progress = (seconds / totalTime) * 314;
        document.getElementById("progressCircle").style.strokeDashoffset = progress;
        document.getElementById("timerDisplay").innerText = `${seconds.toFixed(2)}초 남았습니다.`;
        seconds -= 0.01;
    }, 10);
}

// ★ 방문자 카운트 기능 (수정된 버전)
// 매번 페이지 로드 시 로컬 시간 기준 오늘 방문 수가 갱신됩니다.
function updateVisitorCount() {
    let today = getLocalDateString();
    let storedDate = localStorage.getItem("lastVisitDate");
    let todayCount = parseInt(localStorage.getItem("todayCount") || "0");
    let totalCount = parseInt(localStorage.getItem("totalCount") || "0");

    if (storedDate !== today) {
        // 새로운 날이면 todayCount를 1로 초기화하고 날짜 업데이트
        todayCount = 1;
        localStorage.setItem("lastVisitDate", today);
    } else {
        // 같은 날이면 todayCount 증가
        todayCount++;
    }
    totalCount++;

    localStorage.setItem("todayCount", todayCount);
    localStorage.setItem("totalCount", totalCount);

    document.getElementById("todayCount").innerText = todayCount;
    document.getElementById("totalCount").innerText = totalCount;
}
