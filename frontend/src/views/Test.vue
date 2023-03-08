<script scoped>
import 'animate.css'

export default {
  name: 'Test',
}
</script>

<template>
  <div>
    <div class="layout-flex">
      <h1 class="animate__animated animate__swing animate__repeat-2">HELLO</h1>
      <img class="animate__animated animate__flip animate__repeat-3" src="../../public/images/kth-logo.png" alt="kth logo" height="100px" width="100px" />
    </div>
    <md-card>
      <md-card-header>
        <h3 class="moving">Test1</h3>
        <h2 class="slide-right">HELLO!</h2>
      </md-card-header>
    </md-card>

    <md-card>
      <md-card-header>
        <h3 class="moving">Test2</h3>
        <h2 class="slide-right">Hej!</h2>
      </md-card-header>
    </md-card>
  </div>
</template>

<style scoped>
.layout-flex {
  display: flex;
  justify-content: center;
}

img {
  margin: 2rem;
}

/* Moving animation */
.moving {
  width: 100px;
  height: 100px;
  background-color: #448aff;
  position: relative;
  animation-name: moving;
  animation-duration: 3s;
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
    left: 200px;
    top: 0px;
  }
  50% {
    background-color: orange;
    left: 400px;
    top: 0px;
  }
  75% {
    background-color: green;
    left: 600px;
    top: 0px;
  }
  100% {
    background-color: orange;
    left: 0px;
    top: 0px;
  }
}

/* Slide Animation */
.slide-right {
  width: 50%;
  height: 30px;
  background: #8eb7f0;
  animation-name: slide-right-animation;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  /* animation-iteration-count: initial; */
}
@keyframes slide-right-animation {
  0% {
    width: 0;
    background: pink;
  }
  50% {
    background: yellow;
  }
  100% {
    width: 50%;
    background: #448aff;
  }
}
</style>
