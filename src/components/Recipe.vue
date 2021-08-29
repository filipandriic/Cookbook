<template>
  <div class="ModalContainer">
    <div class="ModalContent">
    <span @click="close" class="ModalContent__close">X</span>
    <h2>Name: {{ selectedReceipt.name }}</h2>
    <h2>Duration: {{ selectedReceipt.duration }} mins</h2>
    <h2>Difficulty: {{ formatDifficulty(selectedReceipt.difficulty) }}</h2>
    <h2>Instructions: {{ selectedReceipt.instructions }}</h2>
    <h2>Group: {{ selectedReceipt.group }}</h2>
    </div>
</div>
</template>

<style>
.ModalContainer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);

  display: flex;
  align-items: center;
  justify-content: space-around;
}

.ModalContent {
  padding: 24px;
  width: 50%;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 5px #585858;
  text-align: left;
  position: relative;
}

.ModalContent__close {
  position: absolute;
  right: 24px;
  top: 12px;
  font-size: 24px;
}

.ModalContent__close:hover {
  cursor: pointer;
}
</style>

<script>
export default {
  name: "Recipe",
  methods: {
    formatDifficulty(difficulty) {
      let result = '';
      for (let i = 0; i < difficulty; i++) {
        result += '★'
      }

      return result;
    }
  },
  props: ['selectedReceipt', 'close']
};
</script>