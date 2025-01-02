document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll(".TopCategoriesGroup");

    containers.forEach(container => {
        const items = Array.from(container.children);
        let currentIndex = 0;
        let isWrapped = false;

        const totalItemsWidth = items.reduce((total, item) => total + item.offsetWidth, 0);
        const containerWidth = container.offsetWidth;

        if (totalItemsWidth <= containerWidth) {
            return;
        }
        items.forEach((item, index) => {
            item.style.transform = `translateX(${index * 40}%)`;
            item.style.transition = "transform 0.5s ease-in-out";
        });

        function autoplay() {
            currentIndex++;
            items.forEach((item, index) => {
                item.style.transform = `translateX(${(index - currentIndex) * 40}%)`;
            });

            if (currentIndex >= items.length) {
                currentIndex = 0;
                items.forEach((item, index) => {
                    item.style.transition = "none";
                    item.style.transform = `translateX(${index * 40}%)`;
                });

                setTimeout(() => {
                    items.forEach((item) => {
                        item.style.transition = "transform 0.5s ease-in-out";
                    });
                }, 100);
            }
        }

        let autoplayInterval = setInterval(autoplay, 1500);

        window.myFunc = function () {
            const buttonIcon = document.querySelector(".view-all-btn i");
            if (isWrapped) {
                container.style.transition = "flex-wrap 0.5s ease-in-out";
                container.style.flexWrap = "nowrap";
                items.forEach((item, index) => {
                    item.style.transform = `translateX(${index * 40}%)`;
                });
                autoplayInterval = setInterval(autoplay, 1500);
                buttonIcon.style.transform = "rotate(0deg)";
            } else {
                clearInterval(autoplayInterval);
                container.style.transition = "flex-wrap 0.5s ease-in-out";
                container.style.flexWrap = "wrap";
                items.forEach(item => {
                    item.style.transform = "none";
                });
                buttonIcon.style.transform = "rotate(90deg";
            }
            isWrapped = !isWrapped;
        };
    });
});

let SHEET_ID = '1-js-_NciE-3AnUl2ySxMiUeBtAnRFoCtWIutJQvAgoE';
let SHEET_TITLE = 'Products';
let SHEET_RANGE = 'Products!A:F';

let FULL_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE;
async function main() {
    const res = await fetch(FULL_URL);
    const text = await res.text();
    const data = JSON.parse(text.substring(47).slice(0, -2))
        .table.rows.map(row => row.c.map(cell => cell?.v || null));
    console.log(data);
}

main();
