<template>
  <div>
    <div :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
      <div class="intro-content" :title="introduce" ref="desc">
        <span class="merchant-desc" v-if="introduce">
          {{ introduce }}
        </span>
        <div class="unfold" @click="showTotalIntro" v-if="showExchangeButton">
          <p>{{ exchangeButton ? '展开' : '收起' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collapse-text',
  props: {
    text: '',
    type: String,
  },
  data() {
    return {
      introduce: '',
      // 是否展示所有文本内容
      showTotal: true,
      // 显示展开还是收起
      exchangeButton: true,
      // 是否显示展开收起按钮
      showExchangeButton: false,
      rem: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.introduce = this.text;
    },
    showTotalIntro() {
      this.showTotal = !this.showTotal;
      this.exchangeButton = !this.exchangeButton;
    },
    getRem() {
      const defaultRem = 16;
      const winWidth = window.innerWidth;
      const rem = (winWidth / 375) * defaultRem;
      return rem;
    },
  },
  watch: {
    introduce() {
      this.$nextTick(
        () => {
          const rem = parseFloat(this.getRem());
          if (!this.$refs.desc) {
            return;
          }
          const descHeight = window.getComputedStyle(this.$refs.desc).height.replace('px', '');
          if (descHeight > 5.25 * rem) {
            // 显示展开收起按钮
            this.showExchangeButton = true;
            this.exchangeButton = true;
            // 不是显示所有
            this.showTotal = false;
          } else {
            // 不显示展开收起按钮
            this.showExchangeButton = false;
            // 没有超过三行就显示所有
            this.showTotal = true;
          }
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
  .top-prove {
    height: 100px;
    width: 100%;
    background: #dddddd;
    text-align: center;
    line-height: 100px;
  }
  .total-introduce {
    height: auto;
    overflow: hidden;
    font-size: 14px;
    color: #434343;
    .intro-content {
      .merchant-desc {
        width: 100%;
        line-height: 21px;
      }
    }
    .unfold {
      display: block;
      z-index: 11;
      float: right;
      width: 40px;
      height: 21px;
      p {
        margin: 0;
        line-height: 21px;
        color: var(--theme-color);
      }
    }
  }
  .detailed-introduce {
    font-size: 14px;
    color: #434343;
    position: relative;
    overflow: hidden;
    .intro-content {
      // 最大高度设为 3 倍的行间距
      max-height: 63px;
      line-height: 21px;
      word-wrap: break-word;
      /*强制打散字符*/
      word-break: break-all;
      background: #fff;
      /*同背景色*/
      color: #fff;
      overflow: hidden;
      .merchant-desc {
        width: 100%;
        line-height: 21px;
      }
      &:after,
    // 这是展开前实际显示的内容
    &:before {
        content: attr(title);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        color: #434343;
      }
      // 把最后最后一行自身的上面二行遮住
      &:before {
        display: block;
        overflow: hidden;
        z-index: 1;
        max-height: 42px;
        background: #fff;
      }
      &:after {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 61px;
        /*截取行数*/
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-indent: -12em;
        /*尾部留空字符数*/
        padding-right: 4em;
      }
      .unfold {
        z-index: 11;
        width: 40px;
        height: 21px;
        outline: 0;
        position: absolute;
        right: 0;
        bottom: 0;
        p {
          margin: 0;
          line-height: 21px;
          color: var(--theme-color);
        }
      }
    }
  }

  .bottom-prove {
    height: 100px;
    width: 100%;
    background: #dddddd;
    text-align: center;
    line-height: 100px;
  }
  .change-buttom {
    font-size: 14px;
    color: var(--theme-color);

    .long {
      text-align: 21px;
      text-align: center;
      height: 21px;
    }
    .short {
      text-align: 21px;
      text-align: center;
      height: 20px;
    }
  }
</style>
