<!--头部组件-->
<template>
  <section class="overall-header-container">
    <header class="header-container">
      <section class="header-logo-container">{{$t('SystemName')}}</section>

      <section v-if="!LoginUser" class="login-reg">
        <router-link :to="{ path: '/login' }">登录</router-link> &nbsp;/ &nbsp;<a href="#">注册</a>
      </section>

      <section v-else>
        <el-popover
          placement="bottom"
          trigger="click">
          <section>
            <el-button @click="clearAllMessage" style="margin-bottom: 1rem" size="small" type="danger"
                       icon="el-icon-delete">清空
            </el-button>

            <template v-for="(item,index) in MessageTips">
              <el-alert style="margin-bottom: 1rem"
                        :key="index"
                        :title="item.Result"
                        type="success"
                        :closable="false">
              </el-alert>
            </template>

          </section>
          <el-button slot="reference" type="text" style="margin-right: .8rem;font-size: 1rem">
            <el-badge :is-dot="MessageTips.length>0">
              <i class="el-icon-bell" style="color: #ffffff"></i>
            </el-badge>
          </el-button>
        </el-popover>

        <el-dropdown class="dropdown-container">
          <section class="title-container">
            <section>{{currentLanguage.name}}</section>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </section>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(item,$index) in Languagetype">
              <el-dropdown-item v-if="currentLanguage.key !== item.key"
                                :key="$index" :disabled="item.display"
                                @click.native="handleSwitchlanguage(item,true)">
                &nbsp;{{ item.name }}
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown class="dropdown-container" trigger="click">
          <section class="title-container">
            <section>{{LoginUser.realName}} &nbsp;</section>
            <i class="el-icon-ump-user" style="font-size: 1rem;margin-top: 1px"></i>
          </section>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push({path:'/loginLog'})">
              <i class="el-icon-ump-denglurizhi"></i> &nbsp;{{ $t("LoginLog.btn") }}
            </el-dropdown-item>
            <el-dropdown-item @click.native="handleRefreshCache">
              <i class="el-icon-refresh"></i> &nbsp;{{ $t("RefreshCacheMessageBox.btn") }}
            </el-dropdown-item>
            <el-dropdown-item @click.native="handleLoginOut">
              <i class="el-icon-back"></i> &nbsp;{{ $t("LoginOutMessageBox.btn") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </section>
    </header>
  </section>
</template>

<script>
  import {RemoveLoginUser} from "@common/js/login/LoginManage"
  import {mapActions, mapGetters} from 'vuex'
  import {Login} from "@common/js/ApiConfig"
  import {MenuMixin} from "@/common/mixin/MenuMixin"
  import {LanguageMixin} from "@/common/mixin/LanguageMixin"
  import {Languagetype} from "@/common/lang/Language"
  import {ClearAllStorage} from "@/common/js/Cache"

  export default {
    name: "index",
    mixins: [MenuMixin, LanguageMixin],
    computed: {
      ...mapGetters({
        MessageTips: 'MessageTips',
        currentLanguage: 'CurrentLanguage'
      })
    },
    methods: {
      ...mapActions({
        clearMessage: 'ClearMessageAction',
        handleClearRouterTabs: "ClearRouterTabsAction",
        handleRemoveMenusJsonTree: 'RemoveMenusJsonTreeAction'
      }),
      handleRefreshCache () {
        let _that = this

        _that.$confirm(_that.$t('RefreshCacheMessageBox.text'), _that.$t('MessageBox.confirmTitle'), {
          confirmButtonText: _that.$t('RefreshCacheMessageBox.confirmButtonText'),
          cancelButtonText: _that.$t('RefreshCacheMessageBox.cancelButtonText'),
          iconClass: 'el-icon-question'
        })
          .then(() => {
            _that.$router.push({path: "/"})

            _that.handleGetMenu()
          })
          .catch(() => {

          })
      },
      handleLoginOut () {
        const _that = this

        _that.$confirm(_that.$t('LoginOutMessageBox.text'), _that.$t('MessageBox.confirmTitle'), {
          confirmButtonText: _that.$t('LoginOutMessageBox.confirmButtonText'),
          cancelButtonText: _that.$t('LoginOutMessageBox.cancelButtonText'),
          iconClass: 'el-icon-question'
        })
          .then(() => {
            _that.$remove(Login.loginOut, {userId: _that.LoginUser.id})
              .then(() => {
                _that.$message({
                  type: "success",
                  message: `${_that.$t('LoginOutMessageBox.successText')}`,
                  duration: 1300
                })

                RemoveLoginUser()
                _that.$router.push({
                  path: "/login"
                })

                _that.handleRemoveMenusJsonTree()
                _that.handleClearRouterTabs()

                ClearAllStorage()
              })
              .catch(() => {

                RemoveLoginUser()
                _that.$router.push({
                  path: "/login"
                })

                _that.handleRemoveMenusJsonTree()
                _that.handleClearRouterTabs()

                ClearAllStorage()
              })
          })
          .catch(() => {
          })
      },
      clearAllMessage () {
        this.clearMessage()
        this.isVisible = false
      }
    },
    data () {
      return {
        Languagetype: Languagetype,
        routers: []
      }
    }
  }
</script>

<style type="text/css" scoped>
  .overall-header-container >>> .el-dialog {
    border-radius: 0px !important;
  }

  .dropdown-container >>> .title-container {
    height: 4rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    font-size: .8125rem;
  }

  .dropdown-container:not(:last-child) {
    margin-right: .8rem;
  }

  .dropdown-container {
    cursor: pointer;
    color: #ffffff;
  }

  .header-container >>> .login-reg a {
    color: #ffffff;
  }

  .header-container >>> .header-logo-container {
    font-size: 1.5rem;
    font-weight: 600;
    text-shadow: #000 0.2rem 0.28rem 0.2rem
  }

  .overall-header-container >>> .header-container {
    width: 100%;
    height: 100%;
    display: inline-flex;
    display: -webkit-inline-flex;
    align-items: center;
    justify-content: space-between;
    font-size: .9rem;
  }
</style>
