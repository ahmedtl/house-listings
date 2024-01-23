import { defineStore } from "pinia";

const myHeaders = new Headers();
myHeaders.append("X-Api-Key", import.meta.env.VITE_API_KEY);

export const useMyStore = defineStore({
  id: "houses",
  state: () => ({
    apiUrl: import.meta.env.VITE_API_URL,
    houses: [],
    house: {},
    loading: false,
    error: null,
    searchInput: "",
  }),
  getters: {
    sortedHousesByPrice() {
      return this.houses.sort((a, b) => b.price - a.price);
    },
    sortedHousesBySize() {
      return this.houses.sort((a, b) => b.size - a.size);
    },
    filteredHouses: (state) => {
      const originalHouses = [...state.houses];
      return originalHouses.filter((house) =>
        house?.location?.city
          .toUpperCase()
          .includes(state.searchInput.toUpperCase())
      );
    },
  },
  actions: {
    async fetchHouses() {
      this.houses = [];
      this.loading = true;
      try {
        this.houses = await fetch(this.apiUrl, {
          method: "GET",
          headers: myHeaders,
        }).then((response) => response.json());
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        this.houses = this.sortedHousesByPrice;
      }
    },

    async fetchHouse(id) {
      this.house = {};
      this.loading = true;
      try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
          method: "GET",
          headers: myHeaders,
        });
        const data = await response.json();
        this.house = data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async deleteHouse(id) {
      this.loading = true;
      await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE",
        headers: myHeaders,
      }).catch((error) => {
        console.log(error);
      });
      this.loading = false;
    },

    async updateHouse(id, newPost) {
      this.loading = true;
      var formdata = new FormData();
      formdata.append("price", newPost.price);
      formdata.append("bedrooms", newPost.bedrooms);
      formdata.append("bathrooms", newPost.bathrooms);
      formdata.append("size", newPost.size);
      formdata.append("streetName", newPost.streetName);
      formdata.append("houseNumber", newPost.houseNumber);
      formdata.append("numberAddition", newPost.numberAddition);
      formdata.append("zip", newPost.zip);
      formdata.append("city", newPost.city);
      formdata.append("constructionYear", newPost.constructionYear);
      formdata.append("hasGarage", newPost.hasGarage);
      formdata.append("description", newPost.description);

      const res = await fetch(`${this.apiUrl}/${id}`, {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      });
      this.loading = false;

      return res;
    },

    async postImage(id, data) {
      this.loading = true;
      const formData = new FormData();
      formData.append("image", data);

      await fetch(`${this.apiUrl}/${id}/upload`, {
        method: "POST",
        headers: myHeaders,
        body: formData,
      });
      this.loading = false;
    },
  },
});

export const usePostHouse = defineStore({
  id: "post",
  state: () => ({
    apiUrl: import.meta.env.VITE_API_URL,
    price: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    streetName: "",
    houseNumber: "",
    city: "",
    zip: "",
    description: "",
    numberAddition: "",
    constructionYear: "",
    hasGarage: "",
    image: null,
    id: "",
  }),
  actions: {
    async postHouses(newPost, image) {
      var formdata = new FormData();
      formdata.append("price", newPost.price);
      formdata.append("bedrooms", newPost.bedrooms);
      formdata.append("bathrooms", newPost.bathrooms);
      formdata.append("size", newPost.size);
      formdata.append("streetName", newPost.streetName);
      formdata.append("houseNumber", newPost.houseNumber);
      formdata.append("numberAddition", newPost.numberAddition);
      formdata.append("zip", newPost.zip);
      formdata.append("city", newPost.city);
      formdata.append("constructionYear", newPost.constructionYear);
      formdata.append("hasGarage", newPost.hasGarage);
      formdata.append("description", newPost.description);
      formdata.append("image", image, "house.jpg");

      const requestHeader = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };

      try {
        const response = await fetch(this.apiUrl, requestHeader);
        const house = await response.json();

        const id = house.id;
        this.id = id;

        const imageFormData = new FormData();
        imageFormData.append("image", image, "house.jpg");

        const imagerequestHeader = {
          method: "POST",
          headers: myHeaders,
          body: imageFormData,
        };

        const imageResponse = await fetch(
          `${this.apiUrl}/${id}/upload`,
          imagerequestHeader
        );

        if (!imageResponse.ok) {
          throw new Error(imageResponse.statusText);
        }

        return house;
      } catch (error) {
        console.log("Error in postHouses:", error);
        throw error;
      }
    },
  },
});
