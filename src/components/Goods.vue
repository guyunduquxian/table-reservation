<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
        <ul>
            <li v-for="(item, index) in goods" :key="index" 
                class="menu-item"
                :class="{'current': currentIndex === index}"
                @click="selectMenu($event, index)" 
                >
                <div class="item-content">
                    <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                    <span class="text">{{item.name}}</span>
                </div>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrap">
      <ul>
        <li v-for="(group, groupIndex) in goods" :key="groupIndex" class="food-list" ref="foodItem">
          <h1 class="title">{{group.name}}</h1>
          <ul>
            <li v-for="(item, index) in group.foods" :key="index" class="food-item" @click="FoodDetail(item)">
              <div class="icon">
                <img width="60" height="60" :src="item.icon">
              </div>
              <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.description}}</p>
                <div class="extra">
                  <span class="count">月售{{item.sellCount}}份</span>
                  <span>好评率{{item.rating}}%</span>
                </div>
                <div class="price-wrapper">
                    <div class="price">
                        <span class="now">￥{{item.price}} </span>
                        <span class="old" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <v-cartControl :foods="item"></v-cartControl>
                    </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="shopCart-wrap">
        <v-shopCart :foodsList="selectFoods"></v-shopCart>
    </div>
    <div class="food-wrap">
        <v-foodDetail :food="selectFood" ref="foods"></v-foodDetail>
    </div>
  </div>

</template>

<script>
  import CartControl from "@/components/CartControl.vue";
  import ShopCart from "@/components/ShopCart.vue";
  import FoodDetail from '@/components/FoodDetail.vue';

  export default {
    components: {
      'v-shopCart': ShopCart,
      'v-cartControl': CartControl,
      'v-foodDetail': FoodDetail
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        changValue: 0,
        scrollY: 0,
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        selectFood: {},
        foodShow: false
      }
    },
    computed: {
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        },
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        },
    },
    created() {
        this.$axios.get("/api/index")
        .then( res => {
            console.log(res.data.goods);
            this.goods = res.data.goods;
        })
        .catch( error => {
            console.log(error);
        });
    },
    mounted() {
        let that = this;
        this.$refs.foodsWrap.addEventListener('scroll', function(e){
            let scrollTop = e.srcElement.scrollTop;
            if(scrollTop > 0) {
                document.body.scrollTop = 134;
            } 
            that.scrollY = Math.abs(Math.round(scrollTop));
        });

        setTimeout( () => {
            this.changValue = 1;
            let foodList = this.$refs.foodItem;
            // console.log(foodList.length);
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
            // console.log(this.listHeight);
        }, 0);

    },
    methods: {
        selectMenu(event, index) {
            document.body.scrollTop = 134;
            // this.currentIndex = index;
            this.$refs.foodsWrap.scrollTop = this.listHeight[index];
        },
        FoodDetail(food) {
            this.selectFood = food;
            this.$refs.foods.show();
        }
    }
  }
</script>

<style lang="scss" scoped>
    .goods {
        width: 100%;
        display: flex;
        position: absolute;
        top: 40px;
        left: 0;
        bottom: 0;
        margin-bottom: 48px;
        
        .menu-wrapper {
            width: 80px;
            background-color: #f3f5f7;
            padding-bottom: 8px;
            overflow-y: auto;
            
            &::-webkit-scrollbar {
                width: 0;
                height: 0;
            }

            .menu-item {
                width: 80px;
                height: 60px;
                padding: 0 12px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                display: flex;
                align-items: center;
                box-sizing: border-box;

                &:last-child {
                    border-bottom: none;
                }

                &.current {
                    position: relative;
                    z-index: 10;
                    background-color: #fff;
                    font-weight: 700;
                }

                .item-content {

                    .icon {
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                        &.decrease {
                            background-image: url("../assets/img/decrease_4@3x.png");
                        }
                        &.discount {
                            background-image: url("../assets/img/discount_4@3x.png");
                        }
                        &.guarantee {
                            background-image: url("../assets/img/guarantee_4@3x.png");
                        }
                        &.invoice {
                            background-image: url("../assets/img/invoice_4@3x.png");
                        }
                        &.special {
                            background-image: url("../assets/img/special_4@3x.png");
                        }
                    }
                    .text {
                        font-size: 14px;
                        line-height: 16px;
                    }
                }
            }
        }

        .foods-wrapper {
            flex: 1;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width:0;
                height:0
            }
            
            .food-list {

                .title {
                    padding-left: 14px;
                    height: 26px;
                    line-height: 26px;
                    border-left: 2px solid #d9dde1;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                    background-color: #f3f5f7;
                }

                .food-item {
                    display: flex;
                    margin: 18px;
                    padding-bottom: 18px;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    position: relative;
                    z-index: 0;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    .icon {
                        width: 60px;
                        margin-right: 10px;
                    }

                    .content {
                        flex: 1;
                    
                        .name {
                            margin: 2px 0 8px 0;
                            height: 14px;
                            line-height: 16px;
                            font-size: 14px;
                            color: rgb(7, 17, 27);
                        }

                        .desc, .extra {
                            line-height: 14px;
                            font-size: 12px;
                            color: rgb(147, 153, 159);
                        }

                        .desc {
                            margin-bottom: 8px;
                        }

                        .extra {

                            .count {
                                margin-right: 12px;
                            }
                        }

                        .price-wrapper {
                            height: 30px;
                            margin-top: 5px;
                            display: flex;
                            align-items: center;

                            .price {
                                flex: 1;

                                .now {
                                    margin-right: 8px;
                                    font-size: 14px;
                                    color: rgb(240, 20, 20);
                                }

                                .old {
                                    text-decoration: line-through;
                                    font-size: 10px;
                                    color: rgb(147, 153, 159);
                                }
                            }

                            .cartcontrol-wrapper {
                                position: absolute;
                                right: 0;
                                z-index: 10;
                            }
                        }   
                    }
                }
            }
        }

        .shopCart-wrap {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            z-index: 99;
        }

        .food-wrap {
            // position: fixed;
            // top: 0;
            // left: 0;
            // width: 100%;
            // height: 100%;
            // z-index: 89;
        }
    }
</style>