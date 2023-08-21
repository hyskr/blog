<template>
    <div class="mx-5 my-5">
        <div :class="[hasTOC ? 'md:ml-[68] lg:ml-80 lg:mr-10' : 'md:mx-32', 'md:mt-20 mx-2']">
            <PostTitle :title="title" :date="date" :author="author" :tags="tags" :islink="false" :titlelink="''" />
            <div class="post mt-16">
                <Content />
            </div>
            <div class="comment mt-40">
                <Comment />
            </div>
        </div>

        <TOC v-if="hasTOC" :toc="toc" />

        <DynamicIcon :iconname="'arrow-circle-up'"
            class="hidden sm:block fixed sm:right-8 sm:bottom-8 w-10 h-10 text-gray-600 hover:text-sky-800 cursor-pointer"
            @click="backToTop = true" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { useData } from "vitepress"

import PostTitle from "./PostTitle.vue"
import DynamicIcon from '../components/DynamicIcon.vue'
import Comment from './Comment.vue'
import TOC from "./TOC.vue"

import { getTOC } from '../helpers/toc'

const toc = getTOC()
const hasTOC = computed(() => toc.length != 0)

const title = useData().page.value.frontmatter.title
const author = useData().page.value.frontmatter.author
const tags = useData().page.value.frontmatter.tags
const date = useData().page.value.frontmatter.date

const backToTop = ref(false);

watch(backToTop, (newValue) => {
    if (newValue) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        backToTop.value = false;
    }
});

</script>
