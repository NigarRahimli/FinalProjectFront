const cardsContainer = document.getElementsByClassName("top__cards")[0];
const error = document.getElementsByClassName("home-error")[0];
const spinner = document.getElementsByClassName("spinner")[0];

function showSpinner(isWanted) {
  spinner.style.display = isWanted ? "inline-block" : "none";
}

function showError(isWanted) {
  if (isWanted) {
    error.classList.remove("d-none");
  } else {
    error.classList.add("d-none");
  }
}

showError(false);

function getProducts() {
  showSpinner(true);

  fetch("https://nft-040z.onrender.com/api/creators")
    .then((res) => res.json())
    .then((data) => {
      fillCard(data);
    })
    .catch((err) => {
      showError(true);
    })
    .finally(() => {
      showSpinner(false);
    });
}

getProducts();

function fillCard(data) {
  data.sort((a, b) => a.id - b.id);
  data.forEach((c) => {
    let card = document.createElement("a");
    card.addEventListener("click", () => {
      window.open(`../Artist/?artist_id=${c.id}`, "_self");
    });
    card.className = "top__cards__card";
    card.innerHTML += `
      <img
        class="top__cards__card__img"
        src="../../../../${c.profileImgPath}"
        alt=""
      />
      <div class="top__cards__card__content">
        <h5 class="top__cards__card__content__heading heading-fifth-work">
          ${c.name}
        </h5>
        <span class="top__cards__card__content__total base-work">
          Total Sales:
        </span>
        <span class="base-mono">${c.totalSale?.value} ${c.totalSale?.currency}  </span>
        <span class="top__cards__card__content__rank base-mono">
          <h1>${c.id}</h1>
        </span>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}
