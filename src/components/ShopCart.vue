<template>
  <div class="shopCart">
    <div class="content-wrap">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="icon-wrapper">
            <div class="icon" :class="{highlight: foodsSum > 0}">
              <i class="iconfont icon-gouwuche" :class="{ highlight: foodsSum > 0}"></i>
            </div>
            <div v-show="foodsSum>0" class="num">{{ foodsSum }}</div>
          </div>
          <div class="price">￥{{ money }}</div> 
          <div class="desc">另需配送费￥12元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass"> {{ payDesc }} </div>
        </div>
      </div>
    </div>
    <!-- <div class="ball-container">
      <div transition="drop" v-for="(ball, index) in balls" :key="index" v-show="ball.show" class="ball">
        <div class="inner inner-hook"></div>
      </div>
    </div> -->
    <transition name="shopCart-list-fade">
      <div class="shopCart-list-wrap" v-show="listShow">
        <div class="shopCart-list">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="lists">
            <ul>
              <li class="food" v-for="(item, index) in foodsList" :key="index">
                  <span class="name">{{item.name}}</span>
                
                  <div class="price">
                      <span>￥{{item.price*item.count}}</span>
                  </div>
                  <v-cartControl :foods="item"></v-cartControl>
              </li>
            </ul>
          </div>
        </div> 
        <div class="list-mask"></div>
      </div>
    </transition>
  </div>
  
</template>

<script>
  import CartControl from "@/components/CartControl.vue";

  export default {
    components: {
      'v-cartControl': CartControl
    },
    props: {
        foodsList: Array
    },
    data() {
      return {
         fold: true,
         diffPrice: 20
      }
    },
    watch: {
     
    },
    computed: {
        money() {
            let money = 0;
            this.foodsList.forEach(item => {
              money += item.price * item.count;
            });
            return money;
        },
        foodsSum() {
            let sum = 0;
            this.foodsList.forEach(item => {
              sum += item.count;
            });
            return sum;
        },
        listShow() {
            if (!this.foodsSum) {
              this.fold = true;
              return false;
            }
            return !this.fold;
        },
        payDesc() {
            if(this.money === 0) {
                return `￥${this.diffPrice}元起送`;
            } else if(this.money < this.diffPrice) {
                let diff = this.diffPrice - this.money;
                return `还差￥${diff}元起送`;
            } else {
                return `去结算`;
            }
        },
        payClass() {
            if(this.money < this.diffPrice) {
                return 'not-enough';
            } else {
                return 'enough';
            }
        }
    },
    created() {
     
    },
    mounted() {
      let height = window.screen.height;
      this.$refs.lists.style.maxHeight = height * 0.6 + "px";
    },
    methods: {
      toggleList() {
        if(!this.foodsSum) {
            return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.foodsList.forEach((food) => {
          food.count = 0;
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .shopCart {

    .content-wrap {
      position: relative;
      z-index: 40;
      padding-top: 12px;
      background-color: #fff;

      .content {
        background-color: #141d27;
        color: rgba(255, 255, 255, 0.4);
        display: flex;

        .content-left {
          flex: 1;
          display: flex;

          .icon-wrapper {
            position: relative;
            top: -10px;
            margin: 0 12px;
            padding: 6px;
            width: 56px;
            height: 56px;
            box-sizing: border-box;
            border-radius: 50%;
            background-color: #141d27;
            min-width: 56px;

            .icon {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              text-align: center;
              background-color: #2b343c;

              &.highlight {
                background: rgb(0, 160, 220);
              }

              .icon-gouwuche {
                line-height: 44px;
                font-size: 24px;
                color: #80858a;
                
                &.highlight {
                  color: #fff;
                }
              }
            }

            .num {
              position: absolute;
              top: 0;
              right: 0;
              min-width: 16px;
              height: 16px;
              line-height: 16px;
              text-align: center;
              border-radius: 16px;
              font-size: 12px;
              color: #fff;
              background-color: rgb(240, 20, 20);
              padding: 0 5px;
              box-sizing: border-box;
              font-weight: 700;
            }
          }

          .price {
            line-height: 48px;
            padding-right: 12px;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 16px;
            font-weight: 700;

            &.highlight {
              color: #fff;
            }
          }

          .desc {
            height: 48px;
            padding: 0 12px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            line-height: 16px;
            font-size: 12px;
          }
        }

        .content-right {
          width: 100px;
        
          .pay {
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-size: 12px;
            font-weight: 700;
            color: #fff;
            background-color: #2b333b;

            &.not-enough {
              background-color: #2b333b; 
            }

            &.enough {
              background-color: #00b43c;
            }
          }
        }
      }
    }
    /*
    .ball-container {

      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;

        &.drop-transition {
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

          .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgb(0, 160, 220);
            transition: all 0.4s linear;
          }
        }
      }
    }
    */

    // .shopCart-list-fade-enter, .shopCart-list-fade-leave-to {
    //     // transform: translate(0, 0);
    // }
    // .shopCart-list-fade-enter-to, .shopCart-list-fade-leave {
    //     // transform: translate(0, -100%);
    // }
    // .shopCart-list-fade-enter-active, .shopCart-list-fade-leave-active {
    //     // transition: all 0.5s;
    // }
    .shopCart-list-wrap {
      
      .shopCart-list {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 30;
        width: 100%;
        background-color: #fff;
        transform: translate(0, -100%);
        

        .list-header {
          height: 40px;
          line-height: 40px;
          padding: 0 18px;
          background: #f3f5f7;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);

          .title {
            float: left;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }

          .empty {
            float: right;
            font-size: 12px;
            color: rgb(0, 160, 220);
          }
        }

        .list-content {
          width: 100%;
          padding: 0 18px;
          background: #fff;
          box-sizing: border-box;
          overflow-y: auto;

          &::-webkit-scrollbar {
              width:0;
              height:0
          }

          .food {
            display: flex;
            justify-content: space-between;
            padding: 14px 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            box-sizing: border-box;

            .name {
              flex: 1;
              font-size: 14px;
              color: rgb(7, 17, 27);
            }

            .price {
                font-size: 14px;
                font-weight: 700;
                color: rgb(240, 20, 20);
                margin-right: 12px;
            }
          }
        }
      }

      .list-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        // backdrop-filter: blur(10px);
        background: rgba(7, 17, 27, 0.6);

        // &.fade-transition {
        //   transition: all 0.5s;
        //   opacity: 1;
        //   background: rgba(7, 17, 27, 0.6);
        // }

        // &.fade-enter, &.fade-leave {
        //   opacity: 0;
        //   background: rgba(7, 17, 27, 0);
        // }
      }
    }
  }
</style>