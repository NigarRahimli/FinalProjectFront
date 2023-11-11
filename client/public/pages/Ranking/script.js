const rankingList = document.getElementsByClassName(
  "top-creators__ranking-list__items"
)[0];

function getArtists() {
  try {
    fetch(`http://localhost:3000/api/creators/`)
      .then((res) => res.json())
      .then((data) => {
        fillArtistPage(data);
        console.log(data);
      })
      .finally(() => {});
  } catch (error) {
  } finally {
    // setTimeout((x) => showLoader(false), 3000);
  }
}
getArtists();

function fillArtistPage(artists) {
  artists.forEach((artist) => {
    const person = document.createElement("div");
    person.classList.add("top-creators__ranking-list__items__item");
    person.innerHTML += `
    <div class="top-creators__ranking-list__items__item__info">
    <div class="top-creators__ranking-list__items__item__info__number">
      ${artist.id}
    </div>
   <a href="./" class="top-creators__ranking-list__items__item__info__user" href=""> <img src="../../../../${
     artist.profileImgPath
   }" alt="" />
    <h5 class="heading-fifth-work"> ${artist.name}</h5>
  </a>
  </div>
  <div class="top-creators__ranking-list__items__item__index base-mono">
    <p class="percent">+${artist.totalSale.value} ${
      artist.totalSale.currency
    } </p>
    <p class="sold">${artist.nftSold}</p>
    <p class="volume">${artist.volume.substring(0, artist.volume.length - 3)}k</p>
   <img class="top-creators-delete" src="../../imgs/icons/trash.svg" alt="">
  </div>
    
    `;
    const deleteButton=person.getElementsByClassName("top-creators-delete")[0];
    deleteButton.addEventListener("click",()=>{
       artistDelete(artist.id,person)
    })
    rankingList.appendChild(person);
  });
}

async function artistDelete(artistId, artistElement) {
    if (confirm(`Are you sure to delete artist with id ${artistId}`)) {
      const response = await fetch(
        `http://localhost:3000/api/creators/${artistId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        artistElement.remove();
      }
    }
  }