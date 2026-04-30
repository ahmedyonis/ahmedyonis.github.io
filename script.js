const pageFlip = new St.PageFlip(
    document.getElementById("book"),
    {
        width: 400,
        height: 500,
        size: "fixed",
        showCover: true, // دي اللي بتفرق الغلاف
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

const book = document.getElementById("book");

book.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (e.deltaY > 0) {
        pageFlip.flipNext();
    } else {
        pageFlip.flipPrev();
    }

    setTimeout(() => {
    isScrolling = false;}, 1000);

}, { passive: false });