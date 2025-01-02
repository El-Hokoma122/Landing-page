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

