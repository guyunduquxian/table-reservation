<template>
    <div class="cartControl">
        <i v-show="foods.count" class="iconfont icon-Minus" @click="sub"></i>
        <span v-show="foods.count" ref="num">{{ foods.count }}</span>
        <i class="iconfont icon-Add" @click="add"></i>
    </div>

</template>

<script>
  import Vue from 'vue';

  export default {
    props: {
        foods: Object
    },
    data() {
      return {

      }
    },
    computed:{
	
	},
    methods: {
        add(event) {
            if(!this.foods.count) {
                Vue.set(this.foods, 'count', 1);  //需要引入vue,否则报错 Vue is not defined

            } else {
                this.foods.count++;
            }    
        },
        sub() {
            this.foods.count--;
        }
    }
  }
</script>

<style lang="scss" scoped>
    .cartControl {
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        
        > span {
            min-width: 25px;
            text-align: center;
        }

        .icon-Minus {
            color: rgb(0, 160, 220);
        } 
        .icon-Add {
            color: rgb(0, 160, 220);
        } 
    }
</style>