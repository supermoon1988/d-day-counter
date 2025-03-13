document.addEventListener("DOMContentLoaded", function () {
    updateVisitorCount();
});

// 📌 메뉴 전환 기능 (선택한 페이지만 표시)
function showPage(pageId) {
    let pages = document.querySelectorAll(".page");
    pages.forEach(page => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}

// 📌 계산기 기능 (×, ÷ 변환)
function calculate() {
    let input = document.getElementById("calcInput").value.trim();
    if (!input) return;

    input = input.replace(/×/g, "*").replace(/÷/g, "/"); // 특수 기호 변환

    try {
        let result = eval(input);
        document.getElementById("calcInput").value = result;
    } catch {
        alert("올바른 계산식을 입력하세요.");
    }
}

// 📌 원형 타이머 기능 (매끄러운 감소)
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

// 📌 방문자 카운트 기능
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
