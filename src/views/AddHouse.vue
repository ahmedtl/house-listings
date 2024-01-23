<script setup>
import HouseForm from "@/components/houseForm.vue";
import { useMyStore } from "@/store/index.js";
import { usePostHouse } from "@/store/index.js";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useMyStore();

const onsubmit = async ({ formData, image }) => {
  const houseStore = usePostHouse();
  try {
    const createdHouse = await houseStore.postHouses(formData, image);
    if (createdHouse && createdHouse.id) {
      router.push(`/house/detail/${createdHouse.id}`);
    } else {
      console.error("Invalid response from postHouses:", createdHouse);
    }
  } catch (error) {
    console.log("postHouse error:", error);
  }
};

</script>
<template>
  <div>
    <HouseForm
      :house="store.house"
      :title="'Create new listing'"
      :buttonText="'POST'"
      @submit="onsubmit"
    />
  </div>
</template>
