const cardContainer = document.querySelector(".discover__cards");
const searchInput = document.getElementsByClassName("search__bar__input")[0];
const loadingCards = document.getElementsByClassName("card is-loading");

let skip = 0;
let skipStr = 0;
const pageSize = 6;
let searchString = "";

function getNfts() {
  try {
    fetchNfts(skip);
  } catch (error) {
    console.error(error);
  }
}

function fetchNfts(skip) {
  fetch(`http://localhost:3000/api/nfts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      skip: skip,
      pageSize: pageSize,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      fillArtistPage(data);
      data &&
        Array.from(loadingCards).forEach((element) => {
          element.style.display = "none";
        });
    })
    .finally(() => {});
}
let id = 0;

searchInput.addEventListener("keyup", (e) => {
  clearTimeout(id);
  id = setTimeout(() => {
    searchString = e.target.value;
    fetchNftsforString(skipStr, searchString);
  }, 2000);
});
function fetchNftsforString(skip, searchString) {
  fetch(`http://localhost:3000/api/nfts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      skip: skip,
      pageSize: pageSize,
      searchStr: searchString,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      cardContainer.innerHTML = "";
      fillArtistPage(data);
    })
    .finally(() => {});
}

function fillArtistPage(data) {
  if (!data.hasMore) {
    document.querySelector(".load-more").disabled = true;
  }

  data.nfts.forEach((nft) => {
    const card = document.createElement("a");
    card.classList.add("discover__cards__card");
    card.innerHTML = `
      <img class="discover__cards__card__img" src="../../../../${nft.imgPath}" alt="" />
      <div class="discover__cards__card__content">
        <h5 class="heading-fifth-work">${nft.name}</h5>
        <div class="discover__cards__card__content__dancer">
          <img src="../../../../${nft.creator?.profileImgPath}" alt="" />
          <span class="base-mono">${nft.creator?.name}</span>
        </div>
        <div class="discover__cards__card__content__records">
          <div class="discover__cards__card__content__records__price">
            <p class="caption-mono col-grey">Price</p>
            <p class="base-mono">${nft.price?.value} ${nft.price?.currency}</p>
          </div>
          <div class="discover__cards__card__content__records__high">
            <p class="caption-mono col-grey">Highest Bid</p>
            <p class="base-mono">${nft.highestBid?.value} ${nft.highestBid?.currency}</p>
          </div>
        </div>
      </div>
    `;

    cardContainer.appendChild(card);
  });

  skip += pageSize;
}

document.querySelector(".load-more").addEventListener("click", () => {
  fetchNfts(skip);
});

getNfts();
