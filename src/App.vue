<template>
  <div id="app">
    <HomeView />
  </div>
</template>
<script>
  
import HomeView from "./views/HomeView"
export default {
  components:{
    HomeView
  }
  
}
</script>
<style lang="less">
  body {margin: 0;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fff;
  text-align: center;
  color: #2c3e50;
  
}
.el-button{
  line-height: 1 !important;
  // background: #fff !important;
  color: #606266 !important;
}
.el-button--primary{
  color: #fff !important;
  
    background-color:  rgb(33, 133, 208) !important;
    border-color: rgb(33, 133, 208) !important;
}
.el-range-editor.is-active, .el-range-editor.is-active:hover, .el-select .el-input.is-focus .el-input__inner{
  border-color: rgb(33, 133, 208) !important;
}
.el-radio__input.is-checked .el-radio__inner
{
  
  background-color:  rgb(33, 133, 208) !important;
    border-color: rgb(33, 133, 208) !important;
}

.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner
,.el-checkbox__input.is-checked+.el-checkbox__label
{
  
    border-color: rgb(33, 133, 208) !important;
}

.el-table__body tr.current-row>td.el-table__cell, .el-table__body tr.selection-row>td.el-table__cell{
  background-color: #aad2ff;
}
.el-form-item__label{
  color: #3d3d3d !important;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
a[disabled], input[disabled], button[disabled], select[disabled], select[disabled] + label, textarea[disabled], a[readonly], input[readonly], button[readonly], textarea[readonly], input[type="radio"][disabled], input[type="radio"][disabled] + label, input[type="checkbox"][disabled], input[type="checkbox"][disabled] + label, .DisabledButton{
  opacity: 1;
  color: #3d3d3d;
}
.ModernUI button:hover, .ModernUI div.Push button:hover
.el-button--primary:focus, .el-button--primary:hover{
  background: #2185d0 !important;
 
}
.el-message-box{
   max-width: 80% !important;
}
</style>
