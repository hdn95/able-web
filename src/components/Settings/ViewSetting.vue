<!--电机参数查看页面-->

<template>
  <section>
    <el-dialog
      :visible="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleCloseDialog"
      @open="handleOpenDialog" width="70%">
      <section slot="title">{{$t('SettingDevices.text.viewSetting')}}</section>

      <section class="dialog-boday">
        <el-form :model="formObject" ref="formModifySetting">
          <section>
            <section class="mt1">
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item>
                    <section class="params-container-wrapper">
                      <section slot="label" class="params-left-container">
                        {{$t('SettingDevices.params.switch_Ampere_Unbalance')}}
                      </section>

                      <section class="params-right-container">
                        <el-radio-group v-model="formObject.Switch_Ampere_Unbalance" size="medium" :disabled="disable">
                          <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                          <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                          <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                        </el-radio-group>

                        <span v-if="formObject.Switch_Ampere_Unbalance !=='0'">
                             <el-input-number v-model="formObject.Param_Ampere_Unbalance"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        <el-radio-group v-model="formObject.Switch_Ampere_Instable" size="medium" :disabled="disable">
                          <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                          <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                          <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                        </el-radio-group>

                        <span v-if="formObject.Switch_Ampere_Instable !=='0'">
                             <el-input-number v-model="formObject.Param_Ampere_Instable"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        <el-radio-group v-model="formObject.Switch_Voltage_Over" size="medium" :disabled="disable">
                          <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                          <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                          <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                        </el-radio-group>

                        <span v-if="formObject.Switch_Voltage_Over !=='0'">
                             <el-input-number v-model="formObject.Param_Voltage_Over"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        <el-radio-group v-model="formObject.Switch_Ampere_Underload" size="medium" :disabled="disable">
                          <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                          <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                          <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                        </el-radio-group>

                        <span v-if="formObject.Switch_Ampere_Underload !=='0'">
                             <el-input-number v-model="formObject.Param_Ampere_Underload"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        <el-radio-group v-model="formObject.Switch_VoltagePhase" size="medium" :disabled="disable">
                          <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                          <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                          <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                        </el-radio-group>

                        <!--<span v-if="formObject.Switch_VoltagePhase !=='0'">-->
                             <!--<el-input-number v-model="formObject.Param_VoltagePhase"-->
                                              <!--class="input-container" size="medium"-->
                                              <!--controls-position="right"-->
                                              <!--:disabled="disable"-->
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
                        <el-radio-group v-model="formObject.Switch_UrgentButton" size="medium" :disabled="disable">
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
                        <el-radio-group v-model="formObject.Switch_Voltage_Unbalance" size="medium" :disabled="disable">
                          <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                          <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                          <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                        </el-radio-group>

                        <span v-if="formObject.Switch_Voltage_Unbalance !=='0'">
                             <el-input-number v-model="formObject.Param_Voltage_Unbalance"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        <el-radio-group v-model="formObject.Switch_Voltage_Under" size="medium" :disabled="disable">
                          <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                          <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                          <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                        </el-radio-group>

                        <span v-if="formObject.Switch_Voltage_Under !=='0'">
                             <el-input-number v-model="formObject.Param_Voltage_Under"
                                              class="input-container" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        <el-radio-group v-model="formObject.Switch_Voltage_Instable" size="medium" :disabled="disable">
                          <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                          <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                          <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                        </el-radio-group>

                        <span v-if="formObject.Switch_Voltage_Instable !== '0'">
                             <el-input-number v-model="formObject.Param_Voltage_Instable"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        <el-radio-group v-model="formObject.Switch_Temperature" size="medium" :disabled="disable">
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
                        <el-radio-group v-model="formObject.Switch_Ampere_Over" size="medium" :disabled="disable">
                          <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                          <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                          <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                        </el-radio-group>

                        <span v-if="formObject.Switch_Ampere_Over !== '0'">
                             <el-input-number v-model="formObject.Param_Ampere_Over"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        <el-radio-group v-model="formObject.Switch_Ampere_Short" size="medium" :disabled="disable">
                          <el-radio-button label="0">{{$t('SettingDevices.text.close')}}</el-radio-button>
                          <el-radio-button label="1">{{$t('SettingDevices.text.alarm')}}</el-radio-button>
                          <el-radio-button label="2">{{$t('SettingDevices.text.trip')}}</el-radio-button>
                        </el-radio-group>

                        <span v-if="formObject.Switch_Ampere_Short !== '0'">
                             <el-input-number v-model="formObject.Param_Ampere_Short"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Alarm_Temperature2')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature2"
                                              class="input-container clmr" size="medium"
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Alarm_Temperature3')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature3"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Alarm_Temperature4')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature4"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Alarm_Temperature5')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature5"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Alarm_Temperature6')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Alarm_Temperature6"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Switch_Temperature1')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature1"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Switch_Temperature2')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature2"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Switch_Temperature3')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature3"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Switch_Temperature4')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature4"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Switch_Temperature5')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature5"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
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
                        {{$t('SettingDevices.params.param_Switch_Temperature6')}}
                      </section>
                      <section class="params-right-container">
                          <span>
                             <el-input-number v-model="formObject.Param_Switch_Temperature6"
                                              class="input-container clmr" size="medium"
                                              controls-position="right"
                                              :disabled="disable"
                                              :min="1"
                                              :max="100"></el-input-number><i class="el-icon-ump-baifenhao"></i>
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
                                              :disabled="disable"
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
                                              :disabled="disable"
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
                                              :disabled="disable"
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

      <section slot="footer"></section>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    name: "ViewSetting",
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },
      formObject: {
        type: Object
      }
    },
    methods: {
      handleOpenDialog () {

      },
      handleCloseDialog () {
        this.$emit('closeDialog')
      }
    },
    data () {
      return {
        disable: true,
        inputMax: 9999,
        inputMin: -9999,
        suffixIcon: 'el-icon-ump-baifenhao'
      }
    }
  }
</script>

<style scoped>
  .dialog-boday >>> .el-radio-group {
    width: 100% !important;
  }

  .dialog-boday >>> .el-row {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }

  .dialog-boday >>> .params-container-wrapper {
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    display: -o-flex;
    align-items: center;
    justify-content: space-between;
  }

  .dialog-boday >>> .params-container-wrapper .params-left-container {
    display: inline-flex;
    display: -webkit-inline-flex;
    justify-content: flex-end;
    width: 35%;
  }

  .dialog-boday >>> .params-container-wrapper .params-right-container {
    display: inline-flex;
    display: -webkit-inline-flex;
    align-items: center;
    justify-content: flex-start;
    width: 60%;
  }

  .dialog-boday >>> .params-container-wrapper .params-right-container .input-container {
    width: 70%;
    margin-left: .5rem;
  }
</style>
