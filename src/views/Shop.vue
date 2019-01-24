<template>
    <div class="shop">
        <v-header></v-header>
        <div class="tab-wrapper">
            <div class="tab">
                <div v-for="(item, index) in tabData" :key="index" class="tab-item" :class="{ active: select === index }" @click="changeSelect(index)">{{item}}</div> 
            </div>
            <div class="tab-content">
                <v-goods @send="handle"></v-goods>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Goods from '@/components/Goods.vue'

export default {
    name: 'shop',
    components: {
        'v-header': Header,
        'v-goods': Goods
    },
    data() {
      return {
        tabData: ["商品","评论","商家"],  
        select: 0
      }
    },
    methods: {
      changeSelect(index) {
        // console.log(index);
        this.select = index;
      },
      handle() {

      }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
    .shop {
        width: 100%;
        height: 100%;

        .tab-wrapper {
            position: relative;
            height: 100%;

            .tab {
                display: flex;
                height: 40px;
                border: 1px solid rgba(7, 17, 27, 0.1);

                .tab-item {
                    flex: 1;
                    text-align: center;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    color: rgb(77, 85, 93);

                    &.active {
                    color: rgb(240, 20, 20);
                    }
                
                }
            }

            .tab-content {
                
            }
        }
    }

</style>
