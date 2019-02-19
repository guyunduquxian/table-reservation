<template>
    <div class="food" v-show="showFlag">
        <div class="food-content">
        <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="back">
            <i class="iconfont icon-menu_reject2Submitor"></i>
            </div>
        </div>
        <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price-wrap">
                <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <v-cartControl :foods="food"></v-cartControl>
                </div>
            </div>
        </div>

        <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
        </div>

        <div class="rating">
            <h1 class="title">商品评价</h1>
            
            <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.text)" v-for="(rating, index) in food.ratings" :key="index"
                    class="rating-item">
                <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
                </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
 import CartControl from "@/components/CartControl.vue";
 import {formatDate} from '@/components/common/date.js';

export default {
    components: {
      'v-cartControl': CartControl,
    },
    props: {
        food: Object
    },
    data() {
        return {
           showFlag: false
        }
    },
    created() {
        
    },
    methods: {
        show() {
            this.showFlag = true;
        },
        back() {
            this.showFlag = false;
        },
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false;
            } else {
                return true;
            }
        }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
}
</script>

<style lang="scss" scoped>
  .food {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 30;
    width: 100%;
    height: 100%;
    margin-bottom: 60px;
    background-color: #fff;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width:0;
        height:0
    }

    .food-content {

        .image-header {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .back {
                position: absolute;
                top: 12px;
                right: 16px;

                .icon-menu_reject2Submitor {
                    font-size: 32px;
                    color: #CACCCA;
                }
            }
        }

        .content {
            position: relative;
            padding: 18px;

            .title {
                line-height: 14px;
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 700;
                color: rgb(7, 17, 27);
            }

            .detail {
                margin-bottom: 18px;
                line-height: 10px;
                height: 10px;
                font-size: 0;

                .sell-count, .rating {
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }

                .sell-count {
                    margin-right: 12px;
                }
            }

            .price-wrap {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .price {
                    font-weight: 700;
                    line-height: 24px;
                    

                    .now {
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(240, 20, 20);
                    }

                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
            
                .cartcontrol-wrapper {

                    /deep/ .cartControl {

                        .iconfont {
                            font-size: 24px;
                        }
                    }
                }
            }

            .buy {
                position: absolute;
                right: 18px;
                bottom: 18px;
                z-index: 10;
                height: 24px;
                line-height: 24px;
                padding: 0 12px;
                box-sizing: border-box;
                border-radius: 12px;
                font-size: 10px;
                color: #fff;
                background-color: rgb(0, 160, 220);
            }
        }

        .info {
            padding: 18px;
        
            .title {
                line-height: 14px;
                margin-bottom: 6px;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }

            .text {
                line-height: 24px;
                padding: 0 8px;
                font-size: 12px;
                color: rgb(77, 85, 93);
            }
        }

        .rating {
            padding-top: 18px;

            .title {
                line-height: 14px;
                margin-left: 18px;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }

            .rating-wrapper {
                padding: 0 18px;

                .rating-item {
                    position: relative;
                    padding: 16px 0;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

                    .user {
                        position: absolute;
                        right: 0;
                        top: 16px;
                        line-height: 12px;

                        .name {
                            display: inline-block;
                            margin-right: 6px;
                            vertical-align: top;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }

                        .avatar {
                            border-radius: 50%;
                        }
                    }

                    .time {
                        margin-bottom: 6px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }

                    .text {
                        line-height: 16px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);

                        .icon-thumb_up, .icon-thumb_down {
                            margin-right: 4px;
                            line-height: 16px;
                            font-size: 12px;
                        }

                        .icon-thumb_up {
                            color: rgb(0, 160, 220);
                        }

                        .icon-thumb_down {
                            color: rgb(147, 153, 159);
                        }
                    }
                }

                .no-rating {
                    padding: 16px 0;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                }
            }
        }
    }
  }
        
</style>
