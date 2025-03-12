console.log("Hello world from categories!");
const getCategories =async ()=> {
    try {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category");
    const {data}= await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
    return data;
    } catch(error){
        return [];
    }
}

const displayCategories = async ()=>{
    const products = await getCategories();
    if(products.length>0){ 
        
        const result= products.map((product) =>
            `
            <div class="product">
                <img src="${product.image}" alt="${product.title}" class="image">
                <h2 class="categoryTitle">${product.title}</h2>    
                <div class="spacer"></div>
                <p class="price">Price     $${product.price}</p>
                <button class="btnAdd">Add to Cart</button>
            </div>
            `
        ).join(" ");
        document.querySelector(".products .row").innerHTML=result;
        document.querySelector(".loading").classList.add("d-none");
    }else{
        console.log('test');
        document.querySelector(".products .row").innerHTML="<p> please try again later</p>";
    }
}

displayCategories();