<template>
  <el-dialog
    :visible="isVisible"
    @close="closeDialog"
    @closed="closedDialog"
    width="25%">
    <section slot="title">{{$t('Device.text.changePwd')}}</section>

    <section>
      <el-form ref="formChangePwd" :model="formObject" :rules="formRules" label-position="top">
        <el-form-item :label="$t('Device.text.oldPwd')" prop="oldPassword">
          <el-input :placeholder="$t('Device.placeholder.oldPwd')" type="password"
                    v-model="formObject.oldPassword"></el-input>
        </el-form-item>

        <el-form-item :label="$t('Device.text.newPwd')" prop="newPassword">
          <el-input :placeholder="$t('Device.placeholder.oldPwd')" type="password"
                    v-model="formObject.newPassword"></el-input>
        </el-form-item>
      </el-form>
    </section>

    <section slot="footer">
      <el-button size="small" @click="closeDialog">{{$t('DefaultButton.cancelButtonText')}}</el-button>
      <el-button size="small" type="primary" @click="handleSave('formChangePwd')">
        {{$t('DefaultButton.saveButtonText')}}
      </el-button>
    </section>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "ChangePwd",
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },
      deviceId: {
        type: String
      }
    },
    methods: {
      closedDialog () {
        this.$refs.formChangePwd.resetFields()
      },
      closeDialog () {
        this.$emit('close')
      },
      handleSave (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const oldPwd = this.$md5(this.formObject.oldPassword)
            const newPwd = this.$md5(this.formObject.newPassword)

            this.$put(`/Settings/Boards/DevicePassword/${this.deviceId}`, {
              oldPassword: oldPwd,
              newPassword: newPwd,
              id: this.deviceId
            })
              .then((ret) => {
                this.$message({
                  message: `${this.$t('DefaultTips.successText')}`,
                  type: 'success',
                  duration: 1800
                })

                this.closeDialog()
              })
              .catch(() => {

              })
          } else {

          }
        })
      }
    },
    data () {
      return {
        formRules: {
          oldPassword: {required: true, message: this.$t('Device.placeholder.oldPwd'), trigger: 'blur'},
          newPassword: {required: true, message: this.$t('Device.placeholder.newPwd'), trigger: 'blur'}
        },
        formObject: {
          oldPassword: '',
          newPassword: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
