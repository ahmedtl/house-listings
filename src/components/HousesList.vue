<script setup>
import { RouterLink } from "vue-router";
import { useMyStore } from "@/store/index.js";
import { storeToRefs } from "pinia";

import HouseCard from "@/components/HouseCard.vue";

const store = useMyStore();

const { houses, loading, error, searchInput } = storeToRefs(useMyStore());
const { fetchHouses, deleteHouse } = useMyStore();

fetchHouses();

const popUp = (id) => {
  const popup = document.getElementById("popup");
  popup.style.display = "flex";
  const yes = document.getElementById("yes");
  yes.addEventListener("click", () => {
    deleteHouse(id).then(() => {
      fetchHouses();
    });
    //console.log(id)
    popup.style.display = "none";
  });
  const no = document.getElementById("no");
  no.addEventListener("click", () => {
    popup.style.display = "none";
  });
};
</script>

<template>
  <div class="container">
    <div class="popup" id="popup">
      <div class="popup-content">
        <h4 class="headertext">Delete Listing</h4>
        <div>
          <p class="popup-text">
            Are you sure you want to delete this listing?
          </p>
          <p class="popup-text">This action cannot be undone.</p>
        </div>
        <div class="popup-buttons">
          <button class="popup-button" id="yes">YES, DELETE</button>
          <button class="popup-button" id="no">GO BACK</button>
        </div>
      </div>
    </div>
    <p v-if="loading" class="loading">Loading houses...</p>
    <p v-if="error" class="error">
      {{ error.message }}, or check the URL, you must be at localhost:8080
    </p>
    <div v-if="houses">
      <div v-if="searchInput && store.filteredHouses.length">
        <p class="total-search">
          {{ store.filteredHouses.length }} results found
        </p>
      </div>
      <div class="noresult" v-if="store.filteredHouses.length === 0">
        <img
          class="noresultimg"
          src="@/assets/images/img_empty_houses@3x.png"
          alt="no result"
        />
        <a class="noresulttext">No results found.</a>
        <br />
        <a class="noresulttexttwo">Please try another keyword.</a>
      </div>
      <HouseCard
        v-for="house in store.filteredHouses"
        :key="house.id"
        :house="house"
        :popUp="popUp"
      />
    </div>
  </div>
</template>

<style scoped>
.loading {
  margin-left: 15%;
}
.error {
  margin-left: 15%;
  color: var(--primary);
}

#yes,
#no {
  cursor: pointer;
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

.total-search {
  margin-left: 10px;
  font-size: 18px;
  color: var(--primary-text);
  font-weight: 550;
  margin-left: 15%;
}

.noresult {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 10%;
}

.noresultimg {
  height: 200px;
}

.noresulttext {
  font-size: 18px;
  color: var(--secondary);
  margin-top: 20px;
}

.noresulttexttwo {
  font-size: 18px;
  color: var(--secondary);
}

@media screen and (max-width: 750px) {
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

  .loading {
    margin-left: 5%;
  }
  .error {
    margin-left: 5%;
    color: red;
  }

  .loading {
    margin-left: 5%;
  }

  .total-search {
    font-size: 16px;
    color: var(--primary-text);
    font-weight: 550;
    margin-left: 5%;
  }

  .noresult {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 20%;
  }

  .noresultimg {
    height: 150px;
  }
}
</style>
