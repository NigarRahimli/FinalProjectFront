const cardsContainer = document.getElementsByClassName("top__cards")[0];
const loader = document.getElementsByClassName("scene")[0];
const home = document.getElementById("home");
const homeSections = document.getElementsByTagName("section");
const header = document.getElementsByTagName("header")[0];
const footer = document.getElementsByTagName("footer")[0];
loader.style.display = "none";
function showLoader(isLoaded) {
  if (isLoaded) {
    loader.style.display = "initial";

    footer.style.display = "none";
    header.style.display = "none";

    Array.from(homeSections).forEach((element) => {
      element.style.opacity = "0";
      element.style.visibility = "none;";
    });
  } else {
    loader.style.display = "none";
    Array.from(homeSections).forEach((element) => {
      element.style.opacity = "1";
      element.style.visibility = "visible;";
    });
    footer.style.display = "initial";
    header.style.display = "block";
  }
}

function getProducts() {
  try {
    showLoader(true);
    fetch("http://localhost:3000/api/creators")
      .then((res) => res.json())
      .then((data) => {
        fillCard(data);
      });
  } catch (error) {
  } finally {
    setTimeout(() => showLoader(false), 5000);
  }
}
getProducts();

function fillCard(data) {
  data.sort((a, b) => a.id - b.id);
  data.forEach((c) => {
    let card = document.createElement("a");
    card.addEventListener("click", () => {
      window.open(
        `http://127.0.0.1:5500/client/public/pages/Artist/?artist_id=${c.id}`,
        "_self"
      );
    });
    card.className = "top__cards__card";
    card.innerHTML += `
<img
class="top__cards__card__img"
src="../../../../${c.profileImgPath}
"
alt=""
/>
<div class="top__cards__card__content">
<h5 class="top__cards__card__content__heading heading-fifth-work">
${c.name}
</h5>
<span class="top__cards__card__content__total base-work"
  >Total Sales:
</span>
<span class="base-mono">${c.totalSale?.value} ${c.totalSale?.currency}  </span>
<span class="top__cards__card__content__rank base-mono">
  <h1>${c.id}</h1>
</span>
</div>

`;
    cardsContainer.appendChild(card);

    //   goDetailBtn.addEventListener("click", () => {
    //     window.open(
    //       `http://127.0.0.1:5500/JS---DOM-Add-to-Basket-/product-detail/?product_id=${p.id}`,
    //       "_self"
    //     );
    //   });
  });
}
