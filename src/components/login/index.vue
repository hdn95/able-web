<!--登陆页面-->
<template>
  <section class="user-login-container">
    <section class="login-main-container">
      <section class="login-title">{{systemName}}</section>
      <section class="login-container">
        <img :src="systemBgImg" height="330" width="590"/>
        <section class="login-form-container">
          <section class="login-form-header-container">
            <section class="title">
              <section style="font-size: .8rem">{{ $t("Login.title") }}</section>
              <i class="el-icon-ump-right" style="padding-left: .8rem;font-size: 1.25rem"></i>
            </section>
            <section>
              <el-dropdown>
                <i class="el-icon-ump-language" style="cursor:pointer;font-size: 1.25rem;color: #ffffff"
                   :title="$t('Language.btn')"></i>
                <el-dropdown-menu slot="dropdown">
                  <template v-for="(item,$index) in Languagetype">
                    <el-dropdown-item v-if="currentLanguage.key !== item.key"
                                      :key="$index" :disabled="item.display"
                                      @click.native="handleSwitchlanguage(item,false)">
                      &nbsp;{{ item.name }}
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </section>
          </section>
          <section class="form-main-container">
            <section style="width: 80%;margin: 0 auto;padding-top: 1rem;">
              <el-form label-position="top" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
                <el-form-item :label="$t('Login.loginName')" prop="loginName">
                  <el-input prefix-icon="el-icon-ump-user" v-model.trim="loginForm.loginName"
                            :placeholder="$t('Login.loginNameTips')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Login.loginPwd')" prop="loginPwd">
                  <el-input prefix-icon="el-icon-ump-password" v-model.trim="loginForm.loginPwd"
                            :placeholder="$t('Login.loginPwdTips')" type="password"
                            @keyup.enter.native="submitLogin('loginFormRef')"></el-input>
                </el-form-item>
                <el-form-item>
                  <section class="login-btn">
                    <section>
                      <el-checkbox v-model="isSavedAccount">{{ $t("Login.rememberText") }}</el-checkbox>
                    </section>
                    <section>
                      <el-button size="small" type="info" class="btn-login-clear"
                                 :disabled="showLoading"
                                 @click="resetFieldsLogin('loginFormRef')">{{ $t("Login.clearBtn") }}
                      </el-button>
                      <el-button size="small" type="primary" :loading="showLoading" class="btn-login"
                                 :disabled="loginForm.loginPwd.length<=0"
                                 @click="submitLogin('loginFormRef')">
                        {{showLoading ? $t("Login.loginLoading") : $t("Login.loginBtn")}}
                      </el-button>
                    </section>
                  </section>
                </el-form-item>
              </el-form>
            </section>
          </section>
        </section>
      </section>

      <section style="font-size: .75rem;padding-top: 10rem" class="login-bottom-tips">
        <span>{{$t('Copyright.shortName')}}</span>
        <router-link tag="span" class="setting-tips" :to="{path:'/dev/setting'}">通过随机码设置电机参数</router-link>
      </section>
    </section>
  </section>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {Login} from "@common/js/ApiConfig"
  import {SetLoginUser} from "@common/js/login/LoginManage"
  import {LanguageMixin} from "@/common/mixin/LanguageMixin"
  import {Languagetype} from "@/common/lang/Language"

  // import QRCode from 'qrcodejs2'

  export default {
    name: "index",
    mixins: [LanguageMixin],
    computed: {
      ...mapGetters({
        currentLanguage: 'CurrentLanguage',
        savedAccount: "SavedAccount"
      })
    },
    methods: {
      ...mapActions({
        handleSetSavedAccount: 'SetSavedAccountAction',
        handleRemoveSavedAccount: 'RemoveSavedAccountAction'
      }),
      resetFieldsLogin (refName) {
        this.$refs[refName].resetFields()
      },
      routerRet () {
        let redirect = this.$route.query.ret

        if (redirect !== undefined) {
          window.location.href = `${window.location.origin}${redirect}`
        } else {
          window.location.href = `${window.location.origin}`
        }
      },
      submitLogin (refName) {
        const _that = this

        _that.$refs[refName].validate((valid) => {
          if (valid) {
            _that.showLoading = !_that.showLoading

            const uri = `${Login.ssoLogin}?userName=${_that.loginForm.loginName}&password=${_that.$md5(_that.loginForm.loginPwd)}&loginType=Web`

            _that.$post(uri)
              .then((ret) => {
                const retData = ret.data

                _that.$message({
                  message: _that.$t('Login.successText'),
                  type: 'success',
                  duration: 10000
                })

                SetLoginUser(retData)

                if (_that.isSavedAccount) {
                  _that.handleSetSavedAccount(_that.loginForm.loginName)
                } else {
                  _that.handleSetSavedAccount("")
                }

                _that.routerRet()
              })
              .catch(() => {
                _that.showLoading = !_that.showLoading
              })
          } else {
            return false
          }
        })
      }
    },
    data () {
      return {
        Languagetype: Languagetype,
        isSavedAccount: false,
        systemBgImg: '',
        systemName: '',
        showLoading: false,
        loginFormRules: {
          loginName: {
            required: true, message: this.$t('Login.loginNameTips'), trigger: 'blur'
          },
          loginPwd: {
            required: true, message: this.$t('Login.loginPwdTips'), trigger: 'blur'
          }
        },
        loginForm: {
          loginName: "",
          loginPwd: ""
        }
      }
    },
    created () {
      const _that = this

      this.$nextTick(() => {
        this.loginForm.loginName = _that.savedAccount

        // const qrcode = new QRCode("qrcode", {
        //   text: "https://www.baidu.com/",
        //   width: 128,
        //   height: 128,
        //   colorDark: "#000000",
        //   colorLight: "#ffffff",
        //   correctLevel: QRCode.CorrectLevel.H
        // })
      })
      this.$fetch(`/SSO/Systems`, {})
      .then((ret) => {
        const retData = ret.data
        this.systemName = retData.systemName
        this.systemBgImg = retData.imageUrl
        localStorage.setItem("attributionSystem", retData.attributionSystem);
        document.title = retData.systemName
      })
      .catch(() => {
      
      })

    }
  }
</script>

<style type="text/css" scoped>
  @import "login.css";

  .setting-tips {
    margin-left: .5rem;
    cursor: pointer
  }

  .setting-tips:hover {
    border-bottom: 1px solid #efefef;
  }

  .form-main-container >>> .login-btn {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between
  }
</style>
