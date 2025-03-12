document.addEventListener("DOMContentLoaded", function () {
    updateVisitorCount();
});

// 📌 메뉴 전환 기능 (선택한 페이지만 표시)
function showPage(pageId) {
    let pages = document.querySelectorAll(".page");
    pages.forEach(page => page.classList.remove("active"));
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

    input = input.replace(/×/g, "*").replace(/÷/g, "/"); // 특수 기호 변환

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

// 📌 방문자 카운트 기능
function updateVisitorCount() {
    let today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
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
