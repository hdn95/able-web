<!-- 用户列表详情 -->
<template>
  <section>
    <el-dialog
      :visible="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleCloseDialog"
      @open="handleOpenDialog"
      width="60%"
    >
      <section slot="title">{{$t('SearchTips.detailedData')}}</section>

      <section class="dialog-boday">
        <section class="form-module-wrapper-container pl0">
          <section class="content-wrapper-container" v-if="formObject">
            <el-form :model="formObject" ref="formUser" :rules="formRules" label-position="top">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('User.table.enCode')" prop="enCode">
                    <label>{{formObject.enCode}}</label>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('User.table.account')" prop="account">
                    <label>{{formObject.account}}</label>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('User.table.password')">
                    <label>***</label>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('User.table.loginType')" prop="loginType">
                    <el-checkbox-group v-model="checkedLoginType">
                      <el-checkbox
                        v-for="item in loginType"
                        :key="item.key"
                        :label="item.key"
                        name="loginType"
                        disabled
                      >{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('User.table.onLine')">
                    <el-checkbox
                      v-model="formObject.checkOnLine"
                      :true-label="1"
                      :false-label="0"
                      disabled
                    >{{$t('User.placeholder.onLine')}}</el-checkbox>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('User.table.weChat')">
                    <label>{{formObject.weChat}}</label>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('User.table.realName')" prop="realName">
                    <label>{{formObject.realName}}</label>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('User.table.nickName')">
                    <label>{{formObject.nickName}}</label>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('User.table.quickQuery')">
                    <label>{{formObject.quickQuery}}</label>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('User.table.simpleSpelling')">
                    <label>{{formObject.simpleSpelling}}</label>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('User.table.gender')" show-overflow-tooltip>
                    <template>
                      <span>{{formObject.gender===0?'男':'女'}}</span>
                    </template>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('User.table.birthday')">
                    <label
                      :editable="false"
                      v-if="formObject.birthday"
                    >{{formObject.birthday.slice(0,10)}}</label>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('User.table.mobile')" prop="mobile">
                    <label>{{formObject.mobile}}</label>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('User.table.telephone')">
                    <label>{{formObject.telephone}}</label>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('User.table.email')">
                    <label>{{formObject.email}}</label>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('User.table.QQ')">
                    <label>{{formObject.qICQ}}</label>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('User.table.MSN')">
                    <label>{{formObject.mSN}}</label>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item :label="$t('User.table.ascriptionSystem')">
                    <label v-for="item in AscriptionSystem" :key="item.key" :label="item.text">
                      <label v-if="formObject.ascriptionSystem==item.key">{{item.text}}</label>
                    </label>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </section>
        </section>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
import { UserMixin } from "@/components/Base/BUser/mixin/UserMixin";
import { AscriptionSystem } from "@/common/js/BasisConfig";

export default {
  name: "Edit",
  data() {
    return {
      AscriptionSystem: AscriptionSystem
    };
  },
  mixins: [UserMixin],
  props: {
    formObject: {
      type: Object
    }
  },
  methods: {
    handleOpenDialog() {
      this.formObject.password = "";

      let loginType = this.formObject.loginType;

      this.loginType.forEach(item => {
        let ret = loginType & item.key;

        if (ret === item.key) {
          this.checkedLoginType.push(item.key);
        }
      });
    },
    handleSave: function(formName) {
      let _that = this;

      _that.$refs[formName].validate(valid => {
        if (valid) {
          if (
            _that.formObject.password !== null ||
            _that.formObject.password !== ""
          ) {
            _that.formObject.password = _that.$md5(_that.formObject.password);
          }

          _that.formObject.loginType = eval(_that.checkedLoginType.join("+"));

          _that
            .$put(`${_that.requestUri}${_that.formObject.id}`, _that.formObject)
            .then(() => {
              this.$emit("saveRefresh", false);
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style type="text/css" scoped>
.dialog-boday {
  height: 33rem;
}

.form-module-wrapper-container .content-wrapper-container {
  margin-top: 0rem;
}

</style>
