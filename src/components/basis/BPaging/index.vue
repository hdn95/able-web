<!--列表分页组件-->
<template>
  <section class="basePagination">
    <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :background="true"
      :current-page="pageIndex"
      :page-sizes="[10, 15, 20, 30]"
      :page-size="pageSize"
      :prev-text="$t('DefaultButton.previousPage')"
      :next-text="$t('DefaultButton.nextPage')"
      :layout="layout"
      :total="total">
    </el-pagination>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "index",
    props: {
      pageIndex: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 5
      },
      total: {
        type: Number,
        default: 0
      },
      layout: {
        type: String,
        default: "prev, pager, next, jumper,sizes,total"
      }
    },
    methods: {
      handlePageSizeChange: function (val) {
        this.$emit('pageSizeChange', val)
      },
      handleCurrentPageChange: function (val) {
        this.$emit('currentPageChange', val)
      }
    }
  }
</script>

<style type="text/css" scoped>

  .basePagination >>> .el-pagination.is-background .btn-next,
  .basePagination >>> .el-pagination.is-background .btn-prev,
  .basePagination >>> .el-pagination.is-background .el-pager li {
    background-color: #DCDFE6 !important;
  }

  .basePagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #409EFF !important;
  }

  .basePagination >>> .el-pagination .el-pager li {
    height: 2.1rem;
    line-height: 2.1rem;
    font-size: .75rem;
  }

  .basePagination >>> .el-pagination__editor.el-input .el-input__inner {
    height: 2.1rem;
    line-height: 2.1rem;
  }

  .basePagination >>> .el-pagination .el-select .el-input .el-input__inner {
    height: 2.1rem;
    line-height: 2.1rem;
  }

  .basePagination >>> .el-pagination button, .basePagination >>> .el-pagination span:not([class*=suffix]) {
    height: 2.1rem;
    line-height: 2.1rem;
    font-size: .75rem;
    padding: 0rem .3rem 0rem .3rem;
  }

  .basePagination >>> .el-pagination.is-background .btn-next, .basePagination >>> .el-pagination.is-background .btn-prev {
    min-width: 4rem;
  }

  .basePagination >>> .el-pagination.is-background .btn-prev {
    margin-left: 0;
  }

  .basePagination >>> .el-pagination.is-background .el-pager li {
    min-width: 2rem;
  }

  .basePagination >>> .el-pagination .el-pagination__total {
    margin-right: 0px;
  }

  .basePagination >>> .el-pagination {
    padding: .35rem 0 .35rem 0;
  }

  .basePagination {
    padding-top: 1rem;
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    justify-content: flex-end
  }
</style>
