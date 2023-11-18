let artists = [];

const rankingList = document.getElementsByClassName(
  "top-creators__ranking-list__items"
)[0];
const skeletonRows = document.getElementsByClassName("skeleton-rows")[0];
const sortId = document.getElementById("sort-id");
const sortName = document.getElementById("sort-name");
const sortChange = document.getElementById("sort-change");
const sortSold = document.getElementById("sort-sold");
const sortVolume = document.getElementById("sort-volume");

sortId.addEventListener("click", () => {
  console.log(artists);
  if (sortId.classList.contains("clicked")) {
    sortId.classList.remove("clicked");
    sortItems(artists, "id", "asc");
  } else {
    sortId.classList.add("clicked");
    sortItems(artists, "id", "desc");
  }
  clearAndFillRankingList(artists);
});

sortName.addEventListener("click", () => {
  if (sortName.classList.contains("clicked")) {
    sortName.classList.remove("clicked");
    sortItems(artists, "name", "asc");
  } else {
    sortName.classList.add("clicked");
    sortItems(artists, "name", "desc");
  }
  clearAndFillRankingList(artists);
});

sortChange.addEventListener("click", () => {
  if (sortChange.classList.contains("clicked")) {
    sortChange.classList.remove("clicked");
    sortItems(artists, "totalSale", "asc", "value");
  } else {
    sortChange.classList.add("clicked");
    console.log(artists);
    sortItems(artists, "totalSale", "desc", "value");
  }
  clearAndFillRankingList(artists);
});

sortSold.addEventListener("click", () => {
  if (sortSold.classList.contains("clicked")) {
    sortSold.classList.remove("clicked");
    sortItems(artists, "nftSold", "asc");
  } else {
    sortSold.classList.add("clicked");
    sortItems(artists, "nftSold", "desc");
  }
  clearAndFillRankingList(artists);
});
sortVolume.addEventListener("click", () => {
  if (sortSold.classList.contains("clicked")) {
    sortSold.classList.remove("clicked");
    sortItems(artists, "volume", "asc");
  } else {
    sortSold.classList.add("clicked");
    sortItems(artists, "volume", "desc");
  }
  clearAndFillRankingList(artists);
});

async function getArtists() {
  try {
    const response = await fetch(`http://localhost:3000/api/creators/`);
    const data = await response.json();
    skeletonRows.style.display = "none";

    artists = data;

    clearAndFillRankingList(artists);
  } catch (error) {
    console.error("Error fetching artists:", error);
  }
}

async function artistDelete(artistId, artistElement) {
  if (confirm(`Are you sure to delete artist with id ${artistId}`)) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/creators/${artistId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        artists = artists.filter((artist) => artist.id !== artistId);

        sortItems(artists, "name", "asc");
        clearAndFillRankingList(artists);

        artistElement.remove();
      } else {
        console.error(`Failed to delete artist with id ${artistId}`);
      }
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  }
}

function clearAndFillRankingList(artists) {
  rankingList.innerHTML = "";

  fillArtistPage(artists);
}

function sortItems(items, itemName, sortOrder = "asc", subItem = null) {
  items.sort((item1, item2) => {
    let value1, value2;

    if (subItem) {
      value1 =
        typeof item1[itemName] === "object"
          ? Number(item1[itemName][subItem])
          : item1[itemName];
      value2 =
        typeof item2[itemName] === "object"
          ? Number(item2[itemName][subItem])
          : item2[itemName];
    } else {
      value1 =
        typeof item1[itemName] === "object"
          ? Number(item1[itemName].value)
          : item1[itemName];
      value2 =
        typeof item2[itemName] === "object"
          ? Number(item2[itemName].value)
          : item2[itemName];
    }

    if (!isNaN(value1) && !isNaN(value2)) {
      return sortOrder === "asc" ? value1 - value2 : value2 - value1;
    } else {
      if (value1 > value2) {
        return sortOrder === "asc" ? 1 : -1;
      } else if (value1 < value2) {
        return sortOrder === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    }
  });
}

function fillArtistPage(artists) {
  artists.forEach((artist) => {
    const person = document.createElement("div");
    person.classList.add("top-creators__ranking-list__items__item");
    person.innerHTML += `
    <div class="top-creators__ranking-list__items__item__info">
      <div class="top-creators__ranking-list__items__item__info__number">
        ${artist.id}
      </div>
      <a class="top-creators__ranking-list__items__item__info__user">
        <img src="../../../../${artist.profileImgPath}" alt="" />
        <h5 class="heading-fifth-work"> ${artist.name}</h5>
      </a>
    </div>
    <div class="top-creators__ranking-list__items__item__index base-mono">
      <p class="percent">+${artist.totalSale.value} ${
      artist.totalSale.currency
    }</p>
      <p class="sold">${artist.nftSold}</p>
      <p class="volume">${artist.volume.substring(
        0,
        artist.volume.length - 3
      )}k</p>
      <img class="top-creators-delete" src="../../imgs/icons/trash.svg" alt="">
    </div>`;
   const host=person.getElementsByClassName("top-creators__ranking-list__items__item__info__user")[0];
   host.addEventListener("click", () => {
    window.open(
      `http://127.0.0.1:5500/client/public/pages/Artist/?artist_id=${artist.id}`,
      "_self"
    )})
    const deleteButton = person.getElementsByClassName(
      "top-creators-delete"
    )[0];
    deleteButton.addEventListener("click", () => {
      artistDelete(artist.id, person);
    });

    rankingList.appendChild(person);
  });
}

getArtists();
