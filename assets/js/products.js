const getProducts = async (page) => {
    try {
        document.querySelector(".loading").classList.remove("d-none");

        const skip = (page - 1) * 10;
        const { data } = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);

        return data;
    } catch (e) {
        console.error(e);
        return { products: [], total: 0 };
    }
};

const displayProducts = async (page = 1) => {
    document.querySelector(".loading").classList.remove("d-none");

    const data = await getProducts(page);
    const numberOfPages = Math.ceil(data.total / 10);
    const products = data.products;

    const result = products.map((product) =>
        `
        <div class="product">
            <img src="${product.thumbnail}" class='product-image' loading="lazy">
            <h2>${product.title}</h2>
            <div class="spacer"></div>
            <p class="price">Price $${product.price}</p>
            <button class="btnAdd">Add to Cart</button>
        </div>
        `
    ).join("");

    document.querySelector(".products .row").innerHTML = result;
    let paginationLink = `<li><button ${page === 1 ? "disabled" : `onclick="changePage(${page - 1})"`}>&lt;</button></li>`;

    const createPageButton = (pageNumber, isActive = false) =>
        `<li><button class="num ${isActive ? 'active' : ''}" onclick="changePage(${pageNumber})">${pageNumber}</button></li>`;

    if (numberOfPages <= 7) {
        for (let i = 1; i <= numberOfPages; i++) {
            paginationLink += createPageButton(i, i === page);
        }
    } else {
        paginationLink += createPageButton(1, page === 1);
        if (page > 3) paginationLink += `<li>...</li>`; 

        let start = Math.max(2, page - 1);
        let end = Math.min(numberOfPages - 1, page + 1);
        for (let i = start; i <= end; i++) {
            paginationLink += createPageButton(i, i === page);
        }

        if (page < numberOfPages - 2) paginationLink += `<li>...</li>`; 
        paginationLink += createPageButton(numberOfPages, page === numberOfPages);
    }
    paginationLink += `<li><button ${page === numberOfPages ? "disabled" : `onclick="changePage(${page + 1})"`}>&gt;</button></li>`;
    document.querySelector(".pagination").innerHTML = paginationLink;
    const images = document.querySelectorAll(".product-image");
    let loadedImages = 0;

    images.forEach((img) => {
        img.onload = () => {
            loadedImages++;
            if (loadedImages === images.length) {
                document.querySelector(".loading").classList.add("d-none");
            }
        };
    });

    if (images.length === 0) {
        document.querySelector(".loading").classList.add("d-none");
    }

    customModel();
};


const changePage = async (page) => {
    document.querySelector(".loading").classList.remove("d-none"); // Show loading indicator
    await displayProducts(page);
};

displayProducts(); 
function customModel() {
    const model = document.querySelector(".my-model");
    const closeBtn = document.querySelector(".close-btn");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const images = Array.from(document.querySelectorAll(".product-image"));
    let currentIndex = 0;

    images.forEach((img) => {
        img.addEventListener("click", (e) => {
            model.classList.remove("d-none");
            model.querySelector("img").setAttribute("src", e.target.src);
            currentIndex = images.indexOf(e.target);
        });
    });

    closeBtn.addEventListener("click", () => {
        model.classList.add("d-none");
    });

    rightBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        model.querySelector("img").setAttribute("src", images[currentIndex].getAttribute("src"));
    });

    leftBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        model.querySelector("img").setAttribute("src", images[currentIndex].getAttribute("src"));
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % images.length;
            model.querySelector("img").setAttribute("src", images[currentIndex].getAttribute("src"));
        } else if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            model.querySelector("img").setAttribute("src", images[currentIndex].getAttribute("src"));
        } else if (e.key === "Escape") {
            model.classList.add("d-none");
        }
    });
}
