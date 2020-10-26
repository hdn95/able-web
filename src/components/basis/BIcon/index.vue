<!--图标组件-->
<template>
  <section class="icon-container">
    <el-dialog :visible="iconIsVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog">
      <section slot="title" class="el-dialog-title-container">{{$t('Icon.title')}}
        <el-input v-model="queryKey" :placeholder="$t('DefaultTips.searchPlaceholder')"
                  style="width: 30%;padding-left: 1rem;"></el-input>
      </section>

      <section style="height: 30rem;overflow-y: auto">
        <el-row>
          <section>
            <el-col :span="5" v-for="(item) in localQuery" :key="item.icon"
                    @click.native="handleIconSelection(item)">
              <i :class="item.icon"></i>
              <section class="icon-text">{{item.icon}}</section>
            </el-col>
          </section>
        </el-row>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import {Icon} from "@common/js/IconConfig"

  export default {
    name: "IconIndex",
    data () {
      return {
        queryKey: "",
        icons: Icon
      }
    },
    props: {
      iconIsVisible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      localQuery () {
        let _that = this
        let query_key = _that.queryKey

        if (query_key) {
          return _that.icons.filter(function (item) {
            return item.icon.indexOf(query_key) !== -1 || item.description.indexOf(query_key) !== -1
          })
        }

        return _that.icons
      }
    },
    methods: {
      handleIconSelection: function (item) {
        this.$emit("iconSelection", item)

        this.handleCloseDialog()
      },
      handleCloseDialog: function () {
        this.$emit("closeDialog")

        this.$nextTick(() => {
          this.queryKey = ""
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .icon-container >>> .el-input__inner {
    border-left: none;
    border-top: none;
    border-right: none;
    border-radius: 0px;
  }

  .icon-container >>> .el-col .icon-text {
    padding-top: .3rem;
  }

  .icon-container >>> .el-col i {
    font-size: 1.5rem;
  }

  .icon-container >>> .el-col {
    border: 1px solid #EBEEF5;
    margin: .5rem .5rem .5rem 0;
    height: 5rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: .8rem;
  }
</style>
