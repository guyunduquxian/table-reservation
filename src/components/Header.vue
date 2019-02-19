<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}} 分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="iconfont icon-enter"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont icon-enter"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>

    <transition name="slide-fade"> 
      <div v-if="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <v-star :score="seller.score"></v-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="iconfont icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Star from "@/components/Star.vue"

  export default {
    components: {
      VStar: Star
    },
    props: {
       seller: Object
    },
    data() {
      return {
          classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
          detailShow: false
      }
    },
    created() {
       
    },
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        hideDetail() {
            this.detailShow = false;
        }
    }
}
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    overflow: hidden;
    color: #fff;
    background: rgba(7, 17, 27, 0.5);

    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      overflow: hidden;

      .avatar {
        float: left;

        img {
          width: 64px;
          height: 64px;
          border-radius: 2px;
          vertical-align: top;
        }
      }

      .content {
        float: left;
        margin-left: 16px;

        .title {
          margin: 2px 0 8px 0;

          .brand {
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            background: url("../assets/img/brand@3x.png") no-repeat;
            background-size: 30px 18px;
          }

          .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }

        .description {
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }

        .support {

          .icon {
            float: left;
            vertical-align: top;
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
            float: left;
            line-height: 12px;
            font-size: 10px;
          }
        }
      }

      .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px;
        border-radius: 14px;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      
        .count {
          font-size: 12px;
        }

        .icon-enter {
          margin-left: 2px;
          font-size: 12px;
        }
      }
    }

    .bulletin-wrapper {
      height: 28px;
      padding: 0 22px 0 12px;
      background-color: rgba(7, 17, 27, 0.2);
      display: flex;
      align-items: center;
      overflow: hidden;
    
      .bulletin-title {
        width: 22px;
        height: 12px;
        background: url("../assets/img/bulletin@3x.png") no-repeat;
        background-size: 22px 12px;
      }

      .bulletin-text {
        margin: 0 4px;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
      }

      .icon-enter {
        font-size: 12px;
      }
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    
    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: opacity 0.5s;
    }

    .detail {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7, 17, 27, 0.8);
      
      .detail-wrapper {
        width: 100%;

        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;

          .name {
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }

          .star-wrapper {
            margin-top: 18px;
            padding: 2px 0;
            display: flex;
            justify-content: center;
          }

          .title {
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;

            .line {
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }

            .text {
              padding: 0 12px;
              font-weight: 700;
              font-size: 14px;
            }
          }

          .supports {
            width: 80%;
            margin: 0 auto;
          
            .support-item {
              padding: 0 12px;
              margin-bottom: 12px;
              display: flex;
              align-items: center;

              &:last-child {
                margin-bottom: 0;
              }

              .icon {
                width: 16px;
                height: 16px;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                
                &.decrease {
                  background-image: url("../assets/img/decrease_2@3x.png");
                }
                &.discount {
                  background-image: url("../assets/img/discount_2@3x.png");
                }
                &.guarantee {
                  background-image: url("../assets/img/guarantee_2@3x.png");
                }
                &.invoice {
                  background-image: url("../assets/img/invoice_2@3x.png");
                }
                &.special {
                  background-image: url("../assets/img/special_2@3x.png");
                }
              }

              .text {
                line-height: 16px;
                font-size: 12px;
              }
            }
          }
          
          .bulletin {
            width: 80%;
            margin: 0 auto;

            .content {
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      }
      
      .detail-close {
        width: 30px;
        height: 30px;
        margin: 0 auto;

        .icon-close {
            font-size: 30px;
        }
      }
    }
  }

</style>