const cardsContainer = document.getElementsByClassName("top__cards")[0];

const spinner = document.getElementsByClassName("spinner")[0];
function showSpinner(isWanted) {
  if (isWanted) {
    spinner.style.display = "inline-block";
  } else {
    spinner.style.display = "none";
  }
}
function getProducts() {
  try {
    fetch("http://localhost:3000/api/creators")
      .then((res) => res.json())
      .then((data) => {
        showSpinner(true);

        fillCard(data);
        showSpinner(false);
      });
  } catch (error) {
  } finally {
    showSpinner(false);
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
