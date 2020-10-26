<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog(true)">
      <section slot="title">{{$t('DefaultTips.editDataTitle')}}</section>

      <section class="dialog-boday">
        <section class="module-wrapper-container">
          <section class="tree-module-wrapper-container" v-loading="treeLoading">

            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

              <section class="right-title-module">
                <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')"
                   @click="handleLoadAllResources(true)"></i>
              </section>
            </section>

            <section style="margin-top: 1rem">
              <self-tree :jsonData="UnFunResourcesJsonTree" :treeProps="treeProps"
                         @nodeClick="handleNodeClick" style="margin-top: .35rem"></self-tree>
            </section>
          </section>

          <section class="form-module-wrapper-container" style="width: 100%">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>

            <section class="content-wrapper-container" v-if="formObject">
              <el-form ref="formResource" :model="formObject" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.owner')" prop="owner">
                      <el-input v-model="formObject.owner" type="text"
                                :placeholder="$t('Resource.placeholder.owner')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.description')" prop="description">
                      <el-input v-model="formObject.description" type="text"
                                :placeholder="$t('Resource.placeholder.description')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.url')" prop="resourceUrl">
                      <el-input v-model="formObject.resourceUrl" type="text"
                                :placeholder="$t('Resource.placeholder.url')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.jsEvent')">
                      <el-input v-model="formObject.jsEvent" type="text"
                                :placeholder="$t('Resource.placeholder.jsEvent')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.requestType')">
                      <el-select v-model="formObject.requestMethod" style="width: 100%">
                        <el-option v-for="item in methodType"
                                   :key="item.key"
                                   :label="item.text"
                                   :value="item.key">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="$t('Resource.table.resourceType')">
                      <el-select v-model="formObject.resourceType" style="width: 100%">
                        <el-option v-for="item in resourceType"
                                   :key="item.key"
                                   :label="item.text"
                                   :value="item.key">
                        </el-option>
                      </el-select>
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
                      <el-input v-model="formObject.cssName" type="text"
                                :placeholder="$t('Resource.placeholder.cssName')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Resource.table.display')">
                      <el-checkbox v-model="formObject.isDisplay">
                        {{$t('Resource.table.displayText')}}
                      </el-checkbox>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('Resource.table.orderNum')">
                      <el-input-number v-model="formObject.sortCode" controls-position="right"
                                       :min="0" style="width: 100%"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </section>
          </section>
        </section>
      </section>

      <section slot="footer">
        <el-button size="small" @click="handleCloseDialog">{{$t('DefaultButton.cancelButtonText')}}</el-button>
        <el-button size="small" type="primary" @click="handleSave('formResource')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
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
