// 📌 메뉴 전환 기능 수정 (버그 수정 완료)
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
