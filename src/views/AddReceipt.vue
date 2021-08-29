<template>
  <div>

    
    
    <div class="login" v-if="loggedin === ''">
      <h5>
        Please <a :href="'/myaccount'">login</a> to add receipt.
      </h5>
    </div>

    <div class="addreceipt" v-else>
      <h2>Add receipt</h2>
      <hr>
      <table>
        <tr>
          <td>Name:</td>
          <td><input type="text" name="" id="" v-model="name"></td>
        </tr>
        <tr>
          <td>Group:</td>
          <td>
            <select name="" id="" v-model="group">
              <option value="Appetizer">Appetizer</option>
              <option value="Main course">Main course</option>
              <option value="Dessert">Dessert</option>
              <option value="Snack">Snack</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Preparation instructions:</td>
          <td><input type="text" name="" id="" v-model="instructions"></td>
        </tr>
        <tr>
          <td>Duration:</td>
          <td><input type="text" name="" id="" v-model="duration">minutes</td>
        </tr>
        <tr>
          <td>Difficulty:</td>
          <td>
            <select name="" id="" v-model="difficulty">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </td>
        </tr>
        <br>
        <tr>
          <td colspan="2">
            <button @click="addReceipt">Add receipt</button>
          </td>
        </tr>
      </table>
      <span style="color: red">{{this.error}}</span>
      <span style="color: green">{{this.success}}</span>
    </div>

  </div>
</template>

<style>
    table {
        margin: auto;
    }
</style>

<script>
export default {
  data() {
    return {
      loggedin: '',
      name: '',
      group: '',
      instructions: '',
      duration: '',
      difficulty: '',
      error: '',
      success: '',
      receipts: []
    }
  },
  methods: {
    addReceipt() {
      for (let i = 0; i < this.receipts.length; i++) {
        if (this.receipts[i].name == this.name && this.receipts[i].user == this.loggedin.username) {
          this.error = "You already added receipt for this meal.";
          return;
        }
      }

      let receipt = {
        name: this.name,
        group: this.group,
        instructions: this.instructions,
        duration: this.duration,
        difficulty: this.difficulty,
        user: this.loggedin.username
      };

      this.error = '';
      this.success = 'Added recipe';
      this.receipts.push(receipt);
      localStorage.setItem('receipts', JSON.stringify(this.receipts));
    }
  },
  created() {
    if (sessionStorage.getItem('user') != null) {
        this.loggedin = JSON.parse(sessionStorage.getItem('user'));
        if (this.loggedin == 'register')
          this.loggedin = '';
      }
      else
        this.loggedin = '';

    if (localStorage.getItem('receipts') == null)
      this.receipts = [];
    else
      this.receipts = JSON.parse(localStorage.getItem('receipts'));
  }
}
</script>