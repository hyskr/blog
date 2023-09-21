<template>
    <Hero />
    <div class="flex sm:flex-nowrap flex-wrap flex-row xl:mx-28 lg:mx-7 mx-2">
        <div class="basis-full px-2 md:px-6" style="max-width: 70%; margin-left: 15%;">
            <Posts v-if="show" :posts="posts" :current-page="currentPage" @currentPageChanged="currentPageChanged" />
        </div>
    </div>
</template>

<script setup lan="ts">
import Posts from '../components/Posts.vue'
import Hero from '../components/Hero.vue'
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'

import { getStoragePage } from "../helpers/pagination.ts"

const posts = useData().theme.value.posts
const currentPage = ref(1)

const show = ref(false)

onMounted(() => {
    currentPage.value = getStoragePage()
    show.value = true
})

const currentPageChanged = (newPageNum) => {
    currentPage.value = newPageNum
}
</script>