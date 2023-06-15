<template>
  <div
    class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-screen h-screen bg-black z-50"
  >
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <svg id="loading" viewBox="25 25 50 50">
        <circle id="circleLoading" r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  </div>
</template>

<style>
#loading {
  width: 2.5em;
  transform-origin: center;
  animation: rotate4 0.6s linear infinite;
}

#circleLoading {
  fill: none;
  stroke: #00dc82;
  stroke-width: 5;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
