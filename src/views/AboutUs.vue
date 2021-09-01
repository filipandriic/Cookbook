<template>
  <div class="user">
    <h1 class="title">HelpmeChef.com</h1>
    <hr />
    <div class="about">
      <h3>
        <b>{{ dictionary[language].whatwedo }}</b>
      </h3>
      <br />
      {{ dictionary[language].aboutus_1 }}
      <br /><br />
      <b>HelpmeChef.com</b> {{ dictionary[language].aboutus_2 }}
    </div>
    <hr />
    <div class="about">
      <h3>
        <b>{{ dictionary[language].awards }}</b>
      </h3>
      <br />
      <div class="award">
        <img src="../assets/weblog.png" alt="" />
        <p>
          {{ dictionary[language].award_1 }}
        </p>
      </div>
      <br /><br /><br />
      <div class="award">
        <img src="../assets/IAWTV_Awards_logo.png" alt="" />
        <p>
          {{ dictionary[language].award_2 }}
        </p>
      </div>
    </div>
    <hr />
    <div>
      <div class="about">
        <h3>
          <b>{{ dictionary[language].whereyoucanfindus }}</b>
        </h3>
      </div>
      <div id="map" style="width: 100%; height: 530px">
        <div class="map-container"></div>
      </div>
    </div>
    <hr />
    <div class="about">
      <h3>
        <b>{{ dictionary[language].contact }}</b>
      </h3>
      <b>{{ dictionary[language].phone }}:&nbsp;</b>+381630000111
      <br />
      <b>{{ dictionary[language].email }}:&nbsp;</b
      >customersupport@helpmechef.com
      <br />
    </div>
  </div>
</template>

<style>
.user {
  background: white;
  box-shadow: 0 0 5px #585858;
  transition: 0.3s;
  border-radius: 5px;
  width: 80vw;
  margin: auto;
  margin-top: 20px;
}

.title {
  font-family: cursive;
  color: darkseagreen;
  padding-top: 10px;
}

.about {
  text-align: left;
  margin: 20px;
}

.about img {
  width: 15%;
}

.award {
  display: flex;
  justify-content: space-around;
}
</style>

<script>
import dictionary from "@/data/dictionary";
export default {
  data() {
    return {
      dictionary,
      language: "",
    };
  },
  mounted() {
    L.mapquest.key = "RqHWAPqGGxE6CbzOEy1IkIaCRqggRr8a";

    var map = L.mapquest.map("map", {
      center: [44.8125, 20.4612],
      layers: L.mapquest.tileLayer("map"),
      zoom: 13,
    });

    L.marker([44.8125, 20.4612], {
      icon: L.mapquest.icons.marker(),
      draggable: false,
    })
      .bindPopup("HelpmeChef.com")
      .addTo(map);
  },
  created() {
    this.language = localStorage.getItem("language");
  },
};
</script>