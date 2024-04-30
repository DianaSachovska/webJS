document.addEventListener("DOMContentLoaded", function () {
  const catalogLink = document.getElementById("catalogLink");
  const categoriesDiv = document.getElementById("categories");
  const contentDiv = document.getElementById("content");

  let categoriesData;

  function loadCategory(categoryShortname) {
    contentDiv.innerHTML = "";
    if (categoryShortname === "specials") {
      const randomIndex = Math.floor(
        Math.random() * (categoriesData.length - 1)
      );
      const randomProduct = categoriesData[randomIndex];
      fetch(`api/${randomProduct.shortname}.json`)
        .then((response) => response.json())
        .then((data) => {
          renderData(data);
        });
    } else {
      fetch(`api/${categoryShortname}.json`)
        .then((response) => response.json())
        .then((data) => {
          renderData(data);
        });
    }
  }
  function renderData(data) {
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = data.categoryName;
    contentDiv.appendChild(categoryTitle);

    data.products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.name;
      productDiv.appendChild(productImage);

      const productName = document.createElement("h3");
      productName.textContent = product.name;
      productDiv.appendChild(productName);

      const productDescription = document.createElement("p");
      productDescription.textContent = product.description;
      productDiv.appendChild(productDescription);

      const productPrice = document.createElement("p");
      productPrice.textContent = `Price: ${product.price}`;
      productDiv.appendChild(productPrice);

      contentDiv.appendChild(productDiv);
    });
  }

  function loadCatalog() {
    categoriesDiv.innerHTML = "";
    fetch("api/categories.json")
      .then((response) => response.json())
      .then((data) => {
        categoriesData = data;
        data.forEach((category) => {
          const categoryLink = document.createElement("span");
          categoryLink.classList.add("category");
          categoryLink.textContent = category.name;
          categoryLink.addEventListener("click", () =>
            loadCategory(category.shortname)
          );
          categoriesDiv.appendChild(categoryLink);
        });
      });
  }

  catalogLink.addEventListener("click", function (event) {
    event.preventDefault();
    loadCatalog();
  });
});
