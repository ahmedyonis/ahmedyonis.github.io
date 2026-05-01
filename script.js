const XY = document.querySelector("#book");

const pageFlip = new St.PageFlip(
    document.getElementById("book"),
    {
        // width: 400,
        // height: 500,
        width: XY.clientWidth,
        height: XY.clientHeight,
        size: "fixed",
        showCover: true,
        maxShadowOpacity: 0.5,
        mobileScrollSupport: true
    }
);

pageFlip.loadFromHTML(document.querySelectorAll(".page"));

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        pageFlip.flipNext();
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        pageFlip.flipPrev();
    }
});

let isScrolling = false;

const book = document.getElementById("book");
const navButtons = document.querySelectorAll(".nav-button");

book.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (e.deltaY > 0) {
        pageFlip.flipNext();
    } else {
        pageFlip.flipPrev();
    }

    isScrolling = true;

    setTimeout(() => {
        isScrolling = false;
    }, 1000);

}, { passive: false });

navButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const targetPage = Number(button.dataset.page);
        pageFlip.flip(targetPage);
    });
});
