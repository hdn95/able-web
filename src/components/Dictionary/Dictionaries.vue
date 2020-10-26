<!--字典数据页面-->

<template>
  <section>
    <section class="conditional-query-container">
      <el-row class="query-wrapper-row">
        <el-col :span="6" class="query-wrapper-row-right">
          <section class="query-wrapper-row-item">
            <section class="label-text">{{$t('SearchTips.filter')}}</section>

            <section>
              <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="querySearchKey"
                        @keyup.enter.native="handleLoadAndQuery" size="small" :clearable="true">
                <el-select v-model="queryType" slot="prepend" class="input-select">
                  <el-option :label="$t('Dictionary.search.name')" value="ItemName"></el-option>
                </el-select>
              </el-input>
            </section>
          </section>
        </el-col>

        <el-col :span="10">
          <el-button type="danger" size="small" icon="el-icon-search" @click="handleLoadAndQuery">
            {{$t('DefaultButton.searchButtonText')}}
          </el-button>
        </el-col>
      </el-row>
    </section>

    <section class="content-box-container">
      <fun-button-group :funs="$route.meta.funs"
                        @refreshEmit="handleLoadAndQuery"
                        @editEmit="handleEdit"
                        @addEmit="handleAdd"
                        @deletedEmit="handleDeleted">
      </fun-button-group>

      <section class="table-container">
        <el-table border :data="dataCollection" max-height="420"
                  header-row-class-name="table-header-row-class"
                  class="cus-table"
                  tooltip-effect="light" size="medium"
                  @selection-change="handleSelectionChange" ref="multipleTable">
          <el-table-column type="selection"></el-table-column>
          <el-table-column :label="$t('Dictionary.table.name')" prop="itemName" align="center"
                           show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('Dictionary.table.enable')" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enabledMark"
                active-color="#13ce66"
                inactive-color="#bfbfbf"
                :active-value="1"
                :inactive-value="0"
                :disabled="true">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Dictionary.table.remark')" prop="remark" align="center"
                           show-overflow-tooltip></el-table-column>
        </el-table>
      </section>

      <b-paging :pageIndex="queryPages.PageIndex" :pageSize="queryPages.PageSize" :total="totalCount"
                @pageSizeChange="handlePageSizeChange"
                @currentPageChange="handlePageChange"></b-paging>
    </section>

    <b-dictionary-new :isVisible="newDialog.isVisible"
                      :requestUri="newDialog.requestUri"
                      @saveRefresh="handleRefresh"
                      @closeDialog="newDialog.isVisible = false"></b-dictionary-new>

    <b-dictionary-edit :isVisible="editDialog.isVisible"
                       :requestUri="editDialog.requestUri"
                       :formObject="editDialog.editForm"
                       @saveRefresh="handleRefresh"
                       @closeDialog="editDialog.isVisible = false"></b-dictionary-edit>
  </section>
</template>

<script type="text/ecmascript-6">
  import BDictionaryNew from '@components/Dictionary/BDictionary/New'
  import BDictionaryEdit from '@components/Dictionary/BDictionary/Edit'
  import BPaging from '@components/basis/BPaging/index'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"

  export default {
    name: "Dictionaries",
    mixins: [QueryParamsMixin, MethodsMixin],
    components: {
      BDictionaryEdit,
      BDictionaryNew,
      FunButtonGroup,
      BPaging
    },
    methods: {
      handleLoadAndQuery () {
        let _that = this

        _that.formatParams()

        _that.$fetch(`${_that.$route.path}`,
          Object.assign({}, _that.queryParams, _that.queryPages))
          .then((ret) => {
            const retData = ret.data

            _that.totalCount = retData.totalCount
            _that.dataCollection = retData.items
          })
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$refs.multipleTable.clearSelection()

      next()
    },
    created () {
      this.$nextTick(() => {
        this.handleLoadAndQuery()
      })
    },
    data () {
      return {
        querySearchKey: '',
        queryType: 'ItemName',
        queryParams: {
          ItemName: ''
        }
      }
    }
  }
</script>

<style type="text/css" scoped>

</style>
