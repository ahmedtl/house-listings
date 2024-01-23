<script setup>
import { useMyStore } from "@/store/index.js";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

const { searchInput } = storeToRefs(useMyStore());
const { fetchHouses } = useMyStore();

const store = useMyStore();
const filter = ref("price");

function filterPrice() {
  filter.value = "price";
  return store.sortedHousesByPrice;
}

function filterSize() {
  filter.value = "size";
  return store.sortedHousesBySize;
}

const isActive = computed(() => filter.value === "size");

function clearSearch() {
  searchInput.value = "";
  store.fetchHouses();
}
</script>

<template>
  <div class="container">
    <div class="top">
      <!-- desktop -->
      <h1 class="title">Houses</h1>
      <div class="create-button">
        <RouterLink class="create-house" to="/create-house">
          <img class="plus" src="@/assets/images/ic_plus_white@3x.png" />
          <p>CREATE NEW</p>
        </RouterLink>
      </div>
      <!-- mobile -->
      <div class="create-mobile">
        <RouterLink class="create-house-mobile" to="/create-house">
          <img class="plus-mobile" src="@/assets/images/ic_plus_grey@3x.png" />
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="search-bar">
      <img
        class="search-icon"
        src="@/assets/images/ic_search@3x.png"
        alt="search icon"
      />
      <input
        class="search-input"
        type="text"
        placeholder="Search for a house by location"
        v-model="searchInput"
      />
      <img
        src="@/assets/images/ic_clear@3x.png"
        alt="delete-search"
        class="search-clear"
        v-if="searchInput"
        @click="clearSearch()"
      />
    </div>
    <div class="filter-buttons">
      <div
        :class="{ active: filter === 'price', red: isActive }"
        class="filter-price"
        @click="filterPrice()"
      >
        <button class="price">Price</button>
      </div>
      <div
        :class="{ active: filter === 'size' }"
        class="filter-size"
        @click="filterSize()"
      >
        <button class="size">Size</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* top sytle */
.create-mobile {
  display: none;
}

.title {
  font-family: var(--font-family);
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-text);
}

.top {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15%;
  width: 70%;
}

.bottom {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15%;
  margin-right: 20%;
  width: 70%;
}

.create-button {
  display: flex;
  justify-content: center;
  background: var(--primary);
  border-radius: 5px;
  width: 170px;
  height: 40px;
}

.plus-mobile {
  display: none;
}

.create-house {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: var(--background2);
  text-decoration: none;
  font-family: var(--font-family);
  font-weight: bold;
}

.plus {
  width: 15px;
  height: 15px;
  margin-top: 3px;
  margin-right: 5px;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  position: relative;
}

.search-input {
  background: var(--tertiary);
  border-radius: 5px;
  border: none;
  width: 100%;
  height: 35px;
  font-family: var(--font-family);
  color: var(--secondary-text);
}

.search-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 10px;
}

.search-clear {
  width: 20px;
  position: absolute;
  right: 10px;
}

input[type="text"] {
  padding-left: 40px;
  font-size: 14px;
  font-family: var(--font-family);
  font-style: italic;
}

.filter-price.red {
  background-color: var(--tertiary2);
}

.filter-size.active {
  background-color: var(--primary);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.filter-buttons {
  display: flex;
  background: var(--tertiary2);
  width: 220px;
  height: 40px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.filter-price,
.filter-size {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-price {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: var(--primary);
}

button {
  background: none;
  border: none;
  font-family: var(--font-family);
  font-weight: 550;
  color: var(--background);
  cursor: pointer;
}

a.router-link-exact-active {
  color: var(--primary);
}

@media screen and (max-width: 750px) {
  .top {
    display: flex;
    width: 90%;
    margin-left: 5%;
  }

  .bottom {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 90%;
    margin-left: 17px;
  }

  .create-button {
    display: none;
  }

  .create-mobile {
    display: flex;
    justify-content: right;
    width: 70%;
  }

  .plus-mobile {
    display: flex;
    width: 20px;
    height: 20px;
    margin-top: 3px;
    margin-right: 5%;
  }

  .title {
    display: flex;
    justify-content: right;
    font-size: 18px;
    font-weight: bold;
    width: 100%;
  }

  input[type="text"] {
    font-size: 12px;
  }

  .search-bar {
    width: 100%;
  }

  .filter-buttons {
    display: flex;
    margin-top: 20px;
    width: 100%;
  }

  .filter-price,
  .filter-size {
    display: block;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .filter-price {
    display: flex;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background: var(--primary);
  }

  .size {
    display: flex;
  }
}
</style>
