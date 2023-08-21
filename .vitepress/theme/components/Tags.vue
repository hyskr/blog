<template>
    <div class="xl:mx-64 lg:mx-32 mx-2">
            <h1 v-if="show" class="text-center text-gray-700 text-4xl font-bold my-10">Tags</h1>
            <TagList v-if="show" class="mt-10 mb-20" @currentTagChanged="currentTagChanged" :current-tag="currentTag" />
            <Posts v-if="show" :posts="postsByTag" :current-page="currentPage" @currentPageChanged="currentPageChanged" />
    </div>
</template>

<script setup lang="ts">
import { useData } from "vitepress"
import { ref, computed, watchEffect, onMounted } from "vue"
import Posts from './Posts.vue'
import TagList from './TagList.vue'
import { getStorageTag, setStorageTag, getPostsByTag } from "../helpers/tags"
import { getStoragePage } from "../helpers/pagination"

const currentPage = ref(1)
const allPosts = useData().theme.value.posts
const currentTag = ref('')
const postsByTag = computed(() => {
    return getPostsByTag(currentTag.value)
})
const show = ref(false)

onMounted(() => {

    currentPage.value = getStoragePage()
    currentTag.value = getStorageTag()

    watchEffect(() => {
        if (window.location.hash) {
            currentTag.value = decodeURIComponent(window.location.hash).replace('#', '');
        }
    })

    show.value = true
})

const currentTagChanged = (newTag) => {
    currentTag.value = newTag
    setStorageTag(newTag)
    currentPage.value = 1
}

const currentPageChanged = (newPageNum) => {
    currentPage.value = newPageNum
}
</script>