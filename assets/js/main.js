
const getCategories =async ()=> {
    try {
    const { data } = await axios.get("https://fakestoreapi.com/products/categories");
    return data;
    }catch (e) {
        return [];
    }
}
const displayCategories = async ()=>{
    try{
    const categories = await getCategories();
    const result= categories.map((category) =>
        `
        <div class="category"> 
            <h2 class="categoryName"> 
                <a href="details.html?category=${category}" class="details"> ${category}</a>
            </h2>
        </div>
        `
).join(" ");
    document.querySelector(".categories .row").innerHTML=result;
}catch (e) {
    document.querySelector(".categories .row").innerHTML="<p>please try again later</p>"
}
}

const getProducts=async ()=>{
    try{
    const {data}= await axios.get(`https://fakestoreapi.com/products`);
    return data;
    }catch (e) {
        return [];
    }
}
const displayProducts = async ()=>{
    try{
    const products = await getProducts();
    const result= products.map((product) =>
        `
        <div class="product">
            <img src="${product.image}" alt="${product.title}" class="image">
            <h2 class="categoryTitle">${product.title}</h2>    
            <div class="spacer"></div>
            <p class="price">Price $${product.price}</p>
            <button class="btnAdd" >Add to Cart</button>
        </div>
        `).join('');
        console.log(result);
        document.querySelector(".allProducts .rowProducts").innerHTML=result;
        }catch (e) {
        document.querySelector(".allProducts .rowProducts").innerHTML="<p>please try again later</p>"
        }
}
const displayBestSeller = async ()=>{
    try {
    const products = await getProducts();
    const result= products.map((product) =>
        `
        <div class="product">
            <img src="${product.image}" alt="${product.title}" class="image">
            <h2 class="categoryTitle">${product.title}</h2>    
            <div class="spacer"></div>
            <p class="price">Price $${product.price}</p>
            <button class="btnAdd" >Add to Cart</button>
        </div>
        `).join('');
        document.querySelector(".bestSeller .rowProducts").innerHTML=result;
        } catch (e) {
        document.querySelector(".bestSeller .rowProducts").innerHTML="<p>please try again later</p>"
        }
}
displayBestSeller();
displayProducts();
displayCategories();