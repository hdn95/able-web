<template>
  <section>
    <el-dialog :visible="isVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               @close="handleCloseDialog">
      <section slot="title" class="el-dialog-title-container">
        <section>{{$t('DefaultTips.importTitle')}}</section>
        <section class="dialog-title-right-container">
          <a :href="templateUri">{{$t('DefaultTips.template')}}.xls</a>
        </section>
      </section>

      <section>
        <el-upload :action="'https://icore.gosafenet.com'+ requestUri"
                   :limit="1"
                   :on-error="handleError"
                   :on-success="handeleSuccess"
                   :before-upload="handleBeforeUpload">
          <el-button slot="trigger" size="small" type="primary"
                     icon="el-icon-upload" :loading="isUploading">
            {{isUploading ? $t('DefaultTips.uploading') : $t('DefaultButton.selectFile')}}
          </el-button>

          <div slot="tip" class="el-upload__tip">{{$t('DeviceImport.text.importTips')}}</div>
        </el-upload>

        <section class="table-container">
          <el-table border :data="dataCollection" max-height="300"
                    header-row-class-name="table-header-row-class"
                    class="cus-table"
                    size="medium" tooltip-effect="light">
            <el-table-column :label="$t('DeviceImport.table.row')" prop="row" align="center" width="200"
            ></el-table-column>
            <el-table-column :label="$t('DeviceImport.table.position')" prop="column" align="center"
            ></el-table-column>
            <el-table-column :label="$t('DeviceImport.table.reason')" prop="result" align="center" show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </section>
      </section>

      <section slot="footer">
        <el-button size="small" @click="handleCloseDialog">{{$t('DefaultButton.cancelButtonText')}}</el-button>
      </section>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Import",
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },
      requestUri: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        templateUri: `${window.location.origin}/CommonModule/ExcelImport/GetExcellTemperature?ImportId=af04eda5-dc78-46cc-b9f1-9d653db9eeee`,
        baseUri: window.location.origin,
        isUploading: false,
        dataCollection: []
      }
    },
    methods: {
      errorTips (msg) {
        this.$message({
          message: msg,
          type: 'error',
          duration: 1500
        })
      },
      handeleSuccess (response) {
        console.log(response)
      },
      handleError (err, file, fileList) {
        this.isUploading = false

        console.log(err)
      },
      handleBeforeUpload (file) {
        let _that = this

        if (!(/^.*?\.(xls|xlsx)$/.test(file.name.toLowerCase()))) {
          _that.errorTips(_that.$t('DeviceImport.text.errformat'))

          return false

        } else if (!(file.size / 1024 / 1024 < 10)) {
          _that.errorTips(_that.$t('DeviceImport.text.errsize'))

          return false
        }

        _that.isUploading = true
      },
      handleCloseDialog () {
        this.$emit("closeDialog")
      }
    }
  }
</script>

<style type="text/css" scoped>
  .el-dialog-title-container >>> .dialog-title-right-container:before {
    content: "(";
    padding-right: .3rem;
  }

  .el-dialog-title-container >>> .dialog-title-right-container:after {
    content: ")";
    padding-left: .3rem;
  }

  .el-dialog-title-container >>> .dialog-title-right-container a {
    font-size: .75rem;
    color: #4A5B79;
    border-bottom: 1px solid #4A5B79;
  }
</style>
