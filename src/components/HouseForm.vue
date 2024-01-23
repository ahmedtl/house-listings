<script setup>
import { computed, ref } from "vue";
import { useMyStore } from "@/store/index.js";

const props = defineProps({
  house: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["submit"]);
const formData = ref({
  price: props.house.price,
  bedrooms: props.house.rooms?.bedrooms,
  bathrooms: props.house.rooms?.bathrooms,
  size: props.house.size,
  streetName: props.house.location?.street,
  houseNumber: props.house.location?.houseNumber,
  numberAddition: props.house.location?.houseNumberAddition,
  zip: props.house.location?.zip,
  city: props.house.location?.city,
  hasGarage: props.house.hasGarage,
  constructionYear: props.house.constructionYear,
  description: props.house.description,
});

const image = ref(props.house.image);
const url = ref(null);

const submit = () => {
  const data = { formData: formData.value, image: image.value };
  emit("submit", data);
};

const showImage = (event) => {
  image.value = event.target.files[0];
  url.value = URL.createObjectURL(image.value);
};
const deleteImage = () => {
  image.value = null;
  url.value = null;
  props.house.image = null;
  document.getElementById("image").value = "";
};
const isDisabled = computed(() => {
  return (
    !formData.value.price ||
    !formData.value.bedrooms ||
    !formData.value.bathrooms ||
    !formData.value.size ||
    !formData.value.streetName ||
    !formData.value.houseNumber ||
    !formData.value.zip ||
    !formData.value.city ||
    !formData.value.hasGarage ||
    !formData.value.constructionYear ||
    !formData.value.description ||
    !image.value
  );
});
</script>

<template>
  <div class="container">
    <div class="back">
      <div class="mobile-back">
        <router-link class="back-class" to="/">
          <img
            class="back-button"
            src="@/assets/images/ic_back_grey@3x.png"
            alt="backImg"
          />
          <a class="back-text">Back to overview</a>
        </router-link>
      </div>
      <div class="mobile-listing">
        <h1 class="mobile-title">{{ title }}</h1>
      </div>
    </div>
    <h1 class="title">{{ title }}</h1>
    <form @submit.prevent="submit">
      <div class="form">
        <div class="streetname">
          <label class="labelstreet" for="street">Street name*</label>
          <input
            class="street"
            v-model="formData.streetName"
            required
            type="text"
            placeholder="Enter the street name"
          />
        </div>

        <div class="number-addition">
          <div class="number">
            <label class="labelhousenumber" for="housenumber"
              >House number*</label
            >
            <input
              class="housenumber"
              v-model="formData.houseNumber"
              required
              type="text"
              placeholder="Enter house number"
            />
          </div>

          <div class="extra">
            <label class="labeladdition" for="addition"
              >Addition (optional)</label
            >
            <input
              class="addition"
              v-model="formData.numberAddition"
              type="text"
              placeholder="e.g.A"
            />
          </div>
        </div>

        <div class="postcode">
          <label class="labelpostalcode" for="postalcode">Postal code*</label>
          <input
            class="postalcode"
            v-model="formData.zip"
            type="text"
            placeholder="e.g. 1000 AA"
          />
        </div>

        <div>
          <label class="labelcity" for="city">City*</label>
          <input
            class="city"
            v-model="formData.city"
            type="text"
            placeholder="e.g. Utrecht"
          />
        </div>

        <div class="picture">
          <label class="labelpicture">Upload picture (PNG or JPG)*</label>
          <input
            @change="showImage"
            class="image"
            id="image"
            type="file"
            accept=".jpg, .png"
          />
        </div>

        <div v-if="url || props.house.image">
          <img v-if="url" class="preview" :src="url" alt="preview" />
          <img
            v-if="props.house.image"
            class="preview"
            :src="house.image"
            alt="houseImage"
          />
          <img
            v-if="url || props.house.image"
            class="previewremove"
            src="@/assets/images/ic_clear_white@3x.png"
            alt="remove"
            @click="deleteImage"
          />
        </div>
        <label v-else class="labelimage" for="image">
          <img
            class="image-icon"
            src="@/assets/images/ic_plus_grey@3x.png"
            alt="labelimage"
          />
        </label>

        <div class="price">
          <label class="label-price" for="price">Price*</label>
          <input
            class="price"
            v-model="formData.price"
            type="text"
            placeholder="e.g. €150.000"
          />
        </div>

        <div class="size-garage">
          <div class="sizefield">
            <label class="labelsize" for="size">Size*</label>
            <input
              class="size"
              v-model="formData.size"
              type="text"
              placeholder="e.g. 60m2"
            />
          </div>

          <div class="garage-field">
            <label class="labelgarage" for="garage">Garage*</label>
            <select v-model="formData.hasGarage" class="garage">
              <option value="" selected disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <div class="bed-bath">
          <div class="bedfield">
            <label class="labelbed" for="bed">Bedrooms*</label>
            <input
              v-model="formData.bedrooms"
              class="bed"
              type="number"
              placeholder="Enter amount"
            />
          </div>

          <div class="bathfield">
            <label class="labelbath" for="bath">Bathrooms*</label>
            <input
              v-model="formData.bathrooms"
              class="bath"
              type="number"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div class="constructiondate">
          <label class="labeldate" for="date">Date*</label>
          <input
            v-model="formData.constructionYear"
            class="date"
            type="text"
            placeholder="e.g. 1990"
          />
        </div>

        <div class="desc">
          <label class="labeldescription" for="description">Description*</label>
          <textarea
            class="description"
            v-model="formData.description"
            type="text"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div class="post">
          <button :disabled="isDisabled" class="postbutton">
            {{ buttonText }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
body {
  overflow: hidden;
}
.container {
  background-image: url("@/assets/images/img_background@3x.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center right;
}

.background {
  width: 100%;
  height: 100vh;
  position: absolute;
}

.mobile-listing {
  display: none;
}
.image {
  object-fit: cover;
}
.postbutton:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.back {
  display: flex;
  align-items: center;
  margin-left: 15%;
}

.back-class {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-top: 30px;
}

.back-button {
  width: 20px;
  height: 20px;
}

.back-text {
  font-size: 17px;
  font-family: var(--font-family);
  font-weight: 600;
  color: var(--primary-text);
  margin-left: 10px;
  text-decoration: none;
}

.title {
  font-size: 26px;
  font-family: var(--font-family);
  font-weight: 700;
  color: var(--primary-text);
  margin-left: 15%;
  margin-top: 30px;
}

.form {
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-left: 15%;
  margin-top: 30px;
}

.housenumber,
.addition,
.bed,
.garage,
.size,
.bath {
  width: 100%;
}

.number,
.extra,
.bathfield,
.sizefield,
.garage-field,
.bedfield {
  width: 20%;
}

input,
textarea,
select {
  width: 45%;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 13px;
  font-family: var(--font-family);
  color: var(--primary-text);
  margin-bottom: 10px;
}

label {
  font-size: 11px;
  font-family: var(--font-family);
  font-weight: 600;
  color: var(--secondary);
  margin-bottom: 5px;
  display: flex;
}

.size-garage,
.bed-bath,
.number-addition {
  display: flex;
  gap: 5%;
}

.description {
  height: 100px;
  padding-top: 10px;
  resize: none;
}

.garage {
  background-color: var(--background2);
}

.picture > input {
  display: none;
}

.image-icon {
  width: 30px;
  height: 30px;
}

.preview {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.previewremove {
  width: 30px;
  height: 30px;
  position: absolute;
  cursor: pointer;
}

.labelimage {
  border-style: dashed;
  border-color: var(--tertiary2);
  border-width: 2px;
  width: 120px;
  height: 120px;
}

.labelimage > img {
  margin-left: 42px;
  margin-top: 40px;
}

.post {
  display: flex;
  justify-content: flex-end;
  width: 45%;
  margin-top: 10px;
}

.postbutton {
  width: 170px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: var(--primary);
  font-size: 14px;
  font-family: var(--font-family);
  font-weight: 700;
  color: var(--background2);
  cursor: pointer;
}

@media screen and (min-width: 751px) and (max-width: 1024px) {
  /* Adjustments for tablets */
  .container {
    background-image: url("@/assets/images/img_background@3x.png");
    background-repeat: no-repeat;
    background-position: bottom right;
  }
  .form {
    width: 80%;
    margin-left: 15%;
  }
}

@media screen and (max-width: 750px) {
  .container {
    background-image: url("@/assets/images/img_background@3x.png");
    background-repeat: no-repeat;
    background-position: bottom right;
  }

  .background {
    width: 100%;
    bottom: 0;
    height: 50%;
    position: absolute;
    filter: blur(6px);
  }

  .back {
    display: flex;
    margin-left: 20px;
    margin-top: 30px;
  }

  .back-class {
    text-decoration: none;
    display: flex;
    margin-top: 0;
  }

  .mobile-listing {
    display: grid;
    width: 100%;
    height: 100%;
    margin-right: 20px;
    justify-items: center;
    align-items: center;
    white-space: nowrap;
  }

  .back-button {
    width: 20px;
    height: 20px;
  }

  .back-text {
    display: none;
  }

  .title {
    display: none;
  }

  .mobile-title {
    font-size: 24px;
    font-family: var(--font-family);
    font-weight: 700;
    color: var(--primary-text);
  }

  .form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-left: 20px;
    margin-top: 30px;
    padding-bottom: 20%;
  }

  input,
  textarea,
  select {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 11px;
    font-family: var(--font-family);
    color: var(--primary-text);
    margin-bottom: 10px;
  }

  .housenumber,
  .bed,
  .size {
    width: 90%;
  }

  .addition,
  .garage,
  .bath {
    width: 100%;
  }

  .number,
  .extra,
  .bathfield,
  .sizefield,
  .garage-field,
  .bedfield {
    width: 100%;
  }
  label {
    font-size: 11px;
    font-family: var(--font-family);
    font-weight: 600;
    color: var(--secondary);
    margin-bottom: 5px;
  }

  .size-garage,
  .bed-bath,
  .number-addition {
    display: flex;
    gap: 10px;
  }

  .description {
    height: 100px;
    padding-top: 10px;
  }

  .sizefield,
  .garage-field {
    width: 50%;
  }

  .picture > input {
    display: none;
  }

  .image-icon {
    width: 30px;
    height: 30px;
  }

  .number,
  .extra,
  .bathfield,
  .bedfield {
    width: 50%;
  }

  .labelimage {
    border-style: dashed;
    border-color: var(--tertiary2);
    border-width: 2px;
    width: 120px;
    height: 120px;
  }

  .labelimage > img {
    margin-left: 42px;
    margin-top: 40px;
  }

  .post {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    width: 360px;
  }

  .postbutton {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: var(--primary);
    font-size: 14px;
    font-family: var(--font-family);
    font-weight: 700;
    color: var(--background2);
    cursor: pointer;
  }
}
</style>
