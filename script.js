document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-list a");
  const content = document.getElementById("content");

  // 공통 로딩 함수
  async function loadPage(page) {
    try {
      const response = await fetch(page);
      if (!response.ok) throw new Error("404 Not Found");

      const html = await response.text();
      content.innerHTML = html;
    } catch (err) {
      content.innerHTML = "<p>페이지를 불러오는 데 실패했습니다.</p>";
    }
  }

  // 메뉴 링크 클릭
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      if (page) {
        loadPage(page);
      }
    });
  });

  // 카드 클릭은 이벤트 위임으로 처리
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card && card.hasAttribute("data-detail")) {
      const detailPage = card.getAttribute("data-detail");
      loadPage(detailPage); // main에 detail 페이지 로드
    }
  });

});
