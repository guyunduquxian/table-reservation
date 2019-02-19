<template>
    <div class="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <v-star :score="seller.serviceScore"></v-star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <v-star :score="seller.foodScore"></v-star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>

            <div class="ratingselect">
                <div class="rating-type">
                    <span class="block positive" @click="selectAll" :class="{'active':selectType===2}">全部</span>
                    <span class="block positive" @click="selectPositive" :class="{'active':selectType===0}">满意</span>
                    <span class="block negative" @click="selectNegative" :class="{'active':selectType===1}">不满意</span>
                </div>
                <div class="switch" @click="toggleContent" :class="{ 'on': onlyContent }">
                    <span class="iconfont icon-xuanze"></span>
                    <span class="text">只看有内容的评价</span>
                </div>
            </div>
            
            <div class="rating-wrapper">
                <ul>
                    <li v-for="(rating,index) in ratings" :key="index" 
                        v-show="needShow(rating.text)" 
                        class="rating-item"
                        >
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <v-star :score="rating.score"></v-star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <i class="iconfont icon-dianzan_active"></i>
                                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
 import Star from "@/components/Star.vue"
 import {formatDate} from '@/components/common/date.js';

export default {
    components: {
        VStar: Star
    },
    props: {
        seller: Object
    },
    data() {
        return {
            rating: {},
            onlyContent: false,
            selectType: 2
        }
    },
    computed: {
        ratings() {
            if(this.selectType === 2) {
                return this.rating;
            } else if(this.selectType === 0) {
                let ratingPositive = [];
                this.rating.forEach(element => {
                    if(element.rateType === 0) {
                        ratingPositive.push(element);
                    }
                });
                return ratingPositive;
            } else if (this.selectType === 1) {
                let ratingNegative = [];
                this.rating.forEach(element => {
                    if(element.rateType === 1) {
                        ratingNegative.push(element);
                    }
                });
                return ratingNegative;
            }
        }
    },
    created() {
        this.$axios.get("/api/index")
        .then( res => {
            // console.log(res.data.ratings);
            this.rating = res.data.ratings;
        })
        .catch( error => {
            console.log(error);
        });
    },
    mounted() {
       
    },
    methods: {
        toggleContent(event) {
            this.onlyContent = !this.onlyContent;
        },
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false;
            } else {
                return true;
            }
        },
        selectAll() {
            this.selectType = 2;
        },
        selectPositive() {
            this.selectType = 0;
        },
        selectNegative() {
            this.selectType = 1;
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
    .ratings {
        width: 100%;
        display: flex;
        position: absolute;
        top: 40px;
        left: 0;
        background-color: #f3f5f7;

        .ratings-content {
            width: 100%;
        
            .overview {
                background-color: #fff;
                display: flex;
                padding: 18px 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);

                .overview-left {
                    padding: 6px 0;
                    width: 137px;
                    border-right: 1px solid rgba(7, 17, 27, 0.1);
                    text-align: center;
                
                    .score {
                        margin-bottom: 6px;
                        line-height: 28px;
                        font-size: 24px;
                        color: rgb(255, 153, 0);
                    }

                    .title {
                        margin-bottom: 8px;
                        line-height: 12px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }

                    .rank {
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }

                .overview-right {
                    flex: 1;
                    padding: 6px 16px 6px 24px;

                    .score-wrapper {
                        margin-bottom: 12px;
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                    
                        .title {
                            font-size: 12px;
                            color: rgb(7, 17, 27);
                            margin: 0 10px 5px 0;
                        }

                        /deep/ .star {
                            
                            .star-item {
                                margin: 0 2px;
                                width: 16px;
                                height: 16px;
                                background-size: 16px 16px;
                            }
                        }

                        .score {
                            font-size: 12px;
                            color: rgb(255, 153, 0);
                            margin-left: 10px;
                        }
                    }

                    .delivery-wrapper {
                
                        .title {
                            line-height: 18px;
                            font-size: 12px;
                            color: rgb(7, 17, 27);
                        }

                        .delivery {
                            margin-left: 12px;
                            font-size: 12px;
                            color: rgb(147, 153, 159);
                        }
                    }
                }
            }

            .ratingselect {
                margin-top: 20px;
                background-color: #fff;
                border-top: 1px solid rgba(7, 17, 27, 0.1);

                .rating-type {
                    padding: 18px 0;
                    margin: 0 18px;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    display: flex;
                    align-items: center;

                    .block {
                        padding: 8px 12px;
                        margin-right: 8px;
                        line-height: 16px;
                        border-radius: 1px;
                        font-size: 12px;
                        color: rgb(77, 85, 93);

                        &.positive {
                            background-color: rgba(0, 160, 220, 0.2);
                        }

                        &.negative {
                            background-color: rgba(77, 85, 93, 0.2);
                        }

                        &.active {
                            background-color: #0097FF;
                            color: #fff;
                        }
                    }
                }
                
                .switch {
                    background-color: #fff;
                    padding: 12px 18px;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    color: rgb(147, 153, 159);
                    display: flex;
                    align-items: center;

                    &.on {

                        .icon-xuanze {
                            color: #00c850;
                        }
                    }

                    .icon-xuanze {
                        font-size: 24px;
                    }

                    .text {
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
            }

            .rating-wrapper {
                background-color: #fff;
                padding: 0 18px;

                .rating-item {
                    display: flex;
                    padding: 18px 0;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

                    .avatar {
                        width: 28px;
                        margin-right: 12px;

                        img {
                            border-radius: 50%;
                        }
                    }

                    .content {
                        position: relative;
                        flex: 1;

                        .name {
                            margin-bottom: 4px;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(7, 17, 27);
                        }
                            
                        .star-wrapper {
                            margin-bottom: 6px;
                            display: flex;
                            align-items: center;
                        
                            /deep/ .star {

                                .star-item {
                                    margin: 0 2px;
                                    width: 16px;
                                    height: 16px;
                                    background-size: 16px 16px;
                                }
                            }

                            .delivery {
                                margin-left: 10px;
                                font-size: 12px;
                                color: rgb(147, 153, 159);
                            }
                            
                        }
                        
                    }

                    .text {
                        margin-bottom: 8px;
                        line-height: 18px;
                        color: rgb(7, 17, 27);
                        font-size: 12px;
                    }

                    .recommend {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;

                        .icon-dianzan_active {
                            color: rgb(0, 160, 220);
                            font-size: 22px;
                        }

                        .item {
                            padding: 4px 6px;
                            margin: 2px 5px;
                            font-size: 12px;
                            border: 1px solid rgba(7, 17, 27, 0.1);
                            border-radius: 1px;
                            color: rgb(147, 153, 159);
                            background-color: #fff;
                        }
                    }

                    .time {
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
    }
</style>
