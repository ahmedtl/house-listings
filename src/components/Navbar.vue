<template>
  <!-- navbar for desktop -->
  <div class="container">
    <div class="navbar">
      <nav>
        <img
          class="logo"
          src="@/assets/images/img_logo_dtt@3x.png"
          alt="logo"
        />
        <RouterLink class="houses" :class="{ active: isHousesActive }" to="/"
          >Houses</RouterLink
        >
        <RouterLink class="about" to="/about"> About</RouterLink>
      </nav>
    </div>
  </div>
  <!-- navbar for mobile -->
  <div class="mobile-container">
    <div class="mobile-navbar">
      <RouterLink class="mobile-houses" to="/">
        <img
          v-if="
            $route.name === 'houses' ||
            $route.name === 'detail' ||
            $route.name === 'create-house' ||
            $route.name === 'edit-house'
          "
          src="@/assets/images/ic_mobile_navigarion_home_active@3x.png"
        />
        <img v-else src="@/assets/images/ic_mobile_navigarion_home@3x.png" />
      </RouterLink>
      <RouterLink class="mobile-about" to="/about">
        <img
          v-if="$route.name === 'about'"
          src="@/assets/images/ic_mobile_navigarion_info_active@3x.png"
        />
        <img v-else src="@/assets/images/ic_mobile_navigarion_info@3x.png" />
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  // This computed property checks if the current route is one of the specified routes
  computed: {
    isHousesActive() {
      // List of route names that should activate the "Houses" link
      const isActive = [
        "houses",
        "detail",
        "edit-house",
        "create-house",
      ].includes(this.$route.name);
      // Log information for debugging purposes
      //console.log("Current route:", this.$route.name);
      //console.log("Is active?", isActive);
      return isActive;
    },
  },
};
</script>

<style scoped>
@media (min-width: 750px) {
  .mobile-container {
    display: none;
  }
}

@media (max-width: 750px) {
  .container {
    display: none;
  }
}

.mobile-container {
  width: 100%;
  background: var(--background2);
  height: 65px;
  position: fixed;
  bottom: 0;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
}

.mobile-navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.mobile-navbar img {
  width: 30px;
  height: 30px;
  margin-top: 20px;
}

.container {
  width: 100vw;
  background: var(--background2);
  height: 70px;
}
.navbar {
  display: flex;
  margin-left: 15%;
}

nav {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  width: 120px;
  margin-top: 15px;
}

.about,
.houses {
  margin-top: 15px;
  margin-left: 40px;
  font-size: 16px;
  font-family: var(--font-family);
  color: var(--tertiary2);
  text-decoration: none;
}

a.router-link-exact-active,
.houses.active {
  font-weight: bold;
  color: var(--primary-text);
}
</style>
