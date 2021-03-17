<template>
    <div>
        <app-header></app-header>
        <header class="body">
            <div class="title">
                StudyTogether
            </div>
        </header>
    </div>    
</template>

<script>
import Header from './UI/Header.vue'

export default {
    components: {
        'app-header': Header
    }
    
}
</script>

<style scoped>
.body {
    background-image: url("../assets/homebg.png");
    height: 60vh;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-position: center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    font-size: 10rem;
    font-weight: 700;
    line-height: 4.5rem;
    margin-bottom: 4rem;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    color: white;
}
</style>