<template>
    <div id="nav" class="text-center container">
      <div class="row">
        <div class="col">
          <table class="table table-active">
            <tr class="align-middle text-center">
              <td><router-link to="/"><img src="../assets/home.png" alt="">&nbsp; Home</router-link></td>
              <td><router-link to="/receipts"><img src="../assets/receipts.png" alt="">&nbsp; Receipts</router-link></td>
              <td><router-link to="/addreceipt"><img src="../assets/add.png" alt="">&nbsp;Add Receipt</router-link></td>
              <td><router-link to="/myaccount"><img src="../assets/user.png" alt="">&nbsp;My Account</router-link></td>
              <td><router-link to="/aboutus"><img src="../assets/about.png" alt="">&nbsp;About Us</router-link></td>
            </tr>
          </table>
        </div>
      </div>
      
    </div>
</template>

<style>
    #nav a {
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;
    }

    #nav img {
      width: 30px;
    }

    #nav a.router-link-exact-active {
      color: rgb(78, 185, 252);
    }

    #nav table {
      border: darkslategray solid 3px;
    }

    #nav td {
      border-left: darkseagreen dotted 2px;
    }
</style>

<script>
  export default {
    name: 'Navigation'
  }
</script>