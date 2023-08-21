<template>
    <footer style="font-size: 15px;"
        class="text-center align-bottom text-gray-500 font-normal text-lg py-3 mt-auto border border-t-gray-200">
        <span>Copyright © </span>
        <a href="https://github.com/hyskr" target="_blank" class="text-sky-600 hover:text-sky-700">Heziah</a>
        <span class="mx-3">|</span>
        <span>2022 - {{ year }}</span>
    </footer>
</template>

<script setup lang="ts">
import DynamicIcon from '../components/DynamicIcon.vue'

const year = (new Date()).getFullYear()
</script>