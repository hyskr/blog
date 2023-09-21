<template>
    <footer style="font-size: 15px;"
        class="text-center align-bottom text-gray-500 font-normal text-lg py-3 mt-auto border border-t-gray-200">
        <span>Copyright © </span>
        <a href="https://github.com/hyskr" target="_blank" class="text-sky-600 hover:text-sky-700">Heziah</a>
        <span class="mx-3">|</span>
        <span>2022 - {{ year }}</span>
        <br/>
        <span v-if="enableHome">
            <a href="https://beian.miit.gov.cn/" target="_blank">备案号：冀ICP备2022014997号-2</a>
        </span>
    </footer>
</template>

<script setup lang="ts">
import DynamicIcon from '../components/DynamicIcon.vue'

import { computed } from 'vue'
import { useData } from 'vitepress'

const { site, page, theme, frontmatter } = useData()

const year = (new Date()).getFullYear()
const enableHome = computed(() => !!frontmatter.value.home)

</script>