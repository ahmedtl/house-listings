<script setup>
import { useRoute, useRouter } from "vue-router";
import { useMyStore } from "@/store/index.js";
import { storeToRefs } from "pinia";

const { house, loading, error } = storeToRefs(useMyStore());
const { fetchHouse, deleteHouse, fetchHouses } = useMyStore();

const router = useRouter();
const route = useRoute();
fetchHouse(route.params.id);

const popUp = (id) => {
  const popup = document.getElementById("popup");
  popup.style.display = "flex";
  const yes = document.getElementById("yes");
  yes.addEventListener("click", () => {
    deleteHouse(id);
    //console.log(id)
    popup.style.display = "none";
    fetchHouses();
    router.push("/");
  });
  const no = document.getElementById("no");
  no.addEventListener("click", () => {
    popup.style.display = "none";
  });
};
</script>

<template>
  <p v-if="loading" class="loading">Loading House page...</p>
  <p v-if="error" class="error">{{ error.message }}</p>
  <div class="popup" id="popup">
    <div class="popup-content">
      <h4 class="headertext">Delete Listing</h4>
      <div>
        <p class="popup-text">Are you sure you want to delete this listing?</p>
        <p class="popup-text">This action cannot be undone.</p>
      </div>
      <div class="popup-buttons">
        <button class="popup-button" id="yes">YES, DELETE</button>
        <button class="popup-button" id="no">GO BACK</button>
      </div>
    </div>
  </div>
  <div v-if="house">
    <div class="house" v-for="house in house" :key="house.id">
      <div class="back">
        <router-link class="back-class" to="/">
          <img
            class="back-button"
            src="@/assets/images/ic_back_grey@3x.png"
            alt="back"
          />
          <a class="back-text">Back to overview</a>
        </router-link>
        <router-link class="mobile-back-class" to="/">
          <img
            class="mobile-back-button"
            src="@/assets/images/ic_back_white@3x.png"
            alt="back"
          />
        </router-link>

        <div class="mobile-edits" v-if="house.madeByMe">
          <router-link :to="`/edit-house/${house.id}`">
            <img
              class="mobile-edit"
              src="@/assets/images/ic_edit_white@3x.png"
              alt="edit"
            />
          </router-link>
          <div class="deletebutton" @click="popUp(house.id)">
            <img
              class="mobile-delete"
              src="@/assets/images/ic_delete_white@3x.png"
              alt="delete"
            />
          </div>
        </div>
      </div>
      <div class="image">
        <img class="houseimage" :src="`${house.image}`" alt="houseImg" />
      </div>
      <div class="house-detail">
        <div class="firstline">
          <a class="street"
            >{{ house.location.street }} {{ house.location.houseNumber }}
            {{ house.location.houseNumberAddition }}</a
          >
          <div class="edits" v-if="house.madeByMe">
            <router-link class="edit" :to="`/edit-house/${house.id}`">
              <img
                class="edit"
                src="@/assets/images/ic_edit@3x.png"
                alt="edit"
              />
            </router-link>
            <div class="deletebutton" @click="popUp(house.id)">
              <img
                class="delete"
                src="@/assets/images/ic_delete@3x.png"
                alt="delete"
              />
            </div>
          </div>
        </div>
        <div class="details">
          <div class="postalcode">
            <img
              src="@/assets/images/ic_location@3x.png"
              alt="location"
              class="postalcodeimage"
            />
            <a class="postalcodetext">{{
              house.location.zip + " " + house?.location?.city
            }}</a>
          </div>
          <div class="price">
            <img
              src="@/assets/images/ic_price@3x.png"
              alt="price"
              class="priceimage"
            />
            <a class="pricetext">{{ house.price }}</a>
            <img
              src="@/assets/images/ic_size@3x.png"
              alt="size"
              class="sizeimage"
            />
            <a class="sizetext">{{ house.size }} m2 </a>
            <img
              src="@/assets/images/ic_construction_date@3x.png"
              alt="built"
              class="builtimage"
            />
            <a class="builttext">Built in {{ house.constructionYear }}</a>
          </div>
          <div class="info">
            <img
              src="@/assets/images/ic_bed@3x.png"
              alt="bed"
              class="bedimage"
            />
            <a class="bedtext">{{ house.rooms.bedrooms }}</a>
            <img
              src="@/assets/images/ic_bath@3x.png"
              alt="bath"
              class="bathimage"
            />
            <a class="bathtext">{{ house.rooms.bathrooms }}</a>
            <img
              src="@/assets/images/ic_garage@3x.png"
              alt="garage"
              class="garageimage"
            />
            <a class="garagetext">{{ house.hasGarage ? "Yes" : "No" }}</a>
          </div>
          <div class="text">
            <a class="infotext">{{ house.description }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  margin-left: 15%;
}
.error {
  margin-left: 15%;
}
.popup {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.popup-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background);
  padding: 20px;
  width: 600px;
  margin: auto;
  height: 400px;
  border-radius: 3%;
}

.deletebutton {
  cursor: pointer;
}

#yes,
#no {
  cursor: pointer;
}

.headertext {
  font-family: var(--font-family);
  font-size: 25px;
  display: flex;
  justify-content: center;
  color: var(--primary-text);
  font-weight: 550;
  margin-top: 30px;
  margin-bottom: 4%;
}

.popup-text {
  font-family: var(--font-family);
  text-align: center;
  font-size: 15px;
  color: var(--secondary-text);
}

#firsttext {
  margin-top: 15px;
}

.popup-buttons {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.popup-button {
  font-family: var(--font-family);
  width: 50%;
  height: 20%;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--primary);
  color: var(--background);
  font-weight: 550;
}

#no {
  background-color: var(--secondary);
}

.back {
  display: flex;
  align-items: center;
}

.back-class {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding-top: 20px;
  padding-bottom: 30px;
}

.back-button {
  width: 20px;
  height: 20px;
}

.mobile-edits {
  display: none;
}

.back-text {
  font-size: 17px;
  font-family: var(--font-family);
  font-weight: 600;
  color: var(--primary-text);
  margin-left: 10px;
  text-decoration: none;
}

.house {
  width: 50%;
  height: 100%;
  margin-top: 30px;
  margin-left: 15%;
}

.image {
  display: flex;
}

.houseimage {
  width: 100%;
  max-height: 550px;
}

.house-detail {
  width: 100%;
  height: 90%;
  background: var(--background2);
  padding-bottom: 50px;
  font-size: 18px;
}

.firstline {
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
}

.street {
  font-size: 22px;
  font-family: var(--font-family);
  font-weight: 600;
  color: var(--primary-text);
  margin-top: 20px;
}

.edits {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.edit,
.delete {
  width: 17px;
  height: 17px;
  margin-right: 20px;
}

.mobile-back-button {
  display: none;
}

.postalcodetext,
.pricetext,
.sizetext,
.builttext,
.bedtext,
.bathtext,
.garagetext {
  font-size: 15px;
  font-family: var(--font-family);
  font-weight: 525;
  color: var(--secondary-text);
}

.text {
  padding-top: 15px;
}

.infotext {
  color: var(--secondary-text);
  line-height: 1.5em;
}

.postalcodeimage,
.priceimage,
.sizeimage,
.builtimage,
.bedimage,
.bathimage,
.garageimage {
  margin-right: 8px;
  width: 15px;
  height: 15px;
  margin-top: 20px;
  margin-left: 30px;
}

.priceimage,
.sizeimage,
.builtimage,
.bedimage,
.bathimage,
.garageimage {
  margin-right: 5px;
}

.text {
  margin-left: 30px;
  margin-top: 10px;
  margin-right: 20px;
}

.recommended {
  width: 40%;
  margin-top: 30px;
  margin-left: 9%;
}

.recommendedtext {
  font-size: 20px;
  font-family: var(--font-family);
  font-weight: 650;
  color: var(--primary-text);
}

.smallhouse {
  display: flex;
  margin-top: 20px;
  background: var(--background2);
  border-radius: 5px;
  padding: 6px;
}

.smallhouseimage {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
  object-position: left;
}

.smallstreet,
.smallprice,
.smallpostalcode {
  display: flex;
  justify-content: space-between;
}

.smallhousestreet {
  font-weight: 550;
  font-size: 9px;
  color: var(--primary-text);
}

.smallhouseprice {
  font-size: 8px;
  color: var(--secondary);
}

.smallhousepostalcode {
  font-size: 8px;
  color: var(--tertiary2);
}

.smalldetails {
  display: flex;
  margin-top: 30px;
}

.smallbedimage,
.smallbathimage,
.smallsizeimage {
  width: 10px;
  height: 10px;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 2px;
}

.smallbedtext,
.smallbathtext,
.smallsizetext {
  font-size: 7px;
  white-space: nowrap;
  font-weight: 700;
  color: var(--tertiary2);
  margin-top: 2px;
}

@media screen and (max-width: 750px) {
  .loading {
    margin-left: 5%;
  }
  .error {
    margin-left: 5%;
  }
  .back-class {
    display: none;
  }

  .popup-content {
    background-color: var(--background);
    padding: 20px;
    width: 70%;
    margin: auto;
    height: 35%;
    border-radius: 3%;
  }

  .headertext {
    font-family: var(--font-family);
    font-size: 20px;
    display: flex;
    justify-content: center;
    color: var(--primary-text);
    font-weight: 550;
    margin-top: 30px;
    margin-bottom: 4%;
  }

  .popup-text {
    font-family: var(--font-family);
    display: flex;
    justify-content: center;
    font-size: 12px;
    padding-top: 10px;
    color: var(--secondary-text);
  }
  .popup-buttons {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .infotext {
    line-height: normal;
    color: var(--secondary-text);
  }
  .house {
    width: 100%;
    height: 100%;
    margin-top: 0;
    margin-left: 0;
    position: relative;
  }

  .mobile-back-button {
    display: flex;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 20px;
    margin-left: 20px;
    z-index: 1;
  }

  .mobile-edits {
    display: flex;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 20px;
    margin-right: 50px;
    z-index: 1;
    gap: 20px;
  }

  .houseimage {
    width: 100%;
    height: 100%;
  }

  .house-detail {
    width: 100%;
    height: auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: absolute;
    top: 90%;
  }

  .postalcodetext,
  .pricetext,
  .sizetext,
  .builttext,
  .bedtext,
  .bathtext,
  .garagetext {
    font-size: 13px;
    font-family: var(--font-family);
    font-weight: 525;
    color: var(--secondary-text);
  }

  .postalcodeimage,
  .priceimage,
  .sizeimage,
  .builtimage,
  .bedimage,
  .bathimage,
  .garageimage {
    width: 15px;
    height: 15px;
    margin-top: 20px;
  }

  .edits {
    display: none;
  }

  .mobile-edit,
  .mobile-delete {
    width: 17px;
    height: 17px;
  }

  .recommended {
    width: 90%;
    margin-top: 0;
    margin-left: 5%;
  }

  .smallhouse {
    display: flex;
    margin-top: 10px;
    background: var(--background2);
    border-radius: 5px;
    padding: 6px;
  }

  .smallhouseimage {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    object-fit: cover;
    object-position: left;
  }

  .smallstreet,
  .smallprice,
  .smallpostalcode {
    display: flex;
    justify-content: space-between;
  }

  .smallhousestreet {
    font-weight: 550;
    font-size: 13px;
    color: var(--primary-text);
  }

  .smallhouseprice {
    font-size: 10px;
    color: var(--secondary);
  }

  .smallhousepostalcode {
    font-size: 10px;
    color: var(--tertiary2);
  }

  .smalldetails {
    display: flex;
    margin-top: 10px;
  }

  .smallbedimage,
  .smallbathimage,
  .smallsizeimage {
    width: 10px;
    height: 10px;
    margin-right: 5px;
    margin-left: 5px;
    margin-top: 2px;
  }

  .smallbedtext,
  .smallbathtext,
  .smallsizetext {
    font-size: 9px;
    white-space: nowrap;
    font-weight: 700;
    color: var(--tertiary2);
    margin-top: 2px;
  }
}
</style>
