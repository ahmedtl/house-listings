<script setup>
import { useRoute, useRouter } from "vue-router";
import { useMyStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import HouseForm from "@/components/houseForm.vue";

const { house, loading, error } = storeToRefs(useMyStore());

const store = useMyStore();
const route = useRoute();
const router = useRouter();
const houseId = route.params.id;
store.fetchHouse(route.params.id);

const onsubmit = async ({ formData, image }) => {
  await store.updateHouse(houseId, formData);
  await store.postImage(houseId, image);
  router.push(`/house/detail/${houseId}`);
};
</script>

<template>
  <div v-if="house">
    <div class="house" v-for="house in house" :key="house.id">
      <HouseForm
        v-if="!store.loading"
        :house="house"
        :title="'Edit listing'"
        :buttonText="'SAVE'"
        @submit="onsubmit"
      />
    </div>
  </div>
</template>
