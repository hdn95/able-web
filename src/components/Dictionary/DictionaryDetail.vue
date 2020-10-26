<!--字典详情页面-->

<template>
  <section class="dictionary-wrapper-container">
    <section class="tree-module-wrapper-container" v-loading="treeLoading">

      <section class="title-module-wrapper-container">
        <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

        <section class="right-title-module">
          <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')" @click="handleLoadAllDictionary"></i>
        </section>
      </section>

      <self-tree :jsonData="DictionaryJsonTree" :treeProps="{children: 'childNodes',label: 'itemName'}"
                 :defaultExpandAll="true"
                 @nodeClick="handleNodeClick" style="margin-top:.5rem"></self-tree>
    </section>

    <section style="width: 100%">
      <section class="title-module-wrapper-container">
        <section class="left-title-module">{{$t('DefaultTips.datasheets')}}</section>
      </section>

      <section class="conditional-query-container" style="margin-top: .5rem">
        <el-row class="query-wrapper-row">
          <el-col :span="7" class="query-wrapper-row-right">
            <section class="query-wrapper-row-item">
              <section class="label-text">{{$t('SearchTips.filter')}}</section>
              <section>
                <el-input :placeholder="$t('DefaultTips.searchPlaceholder')" v-model="querySearchKey"
                          @keyup.enter.native="handleLoadAndQuery" size="small" :clearable="true">
                  <el-select v-model="queryType" slot="prepend" class="input-select">
                    <el-option :label="$t('DictionaryDetail.search.projectName')" value="ItemDetailName"></el-option>
                    <el-option :label="$t('DictionaryDetail.search.projectValue')" value="ItemDetailValue"></el-option>
                    <el-option :label="$t('DictionaryDetail.search.simpleSpelling')" value="SimpleSpelling"></el-option>
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
                          @deletedEmit="handleDeleted"></fun-button-group>

        <section class="table-container">
          <el-table border :data="dataCollection" max-height="420"
                    header-row-class-name="table-header-row-class"
                    class="cus-table"
                    tooltip-effect="light" size="medium"
                    @selection-change="handleSelectionChange" ref="multipleTable">
            <el-table-column type="selection"></el-table-column>
            <el-table-column :label="$t('DictionaryDetail.table.projectName')" prop="itemDetailName" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('DictionaryDetail.table.projectValue')" prop="itemDetailValue" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('DictionaryDetail.table.simpleSpelling')" prop="simpleSpelling" align="center"
                             show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('DictionaryDetail.table.enable')" align="center" show-overflow-tooltip>
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
            <el-table-column :label="$t('DictionaryDetail.table.remark')" prop="remark" align="center"
                             show-overflow-tooltip></el-table-column>
          </el-table>
        </section>

        <b-paging :pageIndex="queryPages.PageIndex"
                  :pageSize="queryPages.PageSize"
                  :total="totalCount"
                  @pageSizeChange="handlePageSizeChange"
                  @currentPageChange="handlePageChange"></b-paging>
      </section>

      <b-dictionary-detail-new :isVisible="newDialog.isVisible"
                               :requestUri="newDialog.requestUri"
                               @saveRefresh="handleRefresh"
                               @closeDialog="newDialog.isVisible = false"></b-dictionary-detail-new>

      <b-dictionary-detail-edit :isVisible="editDialog.isVisible"
                                :requestUri="editDialog.requestUri"
                                :formObject="editDialog.editForm"
                                @saveRefresh="handleRefresh"
                                @closeDialog="editDialog.isVisible = false"></b-dictionary-detail-edit>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
  import BDictionaryDetailNew from '@components/Dictionary/BDictionaryDetail/New'
  import BDictionaryDetailEdit from '@components/Dictionary/BDictionaryDetail/Edit'
  import {mapActions, mapGetters} from 'vuex'
  import SelfTree from '@components/basis/BTree/SelfTree'
  import FunButtonGroup from '@components/basis/FunButtonGroup'
  import BPaging from '@components/basis/BPaging/index'
  import {QueryParamsMixin, MethodsMixin} from "@common/mixin/mixin"
  import {GetDictionaryJsonTree} from "@/utils/UtilsHelper"

  export default {
    name: "DictionaryDetail",
    mixins: [QueryParamsMixin, MethodsMixin],
    computed: {
      ...mapGetters(['DictionaryJsonTree'])
    },
    components: {
      SelfTree,
      FunButtonGroup,
      BPaging,
      BDictionaryDetailNew,
      BDictionaryDetailEdit
    },
    methods: {
      ...mapActions({
        handleSetDictionaryJsonTree: 'SetDictionaryJsonTreeAction'
      }),
      handleLoadAllDictionary () {
        let _that = this

        _that.treeLoading = true

        _that.$fetch(`/Dictionary/Dictionaries`, {})
          .then((ret) => {
            let retData = ret.data.items

            let jsonTree = GetDictionaryJsonTree(retData, '0')

            _that.handleSetDictionaryJsonTree(jsonTree)

            _that.treeLoading = false
          })
          .catch(() => {
            _that.treeLoading = false
          })
      },
      handleLoadAndQuery () {
        let _that = this

        _that.formatParams()

        _that.$fetch(`${_that.$route.path}`,
          Object.assign({}, _that.queryParams, _that.queryPages, {ItemId: _that.dictionaryId}))
          .then((ret) => {
            const retData = ret.data

            _that.totalCount = retData.totalCount
            _that.dataCollection = retData.items
          })
          .catch(() => {
          })
      },
      handleNodeClick (event) {
        this.dictionaryId = event.id

        this.handleLoadAndQuery()
      }
    },
    data () {
      return {
        dictionaryId: '',
        treeLoading: false,
        querySearchKey: '',
        queryType: 'ItemDetailName',
        queryParams: {
          ItemDetailName: '',
          ItemDetailValue: '',
          SimpleSpelling: ''
        }
      }
    },
    created () {
      this.$nextTick(() => {
        if (this.DictionaryJsonTree.length <= 0) {
          this.handleLoadAllDictionary()
        }
      })
    }
  }
</script>

<style type="text/css" scoped>
  .dictionary-wrapper-container {
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
  }

  .tree-module-wrapper-container {
    width: 15%;
    height: 40rem;
    margin-right: 1rem;
  }
</style>
