const user = document.getElementsByClassName("user")[0];
const cardContainer = document.getElementsByClassName("discover__cards")[0];
const created = document.getElementsByClassName(
  "states__category__number number"
)[0];
const favoriteNumber = document.getElementsByClassName(
  "states__category__number number"
)[1];
const states = document.getElementsByClassName("states__category");
const favoriteBar = document.getElementById("favorite-bar");
const createdBar = document.getElementById("created-bar");

Array.from(states).forEach((tab) => {
  tab.addEventListener("click", () => {
    Array.from(states).forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});
const loader = document.getElementsByClassName("scene")[0];

const artistSections = document.getElementsByTagName("section");

const header = document.getElementsByTagName("header")[0];
const footer = document.getElementsByTagName("footer")[0];

let searcParams = new URLSearchParams(window.location.search);

let paramsArtistId = searcParams.get("artist_id");

function showLoader(isLoaded) {
  if (isLoaded) {
    loader.style.display = "initial";

    footer.style.display = "none";
    header.style.display = "none";

    Array.from(artistSections).forEach((element) => {
      element.style.opacity = "0";
      element.style.visibility = "none;";
    });
  } else {
    loader.style.display = "none";
    Array.from(artistSections).forEach((element) => {
      element.style.opacity = "1";
      element.style.visibility = "visible;";
    });
    footer.style.display = "flex";
    header.style.display = "block";
  }
}
async function getArtist(id) {
  try {
    showLoader(true);
    const response = await fetch(`http://localhost:3000/api/creators/${id}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    fillArtistPage(data);
  } catch (error) {
    console.error(error);
    window.location.href = "../notFound/";
  } finally {
    setTimeout(() => showLoader(false), 3000);
  }
}

getArtist(paramsArtistId);

function fillArtistPage(data) {
  fillFavoriteNumber(data.id);
  let userInfo = document.createElement("div");
  userInfo.classList.add("user__info");
  userInfo.classList.add("container");
  userInfo.innerHTML += `
    <div class="user__info__avatar">
              <img
              class="user__info__avatar__img"
              src="../../../../${data.profileImgPath}"
              alt=""
            />
            </div>
              <div class="user__info__content">
                <div class="user__info__content__detail">
                  <h2 class="heading-second-work">${data.name}</h2>
                  <div class="user__info__content__detail__buttons">
                    <a  class="user__info__content__detail__buttons__copy secondary">
                      <img
                        class="user__info__content__detail__buttons__copy__icon"
                        src="../../imgs/icons/copy.svg"
                        alt=""
                      />
                      <p>${data.chainId.substring(
                        0,
                        6
                      )}...${data.chainId.substring(
    data.chainId.length - 4,
    data.chainId.length
  )} </p>
                    </a>
                    <a class="user__info__content__detail__buttons__follow secondary">
                      <img
                        class="user__info__content__detail__buttons__follow__icon"
                        src="../../imgs/icons/plus.svg"
                        alt=""
                      />
                      <p>Follow</p>
                    </a>
                  </div>
                </div>
                
                <div class="user__info__content__left">
                
                  <div class="user__info__content__left__count">
                    <div class="user__info__content__left__count__col">
                      <p class="user__info__content__left__count__col__number heading-fourth-mono">${data.volume.substring(
                        0,
                        data.volume.length - 3
                      )}k+</p>
                      <p class="user__info__content__left__count__col__value">
                        Volume
                      </p>
                    </div>
                    <div class="user__info__content__left__count__col">
                      <p class="user__info__content__left__count__col__number heading-fourth-mono">${
                        data.nftSold
                      }+</p>
                      <p class="user__info__content__left__count__col__value">
                        NFTs Sold
                      </p>
                    </div>
                    <div class="user__info__content__left__count__col">
                      <p class="user__info__content__left__count__col__number heading-fourth-mono">${
                        data.followers
                      }+</p>
                      <p class="user__info__content__left__count__col__value">
                        Followers
                      </p>
                    </div>
                  </div>
                  <div class="user__info__content__left__bio">
                    <h5 class="heading-fifth-mono">Bio</h5>
                    <p>${data.bio}</p>
                  </div>
                  <div class="user__info__content__left__link">
                    <h5 class="heading-fifth-mono">Links</h5>
                    <div class="user__info__content__left__link__icons">
                      <a href="./">
                        <img src="../../imgs/icons/internet.svg" alt=""
                      /></a>
                      <a href="./">
                        <img src="../../imgs/icons/dicord_logo.svg" alt=""
                      /></a>
                      <a href="./"
                        ><img src="../../imgs/icons/youtube_logo.svg" alt=""
                      /></a>
                      <a href="./">
                        <img src="../../imgs/icons/twitter_logo.svg" alt=""
                      /></a>
                      <a href="./"
                        ><img src="../../imgs/icons/instagram_logo.svg" alt=""
                      /></a>
                    </div>
                  </div>
                </div>
            
              </div>
    `;
  fillCreatedItems(data);
  user.appendChild(userInfo);
  const copyButton = document.getElementsByClassName(
    "user__info__content__detail__buttons__copy"
  )[0];
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(data.chainId);
    Toastify({
      text: `Copied to clipboard`,
      duration: 1000,
      gravity: "top",
      position: "right",
      style: {
        fontFamily: "Work Sans",
        background: "linear-gradient(128deg, #a259ff 49.75%, #377df7 136.56%)",
      },
    }).showToast();
  });

  created.textContent = data.nfts.length;

  function fillCreatedItems(data) {
    cardContainer.innerHTML = "";
    data.nfts?.forEach((nft) => {
      const favorite = cardContainer.getElementsByClassName("favorite-artist");
      let favoriteItems = getFavoriteItems();
      let isFav = favoriteItems.some(
        (favoriteItem) => favoriteItem.item.id === nft.id
      );

      cardContainer.innerHTML += `
        <a  class="discover__cards__card">
        <img
          class="discover__cards__card__img"
          src="../../../../${nft.imgPath}"
          alt=""
        />
        <img
          class="favorite-artist"
          src="../../imgs/icons/${
            isFav ? "heart-full.svg" : "heart-regular.svg"
          }"
          alt=""
        />
        <div class="discover__cards__card__content">
          <h5 class="heading-fifth-work">${nft.name}</h5>
          <div class="discover__cards__card__content__dancer">
            <img src="../../../../${data.profileImgPath}" alt="" />
            <span class="base-mono">${data.name}</span>
          </div>
          <div class="discover__cards__card__content__records">
            <div class="discover__cards__card__content__records__price">
              <p class="caption-mono col-grey">Price</p>
              <p class="base-mono">${nft.price?.value} ${
        nft.price?.currency
      }</p>
            </div>
            <div class="discover__cards__card__content__records__high">
              <p class="caption-mono col-grey">Highest Bid</p>
              <p class="base-mono">${nft.highestBid?.value} ${
        nft.highestBid?.currency
      }</p>
            </div>
          </div>
        </div>
      </a>
    
        `;
      Array.from(favorite).forEach((element, index) => {
        element.addEventListener("click", (event) => {
          favoriteItems = getFavoriteItems();
          let isFav = favoriteItems.some(
            (favoriteItem) => favoriteItem.item.id === nft.id
          );

          event.stopPropagation();

          if (addFavoriteItem(data.nfts[index], data.index)) {
            event.target.src = "../../imgs/icons/heart-full.svg";
          }
        });
      });
    });
  }
  function fillFavoriteItems(favoriteItems) {
    cardContainer.innerHTML = "";
    if (favoriteItems.length == 0) {
      cardContainer.innerHTML = `<h1 class="heading-fifth-mono">Nothing here yet</h1>`;
    }
    favoriteItems.forEach((nft) => {
      cardContainer.innerHTML += `
    <a  class="discover__cards__card">
    <img
      class="discover__cards__card__img"
      src="../../../../${nft.item.imgPath}"
      alt=""
    />
    <img
      class="favorite-artist artist-remove"
      src="../../imgs/icons/heart-full.svg"
      alt=""
    />
    <div class="discover__cards__card__content">
      <h5 class="heading-fifth-work">${nft.item.name}</h5>
      <div class="discover__cards__card__content__dancer">
        <img src="../../../../${data.profileImgPath}" alt="" />
        <span class="base-mono">${data.name}</span>
      </div>
      <div class="discover__cards__card__content__records">
        <div class="discover__cards__card__content__records__price">
          <p class="caption-mono col-grey">Price</p>
          <p class="base-mono">${nft.item.price?.value} ${nft.item.price?.currency}</p>
        </div>
        <div class="discover__cards__card__content__records__high">
          <p class="caption-mono col-grey">Highest Bid</p>
          <p class="base-mono">${nft.item.highestBid?.value} ${nft.item.highestBid?.currency}</p>
        </div>
      </div>
    </div>
  </a>


    `;
      const favorite = cardContainer.getElementsByClassName("artist-remove");
      Array.from(favorite).forEach((element, index) => {
        element.addEventListener("click", (event) => {
          event.stopPropagation();
          removeFavoriteItem(data.nfts[index]);

          event.target.parentElement.remove();

          Toastify({
            text: `Removed from favorite`,
            duration: 1000,
            gravity: "top",
            position: "right",
            style: {
              fontFamily: "Work Sans",
              background:
                "linear-gradient(90deg, rgba(172,6,168,1) 0%, rgba(255,0,18,1) 100%)",
            },
          }).showToast();
        });
      });
    });
  }
  favoriteBar.addEventListener("click", () => {
    if (localStorage.getItem("favorite") === null) {
      cardContainer.innerHTML = `<h1 class="heading-fifth-mono">Nothing here yet</h1>`;
      return;
    } else {
      let favoriteItems = getFavoriteItems().filter(
        (x) => x.item.creatorId == +data.id
      );

      cardContainer.innerHTML = "";
      fillFavoriteItems(favoriteItems);
    }
  });
  createdBar.addEventListener("click", () => {
    fillCreatedItems(data);
  });
}
function addFavoriteItem(item, creatorId) {
  console.log("added");
  const favoriteItems = getFavoriteItems();

  const isAlreadyAdded = favoriteItems.some(
    (favoriteItem) => favoriteItem.item.id === item.id
  );

  if (!isAlreadyAdded) {
    favoriteItems.push({ creatorId: creatorId, item });

    localStorage.setItem("favorite", JSON.stringify(favoriteItems));
    fillFavoriteNumber(item.creatorId);
    Toastify({
      text: `Added to favourite`,
      duration: 1000,
      gravity: "top",
      position: "right",
      style: {
        fontFamily: "Work Sans",
        background: "linear-gradient(128deg, #a259ff 49.75%, #377df7 136.56%)",
      },
    }).showToast();
  } else {
    Toastify({
      text: `Already added to favorites`,
      duration: 1000,
      gravity: "top",
      position: "right",
      style: {
        fontFamily: "Work Sans",
        background: "#f00",
      },
    }).showToast();
  }

  return favoriteItems;
}

function removeFavoriteItem(item) {
  console.log("removed");
  let favoriteItems = getFavoriteItems();

  console.log(item.id);
  favoriteItems = favoriteItems.filter((i) => i.item.id !== item.id);
  console.log(favoriteItems.length);

  localStorage.setItem("favorite", JSON.stringify(favoriteItems));
  fillFavoriteNumber(item.creatorId);
}

function getFavoriteItems() {
  return JSON.parse(localStorage.getItem("favorite")) ?? [];
}
function fillFavoriteNumber(artistId) {
  favoriteNumber.innerHTML = getFavoriteItems().filter(
    (x) => x.item.creatorId == +artistId
  ).length;
}
