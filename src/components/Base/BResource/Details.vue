<!--资源管理详情-->
<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog(true)">
      <section slot="title">{{$t('SearchTips.detailedData')}}</section>

      <section class="dialog-boday">
        <section class="module-wrapper-container">
          <section class="form-module-wrapper-container" style="width: 100%">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>

            <section class="content-wrapper-container" v-if="formObject">
              <el-form ref="formResource" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.owner')">
                      <label>{{formObject.owner}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.description')">
                      <label>{{formObject.description}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.url')">
                      <label>{{formObject.resourceUrl}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.jsEvent')">
                      <label>{{formObject.jsEvent}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.requestType')">
                      <label v-if="formObject.requestMethod===100">GET</label>
                      <label v-if="formObject.requestMethod===200">POST</label>
                      <label v-if="formObject.requestMethod===300">PUT</label>
                      <label v-if="formObject.requestMethod===400">DELETE</label>
                      <label v-if="formObject.requestMethod===500">IMPORT</label>
                      <label v-if="formObject.requestMethod===600">EXPORT</label>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.resourceType')">
                      <label v-if="formObject.resourceType===100">模块</label>
                      <label v-if="formObject.resourceType===200">页面</label>
                      <label v-if="formObject.resourceType===300">功能点</label>
                      <label v-if="formObject.resourceType===999">其他</label>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.parentId')" prop="parentId">
                      <el-input v-model="formParentText" type="text" :disabled="true"
                                :placeholder="$t('Resource.placeholder.parentId')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.icon')">
                      <el-input v-model="formObject.icon" type="text" :disabled="true"
                                :placeholder="$t('Resource.placeholder.icon')">
                        <el-button slot="append" icon="el-icon-circle-check"
                                   @click="iconIsVisible = true"></el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Resource.table.cssName')">
                      <label>{{formObject.cssName}}</label>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Resource.table.display')">
                      <el-checkbox v-model="formObject.isDisplay" disabled>
                        {{$t('Resource.table.displayText')}}
                      </el-checkbox>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Resource.table.orderNum')">
                      <label>{{formObject.sortCode}}</label>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </section>
          </section>
        </section>
      </section>
    </el-dialog>

    <b-icon :iconIsVisible="iconIsVisible"
            @closeDialog="iconIsVisible = false"
            @iconSelection="handleIconSelection"></b-icon>
  </section>
</template>

<script type="text/ecmascript-6">
  import {ResourceMixin} from "@/components/Base/BResource/mixin/ResourceMixin"
  import SelfTree from '@components/basis/BTree/SelfTree'

  export default {
    name: "Edit",
    mixins: [ResourceMixin],
    props: {
      formObject: {
        type: Object
      }
    },
    components: {
      SelfTree
    },
    methods: {
      handleSave (formName) {
        let _that = this

        _that.$refs[formName].validate((valid) => {
          if (valid) {
            _that.$put(`${_that.requestUri}${_that.formObject.id}`, _that.formObject)
              .then(() => {
                _that.$emit('saveRefresh', false)

                _that.$nextTick(() => {
                  _that.formObject = {}
                })
              })
              .catch(() => {
              })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .dialog-boday {
    height: 30rem;
  }

  .tree-module-wrapper-container {
    height: 30rem;
  }
</style>
