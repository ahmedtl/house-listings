<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  house: {
    type: Object,
    required: true,
  },
  popUp: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="house">

    <div class="edits" v-if="house.madeByMe">
      <RouterLink class="edit" :to="`/edit-house/${house.id}`">
        <img class="edit" src="@/assets/images/ic_edit@3x.png" alt="edit" />
      </RouterLink>
      <div class="deletebutton" @click="popUp(house.id)">
        <img
          class="delete"
          src="@/assets/images/ic_delete@3x.png"
          alt="delete"
        />
      </div>
    </div>

    <RouterLink class="housedetail" :to="`/house/detail/${house.id}`">
      <div class="houseimage">
        <img :src="`${house.image}`" alt="houseImg" />
      </div>
      <div class="house-info">
        <a class="street"
          >{{ house.location.street }} {{ house.location.houseNumber }}
          {{ house.location.houseNumberAddition }}</a
        >
        <a class="price">€ {{ house.price }}</a>
        <a class="postalcode">{{
          house.location.zip + " " + house.location.city
        }}</a>
        <div class="house-icons">
          <img class="bed" src="@/assets/images/ic_bed@3x.png" alt="bed" />
          <a class="beds">{{ house.rooms.bedrooms }}</a>
          <img class="bath" src="@/assets/images/ic_bath@3x.png" alt="bath" />
          <a class="baths">{{ house.rooms.bathrooms }}</a>
          <img class="size" src="@/assets/images/ic_size@3x.png" alt="size" />
          <a class="sizes">{{ house.size }} m2</a>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.deletebutton {
  width: 15px;
  cursor: pointer;
}

.housedetail {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
}

.house {
  display: flex;
  background-color: var(--background2);
  border: solid 0 var(--tertiary);
  border-radius: 10px;
  height: 160px;
  width: 69%;
  padding: 10px;
  margin-top: 20px;
  margin-left: 15%;
}

.houseimage img {
  width: 140px;
  height: 140px;
  border-radius: 10px;
  object-fit: cover;
}

.house-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 15px;
  gap: 8px;
}

.street {
  font-weight: 550;
  font-size: 18px;
  color: var(--primary-text);
  margin-top: 8px;
}

.price {
  color: var(--secondary);
  margin-top: 5px;
}

.postalcode {
  color: var(--tertiary2);
  margin-top: 5px;
}

.house-icons {
  display: flex;
  gap: 7px;
  color: var(--secondary-text);
}

.house-icons img {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.edits {
  position: absolute;
  right: 17%;
  display: flex;
  padding-top: 20px;
  padding-right: 10px;
}

.edit,
.delete {
  height: 20px;
  margin-left: 20px;
}

@media screen and (max-width: 750px) {
  .edits {
    position: absolute;
    right: 0;
    display: flex;
    height: 25px;
    padding: 4px;
    margin-right: 12%;
  }

  .house {
    display: flex;
    background-color: var(--background2);
    border: solid 0 var(--tertiary);
    border-radius: 10px;
    height: 120px;
    width: 84%;
    padding: 10px;
    margin-left: 5%;
  }

  .street {
    font-weight: 550;
    font-size: 12px;
    color: var(--primary-text);
    width: 65%;
  }

  .house-info {
    display: flex;
    flex-direction: column;
    font-weight: 300;
    font-size: 12px;
    gap: 1px;
  }

  .house-icons {
    height: 10%;
    margin-top: 18px;
    width: 90%;
    height: 15px;
  }

  .houseimage img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
    object-position: left;
  }

  .edit {
    height: 13px;
  }

  .delete {
    height: 13px;
  }
}
</style>
