<template>
    <div class="home">
        <img src="../assets/success.png" alt="">
        <div>{{now}}的信息已提交成功！</div>
    </div>
</template>

<script>
    import vue from 'vue';
    import dayjs from 'dayjs'

    export default {
        name: 'home',
        components: {},
        data() {
            return {
                now: dayjs().format('YYYY-MM-DD'),
            }
        },
        methods: {
        }
    }
</script>
<style scoped lang="scss">
    .home {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        font-size: 15px;
        font-weight: 500;
    }
    img {
        margin: 33px auto 26px;
        display: block;
        width: 37px;
    }
</style>
