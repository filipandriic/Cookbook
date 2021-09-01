<template>
  <div class="RecipeGroupContainer">
    <div
      class="RecipeGroup"
      v-for="group of Object.keys(formattedReceipts)"
      :key="group"
    >
      <h2 class="RecipeGroup__header">{{ group }}</h2>
      <div
        class="RecipeGroup__card"
        v-for="(receipt, index) of formattedReceipts[group]"
        :key="index"
      >
        <div class="RecipeGroup__row">
          <span>{{dictionary[language].name}}: {{ receipt.name }}</span>
          <span>{{dictionary[language].duration}}: {{ receipt.duration }} mins</span>
        </div>
        <div class="RecipeGroup__row">
          <span>{{dictionary[language].difficulty}}: {{ formatDifficulty(receipt.difficulty) }}</span>
          <span @click="selectedReceipt = receipt" class="RecipeGroup__link"
            >{{dictionary[language].viewRecipe}}</span
          >
        </div>
      </div>
    </div>
    <Recipe
      :selectedReceipt="selectedReceipt"
      v-if="selectedReceipt !== null"
      :close="() => selectedReceipt = null"
    />
  </div>
</template>

<style>
table {
  width: 100%;
  margin: auto;
}

.card {
  background-image: linear-gradient(rgb(225, 233, 230), rgb(240, 240, 240));
  box-shadow: 0 0 5px #585858;
  transition: 0.3s;
  border-radius: 5px;
  width: 40%;
  margin: auto;
}

.RecipeGroupContainer {
  padding: 20px 0 20px 20px;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.RecipeGroup {
  background: white;
  width: 100%;
  border-radius: 5px;
  margin-right: 20px;
  box-shadow: 0 0 5px #585858;
  height: 100%;
  overflow: auto;
}

.RecipeGroup__row {
  display: flex;
  justify-content: space-between;
}

.RecipeGroup__link {
  text-decoration: underline;
  color: #0d82eb;
}

.RecipeGroup__link:hover {
  cursor: pointer;
}

.RecipeGroup__card {
  padding: 12px;
  border: 1px solid #585858;
  border-radius: 5px;
  margin: 0px 16px 12px 16px;
}

.RecipeGroup__header {
  margin: 32px 0;
  font-family: cursive;
  color: darkseagreen;
}
</style>

<script>
import Recipe from "@/components/Recipe.vue";
import dictionary from "@/data/dictionary";

export default {
  data() {
    return {
      group: "All",
      receipts: [],
      formattedReceipts: {},
      selectedReceipt: null,
      language: "",
      dictionary,
    };
  },
  components: {
    Recipe,
  },
  methods: {
    formatDifficulty(difficulty) {
      let result = "";
      for (let i = 0; i < difficulty; i++) {
        result += "★";
      }

      return result;
    },
  },
  created() {
    this.language = localStorage.getItem("language");

    if (localStorage.getItem("receipts") == null) this.receipts = [];
    else this.receipts = JSON.parse(localStorage.getItem("receipts"));

    let formattedReceipts = {};
    for (let receipt of this.receipts) {
      if (!formattedReceipts[receipt.group]) {
        formattedReceipts[receipt.group] = [receipt];
        continue;
      }

      formattedReceipts[receipt.group] = [
        ...formattedReceipts[receipt.group],
        receipt,
      ];
    }

    this.formattedReceipts = formattedReceipts;
  },
};
</script>