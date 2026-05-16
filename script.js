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


const names = ["Angular", "Laravel", "MySQL"];
let nameIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isHovered = false;

const textElement = document.getElementById("text");
const container = document.getElementById("text-container");

const TYPE_SPEED = 150;
const DELETE_SPEED = 100;
const PAUSE_AFTER_WRITE = 2000;

function type() {
    const currentName = names[nameIndex];

    if (isDeleting) {
        textElement.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? DELETE_SPEED : TYPE_SPEED;


    if (!isDeleting && charIndex === currentName.length) {
        if (isHovered) {
            return;
        }
        speed = PAUSE_AFTER_WRITE;
        isDeleting = true;
    }

    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
    }

    setTimeout(type, speed);
}


container.addEventListener("mouseenter", () => {
    isHovered = true;
});

container.addEventListener("mouseleave", () => {
    isHovered = false;
    // لو كان واقف بعد ما كتب الاسم، نكمل دورة المسح فوراً
    if (!isDeleting && charIndex === names[nameIndex].length) {
        isDeleting = true;
        type();
    }
});

type();
