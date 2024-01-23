<template>
  <div class="container">
    <div class="top">
      <h1 class="top-text">About</h1>
    </div>

    <div class="title">
      <h1>About DTT Real Estate</h1>
    </div>

    <p class="primay-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
      sit amet, consectetur adipiscing elitelit blandit porta ac sit amet
      ipsuLorem ipsum dolor sit amet, consectetur adipiscing elitsum. Proin nec
      turpis erat. Morbi faucibus diam in auctor Lorem ipsum dolor sit amet,
      consectetur adipiscing elitProin nec turpis erat. Morbi faucibus diam in
      auctor Lorem ipsum dolor sit amet, consectetur adipiscing elit Proin nec
      turpis erat. Morbi faucibus diam in auctor Lorem ipsum dolor sit amet,
      consectetur adipiscing elitProin nec turpis erat.
    </p>

    <p class="second-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a
      congue dui, nec elementum ex. Donec mattis velit sit amet velit blandit
      porta ac sit amet.
    </p>

    <h1 class="bottom-title">Design and Development</h1>

    <div class="bottom">
      <img
        class="bottom-logo"
        src="@/assets/images/img_logo_dtt@3x.png"
        alt="logo"
      />
      <div class="bottom-info">
        <p>By DTT</p>
        <a href="https://www.d-tt.nl" class="bottom-link">www.d-tt.nl</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-left: 15%;
}

.top {
  display: none;
}

.title {
  padding-top: 40px;
  font-size: 100px;
}

.primay-text {
  width: 70%;
  font-family: var(--font-family-secondary);
  line-height: 1.5em;
  color: var(--secondary-text);
}

.second-text {
  width: 70%;
  font-family: var(--font-family-secondary);
  line-height: 1.5em;
  color: var(--secondary-text);
}

.bottom {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.bottom-logo {
  max-width: 250px;
  max-height: 100px;
}

.bottom-info {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  font-size: 18px;
}
.bottom-info p {
  margin: 0;
  padding: 0;
}

.bottom-link {
  text-decoration: none;
}

h1 {
  font-family: var(--font-family);
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-text);
}

@media screen and (max-width: 750px) {
  .container {
    margin-left: 5px;
  }
  .top {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 4% 0 5% 0;
  }

  .title {
    padding-top: 0;
    font-size: 12px;
    margin: 0 3% 0 3%;
  }

  .primay-text,
  .second-text {
    width: 90%;
    margin: 0 3% 5% 3%;
    font-family: var(--font-family);
    line-height: 1.5em;
    color: var(--secondary-text);
  }

  .bottom-title {
    width: 90%;
    margin: 0 3% 1% 3%;
  }

  .bottom {
    padding-top: 15px;
    display: flex;
    width: 90%;
    margin: 0 3% 0 3%;
  }

  .bottom-logo {
    width: 30%;
    height: 30%;
    margin: 0 0 0 0;
  }
  .bottom-info {
    font-size: 15px;
    margin-left: 20px;
  }

  h1 {
    font-family: var(--font-family);
    font-size: 18px;
    font-weight: bold;
    color: #000000;
  }
}
</style>
