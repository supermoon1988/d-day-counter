// SEO 최적화: 인기 키워드를 활용한 제목, 메타 태그, 해시태그 반영
document.addEventListener("DOMContentLoaded", function () {
    // 인기 키워드 배열 (필요에 따라 업데이트)
    const keywords = ["디데이 계산기", "D-day 카운트다운", "기념일 계산", "연애 디데이"];
    
    // 1. 사이트 제목 업데이트: 랜덤 키워드를 선택해 제목에 반영
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    document.title = `${randomKeyword} - 나만의 디데이 도구`;
    
    // 2. 메타 태그 업데이트: SEO를 위한 meta 키워드 설정 (구글은 meta keywords를 크게 반영하지 않지만, 다른 검색엔진이나 SNS 미리보기에 도움이 될 수 있음)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords.join(", ");
    
    // 3. 해시태그 영역 업데이트: HTML에 id="hashtagContainer" 요소가 있을 경우, 인기 키워드를 해시태그 형태로 표시
    const hashtagContainer = document.getElementById("hashtagContainer");
    if (hashtagContainer) {
      const hashtags = keywords.map(keyword => "#" + keyword.replace(/\s/g, ""));
      hashtagContainer.innerText = hashtags.join(" ");
    }
  });  
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
    // 날짜 입력 형식 검증: 연도는 4자리여야 함
    let parts = dateInput.split("-");
    if (parts[0].length !== 4) {
        document.getElementById("result").innerText = "연도는 4자리여야 합니다.";
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

// ★ 몇째 되는 날 계산 기능
function calculateOrdinalDay() {
    let dateInput = document.getElementById("dateInput").value;
    if (!dateInput) {
        document.getElementById("ordinalResult").innerText = "시작 날짜를 선택해주세요.";
        return;
    }
    // 날짜 입력 형식 검증: 연도는 4자리여야 함
    let parts = dateInput.split("-");
    if (parts[0].length !== 4) {
        document.getElementById("ordinalResult").innerText = "연도는 4자리여야 합니다.";
        return;
    }
    let startDate = new Date(dateInput);
    if (isNaN(startDate.getTime())) {
        document.getElementById("ordinalResult").innerText = "유효한 날짜를 입력해주세요.";
        return;
    }
    let ordinal = parseInt(document.getElementById("ordinalInput").value, 10);
    if (isNaN(ordinal) || ordinal <= 0) {
        document.getElementById("ordinalResult").innerText = "올바른 순번을 입력해주세요.";
        return;
    }
    // 시작 날짜를 1일째로 간주 (즉, n번째 날 = 시작 날짜에서 n-1일 후)
    let targetDate = new Date(startDate);
    targetDate.setDate(targetDate.getDate() + (ordinal - 1));
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
    let day = targetDate.getDate();
    document.getElementById("ordinalResult").innerText = `${ordinal}째 되는 날은 ${year}년 ${month}월 ${day}일 입니다.`;
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
function updateVisitorCount() {
    let today = new Date().toISOString().split("T")[0];
    let storedDate = localStorage.getItem("lastVisitDate");
    let todayCount = parseInt(localStorage.getItem("todayCount") || "0", 10);
    let totalCount = parseInt(localStorage.getItem("totalCount") || "0", 10);

    if (storedDate !== today) {
        // 새로운 날이면 todayCount를 0으로 초기화하고 날짜 업데이트
        todayCount = 0;
        localStorage.setItem("lastVisitDate", today);
    }
    // 페이지 방문 시마다 todayCount와 totalCount 증가
    todayCount++;
    totalCount++;

    localStorage.setItem("todayCount", todayCount);
    localStorage.setItem("totalCount", totalCount);

    document.getElementById("todayCount").innerText = todayCount;
    document.getElementById("totalCount").innerText = totalCount;
}
