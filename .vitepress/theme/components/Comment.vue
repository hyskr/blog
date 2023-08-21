<template>
    <div id="vcomment" v-if="theme?.vanila?.enable"></div>
</template>

<script setup lang="ts">

import { onMounted } from "vue"
import { useData } from 'vitepress'

const { theme } = useData()
onMounted(async () => {
    if (!theme.value?.vanila?.enable) return
    const Valine = await(await import('valine')).default
    new Valine(theme.value.vanila.config)
})
</script>

<style lang="scss">
#vcomment {
    @apply text-xl;

    .vwrap {
        @apply border rounded-none border-l-0 border-r-0 border-y-gray-400;

        .vsubmit {
            @apply text-base border-0 text-sky-700 hover:text-sky-500;
        }
    }

    .vheader .vinput {
        @apply hover:border-b-sky-700 focus:border-b-sky-500;
    }

    .vedit {
        .vicon {
            @apply fill-gray-700 hover:fill-sky-700;
        }
    }

    .vcount {
        @apply text-lg text-gray-700;
    }

    .vcards .vh {
        .vcontent p {
            @apply text-gray-600;
        }

        .vhead {
            .vnick {
                @apply text-teal-700 hover:text-teal-500;
            }
        }

        .vat {
            @apply text-rose-700 hover:text-rose-500;
        }
    }

    .vpower {
        a {
            @apply text-base;
        }
    }

    .vempty {
        @apply text-base;
    }
}
</style>