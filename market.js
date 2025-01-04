let SHEET_ID = '1-js-_NciE-3AnUl2ySxMiUeBtAnRFoCtWIutJQvAgoE';
let SHEET_TITLE = 'Products';
let SHEET_RANGE = 'Products!A:F';

let FULL_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE;
main();
async function main() {
    const res = await fetch(FULL_URL);
    const text = await res.text();
    const data = JSON.parse(text.substring(47).slice(0, -2))
        .table.rows.map(row => row.c.map(cell => cell?.v || null));

    function createCategoryElement(row) {
        const div = document.createElement('div');
        div.classList.add('Category');
        div.innerHTML = `
            <div class="category-item1">
                <div class="category-img">
                    <img class="img-overlay" src="${row[3]}" />
                </div>
                <div class="Rectangle15">
                    <p class="category-title">${row[0]}</p>
                    <div class="Line26"></div>
                    <p class="price">${row[2]} <span style="margin-left: auto;">${row[1]}</span></p>
                </div>
            </div>
        `;
        return div;
    }
        
    let mainClassTopCategoriesGroup = document.getElementById("TopCategoriesGroup");
    let container = document.getElementById("main");
    let carsourl = document.querySelectorAll('.carousel-item img');

    let fragment = document.createDocumentFragment();
    data.forEach((row) => {
        let category = row[4];
        let section;

        if (category === 'TopCategoriesGroup') {
            section = mainClassTopCategoriesGroup.querySelector('.TopCategoriesGroup1');
        } else {
            section = document.getElementById(category);

            if (!section) {
                section = createNewSection(category, container);
            }
        }

        if (section) {
            const element = createCategoryElement(row);
            section.querySelector('.TopCategoriesGroup').appendChild(element);
        }
    });
    console.log(data[0][7]);
    console.log(data[1][5]);
    console.log(data[2][5]);
    
    carsourl[0].src = data[0][5];
    carsourl[1].src = data[1][5];
    carsourl[2].src = data[2][5];
    container.appendChild(fragment);
    initializeSliders();
}

function createNewSection(category, container) {
    let newSection = document.createElement("div");
    newSection.classList.add("main-content");
    newSection.setAttribute("data-section", "section1");
    newSection.setAttribute("id", category);

    newSection.innerHTML = `
        <div class="title2">
            <span style="color: #666666; margin-bottom: 10px;">${category}</span>
            <button class="view-all-btn" data-section="section1" onclick="toggleViewAll('${category}')">
                <span>View All</span>
                <i class='bx bx-chevron-right'></i>
            </button>
            <div class="divider"></div>
        </div>
        <div class="TopCategoriesGroup"></div>
    `;
    container.appendChild(newSection); 
    initializeSliders(); 
    return newSection;
}

function initializeSliders() {
    const containers = document.querySelectorAll(".TopCategoriesGroup");

    containers.forEach(container => {
        const items = Array.from(container.children);
        let isWrapped = false;

        const totalItemsWidth = items.reduce((total, item) => total + item.offsetWidth, 0);
        const containerWidth = container.offsetWidth;

        const viewAllButtons = container.closest('.main-content').querySelectorAll('.view-all-btn');
        if (totalItemsWidth <= containerWidth) {
            viewAllButtons.forEach(button => {
                button.style.display = 'none';
            });
            return;
        } else {
            viewAllButtons.forEach(button => {
                button.style.display = 'flex';
            });
        }

        items.forEach((item, index) => {
            item.style.transform = `translateX(${index * 10}%)`;
            item.style.transition = "transform 0.5s ease-in-out";
        });

        container.dataset.isWrapped = !isWrapped;

        window[`toggleViewAll_${container.id}`] = function (button) {
            const section = button.closest('.main-content');
            const container = section.querySelector('.TopCategoriesGroup');
            const items = Array.from(container.children);
            const buttonIcon = button.querySelector("i");
            isWrapped = container.dataset.isWrapped === "true";

            if (isWrapped) {
                container.style.transition = "flex-wrap 0.5s ease-in-out";
                container.style.flexWrap = "wrap";
                items.forEach(item => {
                    item.style.transform = "none";
                });
                buttonIcon.style.transform = "rotate(90deg)";
            } else {
                container.style.transition = "flex-wrap 0.5s ease-in-out";
                container.style.flexWrap = "nowrap";
                items.forEach((item, index) => {
                    item.style.transform = `translateX(${index * 10}%)`;
                });
                buttonIcon.style.transform = "rotate(0deg)";
            }
            container.dataset.isWrapped = !isWrapped;
        };
    });
}

function toggleViewAll(category) {
    const section = document.getElementById(category);
    const container = section.querySelector('.TopCategoriesGroup');

    const items = Array.from(container.children);

    const buttonIcon = section.querySelector('.view-all-btn i');
    
    let isWrapped = container.dataset.isWrapped === "true";
    console.log(isWrapped);
    
    if (isWrapped) {
        container.style.transition = "flex-wrap 0.5s ease-in-out";
        container.style.flexWrap = "wrap";
        items.forEach(item => {
            item.style.transform = "none";
        });
        buttonIcon.style.transform = "rotate(90deg)";
    } else {
        container.style.transition = "flex-wrap 0.5s ease-in-out";
        container.style.flexWrap = "nowrap";
        items.forEach((item, index) => {
            item.style.transform = `translateX(${index * 10}%)`;
        });
        buttonIcon.style.transform = "rotate(0deg)";
    }
    container.dataset.isWrapped = !isWrapped;
}