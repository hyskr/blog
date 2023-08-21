<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <Disclosure as="nav" class="navbar border border-x-0 border-t-0 border-transparent nav" v-slot="{ open }" id="nav">
        <div class="mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="inline-flex items-center justify-center p-2 text-gray-700 hover:text-sky-700 focus:outline-none">
                        <span class="sr-only">Open main menu</span>
                        <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
                <div class="flex-1 flex sm:items-stretch justify-center sm:justify-start">
                    <div class="flex-shrink-0 flex mr-10 items-center">
                        <a href="/" class="">
                            <img v-if="theme.logo" style="border-radius: 1000px;"
                                class="justify-center lg:inline h-8 w-auto" :src="withBase(theme.logo)" alt="Logo" />
                        </a>

                        <a href="/"
                            class="logo text-xl font-bold text-gray-700 hover:text-sky-700 rounded-md md:inline ml-2">{{
                                site.title
                            }}</a>
                    </div>
                    <!-- <div class="hidden sm:block ml-auto">
                        <div class="flex-1 flex space-x-1 justify-end">
                            <div v-for="item in navigation" :key="item.text" class="px-3 py-2 inline-flex">
                                <a v-if="!item.sub" :href="item.link"
                                    :class="[isActive(route, withBase(item.link)) ? 'text-sky-700' : 'text-gray-500 hover:text-sky-700', 'text-base font-bold']"
                                    :aria-current="item.current ? 'page' : undefined">
                                    <DynamicIcon :iconname="item.icon" :class="'inline-block w-5 h-5 mr-1'" />
                                    <span>{{ item.text }}</span>
                                </a>
                            </div>
                        </div>
                    </div> -->
                    <div class="hidden sm:block ml-auto">
                        <div class="flex-1 flex space-x-1 justify-end">
                            <div v-for="item in navigation" :key="item.text" class="px-3 py-2 inline-flex relative">
                                <a v-if="!item.items" :href="item.link"
                                    :class="[isActive(route, withBase(item.link)) ? 'text-sky-700' : 'text-gray-500 hover:text-sky-700', 'text-base font-bold']"
                                    :aria-current="item.current ? 'page' : undefined">
                                    <DynamicIcon :iconname="item.icon" :class="'inline-block w-5 h-5 mr-1'" />
                                    <span>{{ item.text }}</span>
                                </a>
                                <a v-else
                                    :class="[is_open ? 'text-sky-700' : 'text-gray-500 hover:text-sky-700', 'text-base font-bold']">
                                    <a @mouseover="toggleDropdown" @mouseout="toggleDropup">
                                        <DynamicIcon :iconname="item.icon" :class="'inline-block w-5 h-5 mr-1'" />
                                        {{ item.text }}
                                        <svg :class="{ 'transform rotate-180': is_open }" class="h-4 w-4 inline-block ml-0"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>

                                        <transition name="fade">
                                            <div v-show="is_open"
                                                class="backdrop-blur-lg bg-white bg-opacity-50 absolute ml-[-1rem] mt-3 py-2 shadow z-[999999] w-[7.5rem] rounded">
                                                <!-- <div class="caret backdrop-blur-lg bg-white bg-opacity-50"></div> -->
                                                <a v-for="(itemx, index) in item.items" :key="index" :href="itemx.link"
                                                    target="_blank"
                                                    class="block px-4 py-2 text-gray-500 hover:bg-sky-700 hover:text-white">
                                                    <DynamicIcon :iconname="itemx.icon"
                                                        :class="'inline-block w-5 h-5 mr-1 mb-1'" />
                                                    <span>{{ itemx.text }}</span>
                                                </a>

                                            </div>
                                        </transition>
                                    </a>

                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <DisclosureButton v-for="item in navigation" :key="item.text" as="a" :href="item.link"
                    :class="[isActive(route, withBase(item.link)) ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100', 'block px-3 py-2 rounded-md text-base font-medium']"
                    :aria-current="item.current ? 'page' : undefined">{{ item.text }}</DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>




<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DynamicIcon from '../components/DynamicIcon.vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import { useRoute, useData, withBase } from "vitepress"
import { isActive } from '../helpers/utils'

const route = useRoute()

const { site, theme } = useData()
const navigation = theme.value.nav
onMounted(() => {
    window.addEventListener("scroll", e => {
        const nav = document.getElementById("nav")
        if (!nav) return
        if (window.scrollY > 0) {
            nav.style.boxShadow = "-3px -4px 11px black"
        } else {
            nav.style.boxShadow = ""
        }
    })
})


const is_open = ref(false)

const toggleDropdown = () => {
    is_open.value = true
}

const toggleDropup = () => {
    is_open.value = false
}

</script>

<style scoped>
* {
    font-family: "Neutraface Text";
}

.fade-enter,
.fade-enter-active,
.fade-enter-to,
.fade-leave,
.fade-leave-active,
.fade-leave-to {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.nav {
    position: fixed;
    width: 100%;
    height: auto;
    /* background-color: white;     */
    backdrop-filter: blur(6px);
    z-index: 999;
    top: 0px;
    transition: .2s;
    box-shadow: none;
    user-select: none;
}

/* .nav:hover {
    box-shadow: -3px -4px 11px black; 
    border-bottom: 1px solid #eef2f8;
} */

.nav::after {
    pointer-events: none;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-50%) scale(1.5);
    width: 100%;
    height: 100%;
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
</style>