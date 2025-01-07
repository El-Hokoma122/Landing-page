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
    const categoryId = row[0].replace(/\s+/g, '-').toLowerCase();
    const categoryClass = `category-${categoryId}`;

    div.classList.add('Category', categoryClass);
    div.setAttribute('id', categoryId); 

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
    
    
    carsourl[0].src = data[0][5];
    carsourl[1].src = data[1][5];
    carsourl[2].src = data[2][5];
    container.appendChild(fragment);
    initializeSliders();

document.getElementById("input").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const allCategories = document.querySelectorAll(".Category");
    const allSections = document.querySelectorAll(".main-content");
    const noResultsMessage = document.getElementById("no-results"); 

    let hasMatchingProducts = false;

    allSections.forEach(section => {
        const productsInSection = section.querySelectorAll(".Category");
        let hasVisibleProducts = false;

        productsInSection.forEach(product => {
            const title = product.querySelector(".category-title").textContent.toLowerCase();
            if (title.includes(searchText)) {
                product.style.display = "block"; 
                hasVisibleProducts = true;
                hasMatchingProducts = true;
            } else {
                product.style.display = "none";
            }
        });

        if (hasVisibleProducts) {
            section.style.display = "block"; 
        } else {
            section.style.display = "none";
        }
    });

   
    if (!hasMatchingProducts) {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
    }
});

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

        buttonIcon.style.transform = "rotate(0deg)";
    }
    container.dataset.isWrapped = !isWrapped;
}