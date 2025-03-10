// D-day 계산 함수
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
    
    // 날짜 저장 (LocalStorage 사용)
    localStorage.setItem("savedDate", inputDate);
}

// 페이지 로드 시 저장된 날짜 불러오기
window.onload = function() {
    let savedDate = localStorage.getItem("savedDate");
    if (savedDate) {
        document.getElementById("dateInput").value = savedDate;
        calculateDday();
    }
};

// 공유 기능
function shareDday() {
    let inputDate = document.getElementById("dateInput").value;
    if (!inputDate) {
        alert("날짜를 선택해주세요!");
        return;
    }
    
    let url = `${window.location.origin}${window.location.pathname}?date=${inputDate}`;
    navigator.clipboard.writeText(url).then(() => {
        alert("링크가 클립보드에 복사되었습니다!\n" + url);
    });
}
