<template>
    <div ref="star" class="star">
        <span class="star-item" :class="item" v-for="(item, index) in itemClass" :key="index"></span>
    </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
    name: 'star',
    props: {
        score: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
 
        }
    },
    computed: {
        itemClass() {
            let result = [];
            let scoreNum = this.score;
            if (!scoreNum) return result;
            scoreNum = Math.floor(scoreNum * 2) / 2;
            let scoreInteger = Math.floor(scoreNum);
            let hasDecimal = scoreNum % 1;
            for (let i = 0; i < scoreInteger; i++) {
                result.push(CLS_ON);
            }
            if(hasDecimal) {
                result.push(CLS_HALF);
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }
    }
}
</script>

<style lang="scss" scoped>
    .star {
        display: flex;
        align-items: center;

        .star-item {
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-size: 20px 20px;
            margin: 0 10px;
            
            &.on {
              background-image: url("../assets/img/star48_on@3x.png");
            }
            &.half {
              background-image: url("../assets/img/star48_half@3x.png");
            }
            &.off {
               background-image: url("../assets/img/star48_off@3x.png");
            }
        }
    }
</style>
