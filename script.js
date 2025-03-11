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
function calculate() {
    let input = document.getElementById("calcInput").value;
    try {
        let result = eval(input);
        document.getElementById("calcResult").innerText = `결과: ${result}`;
    } catch (error) {
        alert("올바른 계산식을 입력하세요.");
    }
}

// 📌 타이머 기능
let timerInterval;
function startTimer() {
    let seconds = parseInt(document.getElementById("timerInput").value);
    if (isNaN(seconds) || seconds <= 0) {
        alert("올바른 시간을 입력하세요.");
        return;
    }

    clearInterval(timerInterval);
    document.getElementById("timerDisplay").innerText = `${seconds}초 남았습니다.`;

    timerInterval = setInterval(() => {
        seconds--;
        document.getElementById("timerDisplay").innerText = `${seconds}초 남았습니다.`;
        if (seconds <= 0) {
            clearInterval(timerInterval);
            document.getElementById("timerDisplay").innerText = "⏳ 타이머 종료!";
        }
    }, 1000);
}

// 📌 메뉴 클릭 시 페이지 전환
function showPage(pageId) {
    let pages = document.querySelectorAll(".page");
    pages.forEach(page => page.style.display = "none");

    document.getElementById(pageId).style.display = "block";
}

// 초기 페이지 설정 (D-day 계산기)
showPage("dday");
