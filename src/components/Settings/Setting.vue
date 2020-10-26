<template>
  <section class="setting-container">
    <section class="setting-wrapper" v-if="isShow">
      <el-form :model="formObject" ref="formModifySetting">
        <section>
          <section class="mt1" style="text-align: center">
            <el-row :gutter="24">
              <el-button @click="handleSaveSetting" type="warning" style="padding:15px 40px">保存</el-button>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_Ampere_Unbalance')}}
                    </section>

                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_Ampere_Unbalance" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>

                      <span v-if="formObject.Switch_Ampere_Unbalance !=='0'">
                             <el-input-number v-model="formObject.Param_Ampere_Unbalance"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number>
                          <i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_Ampere_Instable')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_Ampere_Instable" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>

                      <span v-if="formObject.Switch_Ampere_Instable !=='0'">
                             <el-input-number v-model="formObject.Param_Ampere_Instable"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number>
                          <i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>

              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_Voltage_Over')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_Voltage_Over" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>

                      <span v-if="formObject.Switch_Voltage_Over !=='0'">
                             <el-input-number v-model="formObject.Param_Voltage_Over"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number>
                          <i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_Ampere_Underload')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_Ampere_Underload" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>

                      <span v-if="formObject.Switch_Ampere_Underload !=='0'">
                             <el-input-number v-model="formObject.Param_Ampere_Underload"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number>
                          <i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_VoltagePhase')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_VoltagePhase" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>

                      <!--<span v-if="formObject.Switch_VoltagePhase !=='0'">-->
                      <!--<el-input-number v-model="formObject.Param_VoltagePhase"-->
                      <!--class="input-container" size="medium"-->
                      <!--controls-position="right"-->
                      <!--:min="inputMin"-->
                      <!--:max="inputMax"></el-input-number>-->
                      <!--<i class="el-icon-ump-baifenhao"></i>-->
                      <!--</span>-->
                    </section>
                  </section>

                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_UrgentButton')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_UrgentButton" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>
                    </section>
                  </section>
                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_Voltage_Unbalance')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_Voltage_Unbalance" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>

                      <span v-if="formObject.Switch_Voltage_Unbalance !=='0'">
                             <el-input-number v-model="formObject.Param_Voltage_Unbalance"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_Voltage_Under')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_Voltage_Under" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>

                      <span v-if="formObject.Switch_Voltage_Under !=='0'">
                             <el-input-number v-model="formObject.Param_Voltage_Under"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_Voltage_Instable')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_Voltage_Instable" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>

                      <span v-if="formObject.Switch_Voltage_Instable !== '0'">
                             <el-input-number v-model="formObject.Param_Voltage_Instable"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_Temperature')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_Temperature" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>
                      <!--<el-input type="text" class="input-container" size="medium"-->
                      <!--v-if="formObject.Switch_Temperature !== '0'"-->
                      <!--v-model="formObject.Param_Temperature"-->
                      <!--:maxlength="inputMaxLength"-->
                      <!--:suffix-icon="suffixIcon">-->
                      <!--</el-input>-->
                    </section>
                  </section>

                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_Ampere_Over')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_Ampere_Over" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>

                      <span v-if="formObject.Switch_Ampere_Over !== '0'">
                             <el-input-number v-model="formObject.Param_Ampere_Over"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.switch_Ampere_Short')}}
                    </section>
                    <section class="params-right-container">
                      <el-radio-group v-model="formObject.Switch_Ampere_Short" size="medium">
                        <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                      </el-radio-group>

                      <span v-if="formObject.Switch_Ampere_Short !== '0'">
                             <el-input-number v-model="formObject.Param_Ampere_Short"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Alarm_Temperature1')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature1"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Alarm_Temperature2')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature2"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Alarm_Temperature3')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature3"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Alarm_Temperature4')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature4"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Alarm_Temperature5')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature5"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>

              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Alarm_Temperature6')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature6"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Switch_Temperature1')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature1"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Switch_Temperature2')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature2"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Switch_Temperature3')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature3"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Switch_Temperature4')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature4"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Switch_Temperature5')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature5"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Switch_Temperature6')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature6"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="1"
                                              :max="100"></el-input-number><i class="el-icon-ump-sheshidu"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Frequency_Max')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Frequency_Max"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>

                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Frequency_Min')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Frequency_Min"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number><i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>
              </el-col>
            </el-row>
          </section>

          <section class="mt1">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item>
                  <section class="params-container-wrapper">
                    <section slot="label" class="params-left-container">
                      {{$t('SettingDevices.params.param_Voltage_Deficiency')}}
                    </section>
                    <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Voltage_Deficiency"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :min="inputMin"
                                              :max="inputMax"></el-input-number>
                          <i class="el-icon-ump-baifenhao"></i>
                          </span>
                    </section>
                  </section>
                </el-form-item>
              </el-col>

              <el-col :span="12"></el-col>
            </el-row>
          </section>
        </section>
      </el-form>
    </section>
  </section>
</template>

<script>
  export default {
    name: "Setting",
    methods: {
      handleInputDeviceId () {
        const _that = this

        this.$prompt('', _that.$t('SettingDevices.text.inputDeviceUID'), {
          closeOnClickModal: false,
          showCancelButton: false,
          closeOnPressEscape: false,
          showClose: false,
          inputPattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
          inputErrorMessage: _that.$t('SettingDevices.text.deviceUID'),
          inputPlaceholder: _that.$t('SettingDevices.text.deviceUID'),
          confirmButtonText: _that.$t('DefaultButton.confirmButtonText'),
          cancelButtonText: _that.$t('DefaultButton.cancelButtonText')
        }).then(({value}) => {
          this.checkDevice(value)
        })
      },
      checkDevice (uid) {
        this.$fetch(`/Settings/Boards/DeviceBID/${uid}`)
          .then((ret) => {
            this.isShow = true
            this.formObject = JSON.parse(ret.data)
          })
          .catch(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1800)
          })
      },
      handleSaveSetting () {
        const _that = this
        const form = _that.formObject

        _that.$prompt('', _that.$t('SettingDevices.text.inputPwd'), {
          inputType: 'password',
          closeOnClickModal: false,
          inputPlaceholder: _that.$t('SettingDevices.text.password'),
          confirmButtonText: _that.$t('DefaultButton.confirmButtonText'),
          cancelButtonText: _that.$t('DefaultButton.cancelButtonText'),
          inputPattern: /^[0-9A-Za-z]{6,12}$/,
          inputErrorMessage: _that.$t('SettingDevices.text.password')
        }).then(({value}) => {
          const pwd = _that.$md5(value)

          const o = {}

          for (const key in form) {
            if (key === 'BID') {
              const f = key.toLowerCase()

              o[f] = form[key]

            } else {
              const f = key.substring(0, 1).toLowerCase()
              const t = key.substring(1)

              const t_key = `${f}${t}`

              o[t_key] = form[key]
            }
          }

          _that.$post(`/Settings/Boards/DownSend/RandomCode?strRandomCode=${value}`, o)
            .then((res) => {
              _that.$message({
                message: `${_that.$t('DefaultTips.successText')}`,
                type: 'success',
                duration: 1800
              })

              setTimeout(() => {
                window.location.reload()
              }, 1800)
            })
        }).catch(() => {

        })
      }
    },
    data () {
      return {
        isShow: false,
        inputMax: 9999,
        inputMin: -9999,
        wendu: 'el-icon-ump-sheshidu',
        suffixIcon: 'el-icon-ump-baifenhao',
        formObject: {
          Switch_Ampere_Unbalance: '0',
          Switch_Ampere_Instable: '0',
          Switch_Voltage_Over: '0',
          Switch_Ampere_Underload: '0',
          Switch_VoltagePhase: '0',
          Switch_UrgentButton: '0',
          Switch_Voltage_Unbalance: '0',
          Switch_Voltage_Under: '0',
          Switch_Voltage_Instable: '0',
          Switch_Temperature: '0',
          Switch_Ampere_Over: '0',
          Switch_Ampere_Short: '0'
        }
      }
    },
    created () {
      this.$nextTick(() => {
        this.handleInputDeviceId()
      })
    }
  }
</script>

<style scoped>
  .setting-container {
    height: 100%;
    overflow-y: auto;
  }

  .setting-container >>> .setting-wrapper {
    padding: 3rem;
  }

  .setting-container >>> .el-form .el-row, .setting-container >>> .el-form .el-col {
    margin: 0px !important;
  }

  .setting-container >>> .params-container-wrapper {
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    display: -o-flex;
    align-items: center;
    justify-content: space-between;
  }

  .setting-container >>> .params-container-wrapper .params-left-container {
    display: inline-flex;
    display: -webkit-inline-flex;
    justify-content: flex-end;
    width: 35%;
  }

  .setting-container >>> .params-container-wrapper .params-right-container {
    display: inline-flex;
    display: -webkit-inline-flex;
    align-items: center;
    justify-content: flex-start;
    width: 60%;
  }

  .setting-container >>> .params-container-wrapper .params-right-container .input-container {
    width: 70%;
    margin-left: .5rem;
  }
</style>
