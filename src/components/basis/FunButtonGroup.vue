<!--页面按钮组件-->

<template>
  <section class="operate-container" v-if="funs">
    <section class="leftOperate">
      <el-button @click="handleRefresh" size="small" type="success" plain icon="el-icon-refresh">
        {{$t('DefaultButton.refreshButtonText')}}
      </el-button>

      <el-button v-for="(funItem) in funs" :key="funItem.id"
                 v-if="(funItem.isDisplay && funItem.attributeValue === '300' && funItem.attributeValueC === 'add')"
                 :type="funItem.cssName" plain :icon="funItem.img" @click="handleAdd(funItem.value)">
        {{$t('DefaultButton.addButtonText')}}
      </el-button>

      <el-button v-for="(funItem) in funs" :key="funItem.id"
                 v-if="(funItem.isDisplay && funItem.attributeValue === '300' && funItem.attributeValueC === 'edit')"
                 :type="funItem.cssName" plain :icon="funItem.img" @click="handleEdit(funItem.value)">
        {{$t('DefaultButton.editButtonText')}}
      </el-button>

      <el-button v-for="(funItem) in funs" :key="funItem.id"
                 v-if="(funItem.isDisplay && funItem.attributeValue === '300' && funItem.attributeValueC === 'deleted')"
                 :type="funItem.cssName" plain :icon="funItem.img" @click="handleDeleted(funItem.value)">
        {{$t('DefaultButton.deleteButtonText')}}
      </el-button>

      <el-button v-for="(funItem) in funs" :key="funItem.id"
                 v-if="(funItem.isDisplay && funItem.attributeValue === '300' && funItem.attributeValueC === 'details')"
                 :type="funItem.cssName" plain :icon="funItem.img" @click="handleDetail(funItem.value)">
        {{$t('DefaultButton.detailButtonText')}}
      </el-button>

      <slot name="leftOperate"></slot>
    </section>

    <slot name="rightOperate"></slot>
  </section>
</template>

<script>
  export default {
    name: "FunButtonGroup",
    props: {
      funs: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      handleEdit (event) {
        this.$emit('editEmit', event)
      },
      handleAdd (event) {
        this.$emit('addEmit', event)
      },
      handleRefresh () {
        this.$emit('refreshEmit')
      },
      handleDeleted (event) {
        this.$emit('deletedEmit', event)
      },
      handleDetail (event) {
        this.$emit('detailEmit', event)
      }
    }
  }
</script>

<style type="text/css" scoped>
  .operate-container >>> .leftOperate {
    display: flex;
    display: -webkit-flex;
    display: -o-flex;
    display: -moz-flex;
    display: -ms-flex;
  }
</style>
