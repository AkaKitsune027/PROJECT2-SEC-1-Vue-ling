<script setup>

</script>

<template>
    <div class="flex flex-col px-1">
        <div class="flex-none bg-[#ACC6AA] text-center text-lg font-rowdies">Ingredient</div>
        <div class="flex-auto bg-zinc-700 p-2 flex flex-col items-center gap-2 max-h-[28rem] overflow-y-auto">
            <slot>
                <div class="text-white">No Ingredient</div>
            </slot>
        </div>
        <div class="bg-zinc-700 h-[4rem] flex justify-center items-center">
            <button class="bg-[#ACC6AA] p-2 rounded-xl h-fit"><img src="/src/assets/bag.svg" alt="shop"
                    class="h-8"></button>
        </div>

    </div>
</template>

<style scoped></style>