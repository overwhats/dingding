<template>
  <div class="scrollwrap" ref="scrollV" :key="comkey">
    <slot name="defaultScroll" v-if="leftarr && leftarr.length || noAsync"></slot>
    <slot name="scrolllist"></slot>
    <div class="loadarea" v-show="loadvisible">
      <span>{{loadInfo}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Bscroll from 'better-scroll'
export default {
  name: 'scrollview',
  data () {
    return {
      loadInfo: this.loadmes,
      loadvisible: !1,
      noData: '暂无数据!'
    }
  },
  props: {
    comkey: {
      type: String,
      default: ''
    },
    probeType: {
      type: Number,
      default: 1
    },
    loadMore: {
      type: Boolean,
      default: !1
    },
    click: {
      type: Boolean,
      default: !0
    },
    pullup: {
      type: Boolean,
      default: !0
    },
    noAsync: {
      type: Boolean,
      default: !0
    },
    leftarr: {
      type: Array,
      default: () => []
    },
    rightarr: {
      type: Array,
      default: () => []
    },
    bounce: {
      type: Boolean,
      default: !0
    },
    loadmes: {
      type: String,
      default: '---- 上拉加载更多 ----'
    },
    loadingmes: {
      type: String,
      default: '---- 加载数据中 ----'
    },
    loadfinish: {
      type: String,
      default: '---- 加载完成！----'
    },
    loadend: {
      type: String,
      default: '---- 没有更多内容 ----'
    },
    loadstatus: {
      type: Number,
      default: 0
    },
    scrollX: {
      type: Boolean,
      default: !1
    },
    scrollY: {
      type: Boolean,
      default: !0
    },
    scrollEvent: {
      type: Function
    },
    stopPropagation: {
      type: Boolean,
      default: !1
    },
    preventDefault: {
      type: Boolean,
      default: !0
    }
  },
  methods: {
    _initComponent () {
      this.scroll = new Bscroll(this.$refs.scrollV, {
        click: this.click,
        stopPropagation: this.stopPropagation,
        preventDefault: this.preventDefault,
        bounce: this.bounce,
        probeType: this.probeType,
        autoBlur: true,
        scrollX: this.scrollX
      })
      if (this.pullup) {
        this.scroll.on('touchEnd', () => {
          this.scroll.y <= this.scroll.maxScrollY - 20 ? this.$emit('scrollEndHandle') : (this.loadvisible = !1);
          let activeElement = document.activeElement;
          if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            activeElement.blur()
          }
        });
        this.loadMore &&
          this.scroll.on('scroll', (pos) => {
            pos.y < this.scroll.maxScrollY - 20 && (this.loadvisible = !0)
          })
      }
    },
    hideLayer () {
      setTimeout(() => {
        this.loadvisible = !1
      }, 500)
    },
    refresh () {
      this.scroll.refresh()
    },
    scrollToTop () {
      this.scroll.scrollTo(0, 0, 0)
      this.scroll.refresh()
    },
    bindScroll () {
      this.scroll.on('scroll', () => {
        this.scrollEvent()
      })
    },
    scrollToElement (id) {
      this.scroll.scrollToElement('#' + id, 500);
    }
  },
  watch: {
    loadstatus () {
      /* eslint-disable no-unused-expressions */
      this.loadstatus === 0 && (this.loadInfo = this.loadmes)
      this.loadstatus === 1 && (this.loadInfo = this.loadfinish, this.hideLayer())
      this.loadstatus === -1 && (this.loadInfo = this.loadingmes)
      this.loadstatus === 2 && (this.loadInfo = this.loadend, this.hideLayer())
    }
  },
  components: {
  }
}
</script>
<style lang="scss">
  .scrollwrap{
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden
  }
  .scrollwrap .loadarea{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 14px;
    line-height: 14px;
    color: #fff;
    font-size: 12px;
    background-color: rgba(0,0,0, 0.4);
    text-align: center
  }
  
</style>
