<template>
    <div class="shop">
        <v-header :seller="seller"></v-header>
        <div class="tab-wrapper">
            <div class="tab">
                <div v-for="(item, index) in tabData" :key="index" class="tab-item" :class="{ active: select === index }" @click="changeSelect(index)">{{ item }}</div> 
            </div>
            <div class="tab-content">
                <div v-show="select === 0">
                    <v-goods @send="handle"></v-goods>
                </div>
                <div v-show="select === 1">
                    <v-ratings :seller="seller"></v-ratings>
                </div>
                <div v-show="select === 2">
                    <v-seller :seller="seller"></v-seller>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Goods from '@/components/Goods.vue'
import Ratings from '@/components/Ratings.vue'
import Seller from '@/components/Seller.vue'

export default {
    name: 'shop',
    components: {
        'v-header': Header,
        'v-goods': Goods,
        'v-ratings': Ratings,
        'v-seller': Seller
    },
    data() {
      return {
        tabData: ["商品","评论","商家"],  
        select: 0,
        seller: {}
      }
    },
    created() {
        this.$axios.get("/api/index")
        .then( res => {
            // console.log(res.data.seller);
            this.seller = res.data.seller;
        })
        .catch( error => {
            console.log(error);
        });
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
                box-sizing: border-box;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);

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
