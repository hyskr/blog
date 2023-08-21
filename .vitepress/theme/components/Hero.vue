<template>
  <div class="hero-title z-[-1]">
    <div class="py-10 sm:py-40 text-center title mb-2 sm:mb-10 z-[-1]">
      <h1 v-if="show" class="text-4xl sm:text-8xl font-bold mb-2 sm:mb-5 text-sky-600 htitle ">{{ title }}</h1>
      <!-- <h2 v-if="show" class="text-lg sm:text-2xl font-normal text-gray-600">{{ desc }}</h2> -->
    </div>
  </div>
  <!-- <div id="hero-space" class="h-430px"></div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useData } from "vitepress"

const data = useData()
const title = data.site.value.title
// const desc = data.site.value.description

const show = ref(false)

onMounted(() => {
  show.value = true
})
</script>

<style>
.hero-title {
  height: 450px;
}

.title {
  width: 100%;
  position: absolute;
  left: 0px;
  font-weight: bold;
  user-select: none;
}

.htitle {
  font-family: AliPuHui;
  z-index: 5;
  line-height: 1.375 !important;

  /* text-shadow: 0 8px 20px rgba(255, 192, 203, 0.4),
    0 8px 60px rgba(128, 0, 128, 0.4),
    0 8px 80px rgba(0, 255, 255, 0.8); */
}


.title:before {
  content: '';
  display: block;
  z-index: 10;
  pointer-events: none;
  position: absolute;
  top: -25%;
  left: 50%;
  transform: translateX(-50%) scale(1);
  width: 100%;
  height: 125%;
  opacity: 0.1;
	filter: blur(80px);
  will-change: transform;
  background: linear-gradient(135deg, rgb(114, 46, 209) 0%, rgb(22, 119, 255) 30%, rgb(245, 34, 45) 70%, rgb(19, 194, 194) 100%) 0% 0% / 200% 200%;
  animation: 20s ease 0s infinite normal none running glow;
}

@keyframes glow {
  0% {
    background-position: 0 -100%;
  }

  50% {
    background-position: 200% 50%;
  }

  100% {
    background-position: 0 -100%;
  }
}

@media (max-width: 640px) {
  .hero-title {
    height: 150px;
  }

  .htitle {
    text-shadow: none;
  }
}
</style>