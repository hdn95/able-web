<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog"
               @open="handleOpenDialog" width="80%">
      <section slot="title">{{$t('DefaultTips.addDataTitle')}}</section>

      <section class="dialog-boday">
        <section class="module-wrapper-container">
          <section class="tree-module-wrapper-container" v-loading="treeLoading">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.treeStruct')}}</section>

              <section class="right-title-module">
                <i class="el-icon-refresh" :title="$t('DefaultTips.refreshData')"
                   @click="handleLoadAllDepartments(true)"></i>
              </section>
            </section>

            <section style="margin-top: 1rem">
              <self-tree :jsonData="DepartmentsJsonTree" :treeProps="treeProps"
                         @nodeClick="handleNodeClick" style="margin-top: .35rem"></self-tree>
            </section>
          </section>

          <section class="form-module-wrapper-container" style="width: 100%">
            <section class="title-module-wrapper-container">
              <section class="left-title-module">{{$t('DefaultTips.basicInformation')}}</section>
            </section>
            <section class="content-wrapper-container" v-if="formObject">
              <el-form :model="formObject" ref="formUser" :rules="formRules" label-position="top">
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('Department.table.parentId')" prop="parentId">
                      <el-input v-model="formParentText" type="text" :disabled="true"
                                :placeholder="$t('Department.placeholder.parentId')" @focus="changebBelongTo('one')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.enCode')" prop="enCode">
                      <el-input type="text" v-model="formObject.enCode"
                                :placeholder="$t('User.placeholder.enCode')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.account')" prop="account">
                      <el-input type="text" v-model="formObject.account"
                                :placeholder="$t('User.placeholder.account')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.password')">
                      <el-input type="password" v-model="formObject.password"
                                :placeholder="$t('User.placeholder.editPwd')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.onLine')">
                      <el-checkbox v-model="formObject.checkOnLine" :true-label="1" :false-label="0">
                        {{$t('User.placeholder.onLine')}}
                      </el-checkbox>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.weChat')">
                      <el-input type="text" v-model="formObject.weChat"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.realName')" prop="realName">
                      <el-input type="text" v-model="formObject.realName"
                                :placeholder="$t('User.placeholder.realName')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.nickName')">
                      <el-input type="text" v-model="formObject.nickName"
                                :placeholder="$t('User.placeholder.nickName')"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.quickQuery')">
                      <el-input type="text" v-model="formObject.quickQuery"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.simpleSpelling')">
                      <el-input type="text" v-model="formObject.simpleSpelling"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.gender')">
                      <el-select v-model="formObject.gender" style="width: 100%">
                        <el-option :key="item.key" :value="item.key" :label="item.text"
                                   v-for="item in genderType"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.birthday')">
                      <el-date-picker type="date" v-model="formObject.birthday"
                                      :editable="false"
                                      style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.mobile')" prop="mobile">
                      <el-input type="text" v-model="formObject.mobile"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.telephone')">
                      <el-input type="text" v-model="formObject.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.email')">
                      <el-input type="text" v-model="formObject.email"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.QQ')">
                      <el-input type="text" v-model="formObject.qICQ"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.MSN')">
                      <el-input type="text" v-model="formObject.mSN"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.ascriptionSystem')">
                        <label v-for="item in AscriptionSystem" 
                              :key="item.key" 
                              :label="item.text">
                          <label v-if="formObject.ascriptionSystem==item.key">{{item.text}}</label>
                        </label>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item :label="$t('User.table.loginType')" prop="loginType">
                      <el-checkbox-group v-model="checkedLoginType">
                        <el-checkbox v-for="item in loginType" :key="item.key" :label="item.key" name="loginType">
                          {{item.text}}
                        </el-checkbox>
                      </el-checkbox-group>
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
        <el-button size="small" type="primary" @click="handleSave('formUser')">
          {{$t('DefaultButton.saveButtonText')}}
        </el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script>
  import {UserMixin} from "@/components/Base/BUser/mixin/UserMixin"
  import {AscriptionSystem} from "@/common/js/BasisConfig"
  import SelfTree from '@components/basis/BTree/SelfTree'

  export default {
    name: "New",
    mixins: [UserMixin],
    components: {
      SelfTree
    },
    methods: {
      handleSave (formName) {
        let _that = this

        _that.$refs[formName].validate((valid) => {
          if (valid) {
            _that.formObject.password = _that.$md5(_that.formObject.password)
            _that.formObject.loginType = eval(_that.checkedLoginType.join('+'))

            _that.$post(_that.requestUri, _that.formObject)
              .then(() => {
                this.$emit('saveRefresh', true)

                _that.$nextTick(() => {
                  _that.$refs[formName].resetFields()
                })
              })
              .catch(() => {
              })
          } else {
            return false
          }
        })
      }
    },
    data () {
      return {
        formObject: {
          gender: 0
        },
        AscriptionSystem: AscriptionSystem
      }
    }
  }
</script>

<style type="text/css" scoped>
  .dialog-boday {
    height: 33rem;
  }

  .form-module-wrapper-container .content-wrapper-container {
    margin-top: 0rem;
  }
</style>
