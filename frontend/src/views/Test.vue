<script scoped>
//import 'animate.css'
import animation from 'animate.css'
export default animation
</script>

<template>
  <div>
    <h1 class="animate__fadeInTopLeft animate__repeat-2">HELLO</h1>
    <img src="../../public/images/kth-logo.png" alt="kth logo" height="100px" width="100px" />
    <md-card>
      <md-card-header>
        <h3 class="animate__fadeInTopLeft animate__repeat-2">Hej! This is a test line</h3>
        <h2>HELLO!</h2>
      </md-card-header>
    </md-card>
  </div>
</template>

<style scoped>
h2 {
  width: 100px;
  height: 100px;
  background-color: lightblue;
  position: relative;
  animation-name: moving;
  animation-duration: 2s;
  margin: 2rem;
}

@keyframes moving {
  0% {
    background-color: pink;
    left: 0px;
    top: 0px;
  }
  25% {
    background-color: yellow;
    left: 50px;
    top: 0px;
  }
  50% {
    background-color: orange;
    left: 50px;
    top: 50px;
  }
  75% {
    background-color: green;
    left: 0px;
    top: 50px;
  }
  100% {
    background-color: orange;
    left: 0px;
    top: 0px;
  }
}
</style>
