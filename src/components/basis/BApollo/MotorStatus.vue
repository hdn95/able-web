<!--首页电机状态组件-->

<template>
  <el-dialog
    :visible="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="closedDialog"
    @close="handleCloseDialog"
    @open="handleOpenDialog"
    width="65%"
  >
    <section slot="title" v-if="formObject">{{formObject.uName}}</section>

    <section class="dialog-boday" v-if="formObject">
      <section class="ref-time-container">
        <el-button
          @click="handleLoadData"
          size="small"
          type="success"
          plain
          icon="el-icon-refresh"
        >{{$t('DefaultButton.refreshButtonText')}}</el-button>

        <section>{{$t('DefaultTips.updateTime')}}：{{retData.datetime}}</section>
      </section>

      <section class="status-wrapper-container" v-if="retData.header=='02'">
        <el-tabs type="border-card">
          <el-tab-pane :label="$t('Apollo.status.operating')">
            <el-row :gutter="24" v-if="retData">
              <el-col :span="18">
                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section class="left-title-container">{{$t('MotorStatus.Status.status')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_latch ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section class="left-title-container">{{$t('MotorStatus.Status.highTEMP')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f_ov_temp_warning ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section class="left-title-container">{{$t('MotorStatus.Status.lowTEMP')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.s_ov_temp_fault ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.highVoltage')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ov_volt ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.lowVoltage')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ud_volt ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.highCurrent')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ov_curr ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.voltageImbalance')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_volt_unbal ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.currentImbalance')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_curr_unbal ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section class="left-title-container">{{$t('MotorStatus.Status.highPower')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ov_power ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.currentDirection')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ct_reverse ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.frequencyOutOfRange')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.s_freq_out_range ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.runningDirection')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.f_positive_dir ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="other-status-container">
                        <section>
                          {{$t('MotorStatus.Text.totalTime')}}&nbsp;
                          <span class="text-error">{{retData.m_runtime}}</span>
                          &nbsp;{{$t('MotorStatus.Text.hour')}}
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="other-status-container">
                        <section>
                          {{$t('MotorStatus.Text.wifiSignal')}}&nbsp;
                          <span class="text-error">{{retData.m_wifisignal}}</span>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="other-status-container">
                        <section>
                          {{$t('MotorStatus.Text.electricity')}}&nbsp;
                          <span class="text-error">{{retData.m_power}}</span>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6"></el-col>
                  </el-row>
                </section>
              </el-col>
              <el-col :span="5">
                <section class="gif-container">
                  <img src="https://able.gosafenet.com/images/MotorReverse.gif" width="100%">
                </section>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('Apollo.status.subdivisionStatus')">
            <el-row :gutter="24" v-if="retData">
              <el-col :span="24">
                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusTrippingTemperature')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f_ov_temp_warning ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmVoltageOver')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ov_volt ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmVoltageUnder')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ud_volt ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmAmpereUnderload')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.f_ampe_uload ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmAmpereOver')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ov_curr ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmVoltageUnbalance')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf1_sts_volt_unbalance ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmAmpereUnbalance')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_curr_unbal ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusPowerSupply')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.f_p_supply ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAmpereDirection')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ct_reverse ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmRateScopeOver')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.s_freq_out_range ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmUrgentButton')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f_ubutton_warning ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmVoltageInstable')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f_volt_instable ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmAmpereInstable')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f_ampe_instable ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus.statusAlarmVoltageDeficiency')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f_volt_deficiency ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('Apollo.status.subdivisionStatus1')">
            <el-row :gutter="24" v-if="retData">
              <el-col :span="24">
                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereAShort')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.f1_amp_a_short ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereBShort')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.f1_amp_b_short ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereCShort')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.f1_amp_c_short ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereAUnderload')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.f1_amp_a_uload ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereBUnderload')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.f1_amp_b_uload ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereCUnderload')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.f1_amp_c_uload ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmVoltageAInstable')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f1_volt_a_instable ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmVoltageBInstable')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f1_volt_b_instable ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmVoltageCInstable')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f1_volt_c_instable ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereAInstable')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f1_amp_a_instable ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereBInstable')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f1_amp_b_instable ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereCInstable')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f1_amp_c_instable ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereBCUnbalance')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f1_ampe_bc_ulance ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereABUnbalance')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f1_ampe_ab_ulance ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.subdivisionStatus1.statusAlarmAmpereACUnbalance')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f1_ampe_ac_ulance ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('Apollo.status.selfCheckState')">
            <el-row :gutter="24" v-if="retData">
              <el-col :span="24">
                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusEnergyMeter')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.sf_sts_energv ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusWifiModul')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.sf_sts_wifi ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusSub1Modul')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.sf_sts_sub1 ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusTemperature1')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.sf_sts_temp1 ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusTemperature2')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.sf_sts_temp2 ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusTemperature3')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.sf_sts_temp3 ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusTemperature4')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.sf_sts_temp4 ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusTemperature5')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.sf_sts_temp5 ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusTemperature6')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.sf_sts_temp6 ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusVoltageInput')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_voltInput ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusAmpereInput')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereInput ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusVoltageValue')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_voltValue ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusVoltagePhase')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_voltPhase ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusVoltageAUnder')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_voltA_ud ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusVoltageBCUnder')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_voltBC_ud ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState.statusVoltageInstable')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_volt_ins ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('Apollo.status.selfCheckState1')">
            <el-row :gutter="24" v-if="retData">
              <el-col :span="24">
                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusVoltageAOver')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_voltA_over ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusVoltageBCOver')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_voltBC_over ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusVoltageDeficiency')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_volt_defi ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusVoltageUnbalance')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_volt_unbalance ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereAExist')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereA_exist ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereBExist')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereB_exist ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereCExist')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereC_exist ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereAShort')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereA_short ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereBShort')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereB_short ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereCShort')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereC_short ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereAUnder')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereA_under ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereBUnder')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereB_under ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereCUnder')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereC_under ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereAOver')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereA_over ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereBOver')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereB_over ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState1.statusAmpereCOver')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereC_over ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('Apollo.status.selfCheckState2')">
            <el-row :gutter="24" v-if="retData">
              <el-col :span="24">
                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState2.statusFrequencyOutOfRange')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_frequency_out ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState2.statusContactor')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_contactor ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState2.statusAmpereBCUnbalance')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereBC_unbalance ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState2.statusAmpereABUnbalance')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereAB_unbalance ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.selfCheckState2.statusAmpereACUnbalance')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.sf_sts_ampereAC_unbalance ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </section>
      <section class="status-wrapper-container" v-else>
        <el-tabs type="border-card">
          <el-tab-pane :label="$t('Apollo.status.operating')">
            <el-row :gutter="24" v-if="retData">
              <el-col :span="18">
                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section class="left-title-container">{{$t('MotorStatus.Status.status')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_latch ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section class="left-title-container">{{$t('MotorStatus.Status.highTEMP')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.f_ov_temp_warning ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section class="left-title-container">{{$t('MotorStatus.Status.lowTEMP')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.s_ov_temp_fault ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.highVoltage')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ov_volt ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.lowVoltage')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ud_volt ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.highCurrent')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ov_curr ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.voltageImbalance')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_volt_unbal ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.currentImbalance')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_curr_unbal ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="status-container">
                        <section class="left-title-container">{{$t('MotorStatus.Status.highPower')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ov_power ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.currentDirection')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.s_ct_reverse ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.frequencyOutOfRange')}}</section>
                        <section class="right-title-container">
                          <div
                            :class="[retData.s_freq_out_range ? 'circle-error' : 'circle-normal']"
                          ></div>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="status-container">
                        <section
                          class="left-title-container"
                        >{{$t('MotorStatus.Status.runningDirection')}}</section>
                        <section class="right-title-container">
                          <div :class="[retData.f_positive_dir ? 'circle-error' : 'circle-normal']"></div>
                        </section>
                      </section>
                    </el-col>
                  </el-row>
                </section>

                <section class="mt1">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <section class="other-status-container">
                        <section>
                          {{$t('MotorStatus.Text.totalTime')}}&nbsp;
                          <span class="text-error">{{retData.m_runtime}}</span>
                          &nbsp;{{$t('MotorStatus.Text.hour')}}
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="other-status-container">
                        <section>
                          {{$t('MotorStatus.Text.wifiSignal')}}&nbsp;
                          <span class="text-error">{{retData.m_wifisignal}}</span>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6">
                      <section class="other-status-container">
                        <section>
                          {{$t('MotorStatus.Text.electricity')}}&nbsp;
                          <span class="text-error">{{retData.m_power}}</span>
                        </section>
                      </section>
                    </el-col>

                    <el-col :span="6"></el-col>
                  </el-row>
                </section>
              </el-col>
              <el-col :span="5">
                <section class="gif-container">
                  <img src="https://able.gosafenet.com/images/MotorReverse.gif" width="100%">
                </section>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </section>

      <section class="status-wrapper-container">
        <el-tabs type="border-card">
          <el-tab-pane :label="$t('Apollo.status.detail')">
            <section>
              <el-row :gutter="24">
                <el-col :span="8">
                  <section class="content-box-container">
                    <section class="title-module-wrapper-container">
                      <section
                        class="left-title-module"
                      >{{$t('MotorStatus.Temperature.text.title')}}</section>
                      <section class="right-title-module">
                        <i
                          class="el-icon-ump-charts"
                          :title="$t('MotorStatus.Text.charts')"
                          @click="$router.push({path:'/Temperature/Devices', query: {deviceUid: formObject.code}})"
                        ></i>
                      </section>
                    </section>

                    <section class="table-container">
                      <el-table
                        :data="temperature__dataCollection"
                        max-height="145"
                        tooltip-effect="light"
                        size="mini"
                      >
                        <el-table-column
                          :label="$t('MotorStatus.Temperature.table.temperature')"
                          prop="text"
                          show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                          :label="$t('MotorStatus.Temperature.table.value')"
                          prop="value"
                          show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column :label="$t('MotorStatus.Temperature.table.status')">
                          <template slot-scope="scope">
                            <div :class="[scope.row.status ? 'circle-error' : 'circle-normal']"></div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </section>
                  </section>
                </el-col>

                <el-col :span="8">
                  <section class="content-box-container">
                    <section class="title-module-wrapper-container">
                      <section class="left-title-module">{{$t('MotorStatus.Voltage.text.title')}}</section>
                      <section class="right-title-module">
                        <i
                          class="el-icon-ump-charts"
                          :title="$t('MotorStatus.Text.charts')"
                          @click="$router.push({path: '/Voltage/Devices', query: {deviceUid: formObject.code}})"
                        ></i>
                      </section>
                    </section>

                    <section class="table-container">
                      <el-table
                        :data="voltage_dataCollection"
                        max-height="145"
                        tooltip-effect="light"
                        size="mini"
                      >
                        <el-table-column
                          :label="$t('MotorStatus.Voltage.table.voltage')"
                          prop="text"
                          show-overflow-tooltip
                          fixed
                        ></el-table-column>
                        <el-table-column
                          :label="$t('MotorStatus.Voltage.table.value')"
                          prop="value"
                          show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column :label="$t('MotorStatus.Voltage.table.fullStatus')">
                          <template slot-scope="scope">
                            <div :class="[scope.row.fullStatus ? 'circle-error' : 'circle-normal']"></div>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('MotorStatus.Voltage.table.lackStatus')">
                          <template slot-scope="scope">
                            <div :class="[scope.row.lackStatus ? 'circle-error' : 'circle-normal']"></div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </section>
                  </section>
                </el-col>

                <el-col :span="8">
                  <section class="content-box-container">
                    <section class="title-module-wrapper-container">
                      <section class="left-title-module">{{$t('MotorStatus.Current.text.title')}}</section>
                      <section class="right-title-module">
                        <i
                          class="el-icon-ump-charts"
                          :title="$t('MotorStatus.Text.charts')"
                          @click="$router.push({path:'/Ampere/Devices', query: {deviceUid: formObject.code}})"
                        ></i>
                      </section>
                    </section>

                    <section class="table-container">
                      <el-table
                        :data="current_dataCollection"
                        max-height="145"
                        tooltip-effect="light"
                        size="mini"
                      >
                        <el-table-column
                          :label="$t('MotorStatus.Current.table.current')"
                          prop="text"
                          show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                          :label="$t('MotorStatus.Current.table.value')"
                          prop="value"
                          show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column :label="$t('MotorStatus.Current.table.status')">
                          <template slot-scope="scope">
                            <div :class="[scope.row.status ? 'circle-error' : 'circle-normal']"></div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </section>
                  </section>
                </el-col>
              </el-row>
            </section>
          </el-tab-pane>
        </el-tabs>
      </section>
    </section>
  </el-dialog>
</template>

<script>
import { WebSocketMixin } from "@/common/mixin/WebSocketMixin";

export default {
  name: "MotorStatus",
  mixins: [WebSocketMixin],
  props: {
    isVisible: {
      default: false,
      type: Boolean
    },
    formObject: {
      required: true,
      type: Object
    }
  },
  methods: {
    handleWebSocketOnMessage(event) {
      let _that = this;
      let rt = JSON.parse(event.data);
      let retData = JSON.parse(rt.data);
      let ret = JSON.parse(retData.arguments[0]);
      console.log("zd:" + retData.arguments[0]);
      if (retData.arguments[0] !== "CopyThat") {
        let args = [];

        args[0] = `${rt.messageId}`;
        args[1] = "CopyThat";

        let sendData = {
          id: retData.id,
          methodName: retData.methodName,
          arguments: args
        };

        _that.handleWebSocketSend(sendData);
      }

      if (ret.uid === _that.formObject.code) {
        _that.loadRetData(ret);
      }
    },
    loadRetData(ret) {
      let _that = this;
      _that.retData = ret;

      _that.current_dataCollection = [
        {
          text: _that.$t("MotorStatus.Current.table.aPhase"),
          value: ret.a_ampereU,
          status: ret.f_oc_phaseU
        },
        {
          text: _that.$t("MotorStatus.Current.table.bPhase"),
          value: ret.a_ampereV,
          status: ret.f_oc_phaseV
        },
        {
          text: _that.$t("MotorStatus.Current.table.cPhase"),
          value: ret.a_ampereW,
          status: ret.f_oc_phaseW
        }
      ];

      _that.voltage_dataCollection = [
        {
          text: _that.$t("MotorStatus.Voltage.table.aPhase"),
          value: ret.v_voltageU,
          fullStatus: ret.f_ov_phaseU,
          lackStatus: ret.f_uv_phaseU
        },
        {
          text: _that.$t("MotorStatus.Voltage.table.bPhase"),
          value: ret.v_voltageV,
          fullStatus: ret.f_ov_phaseV,
          lackStatus: ret.f_uv_phaseV
        },
        {
          text: _that.$t("MotorStatus.Voltage.table.cPhase"),
          value: ret.v_voltageW,
          fullStatus: ret.f_ov_phaseW,
          lackStatus: ret.f_uv_phaseW
        }
      ];

      _that.temperature__dataCollection = [
        {
          text: _that.$t("MotorStatus.Temperature.table.terminalBox"),
          value: ret.t_temp0,
          status: ret.f_ot_temp1
        },
        {
          text: _that.$t("MotorStatus.Temperature.table.statorWindingU"),
          value: ret.t_temp3,
          status: ret.f_ot_temp4
        },
        {
          text: _that.$t("MotorStatus.Temperature.table.statorWindingV"),
          value: ret.t_temp4,
          status: ret.f_ot_temp5
        },
        {
          text: _that.$t("MotorStatus.Temperature.table.statorWindingW"),
          value: ret.t_temp5,
          status: ret.f_ot_temp6
        },
        {
          text: _that.$t("MotorStatus.Temperature.table.frontBearing"),
          value: ret.t_temp1,
          status: ret.f_ot_temp2
        },
        {
          text: _that.$t("MotorStatus.Temperature.table.realBearing"),
          value: ret.t_temp2,
          status: ret.f_ot_temp3
        }
      ];
    },
    handleLoadData() {
      let _that = this;

      _that
        .$fetch(`/DataManage/Devices/${_that.formObject.code}`, {})
        .then(retData => {
          let ret = retData.data;
          _that.loadRetData(ret);
        })
        .catch(() => {});
    },
    closedDialog() {
      this.retData = "";
      this.current_dataCollection = [];
      this.voltage_dataCollection = [];
      this.temperature__dataCollection = [];
    },
    handleCloseDialog() {
      this.$emit("close");
    },
    handleOpenDialog() {
      let _that = this;

      _that.$axios
        .all([_that.handleLoadData(), _that.handleGetWebSocketUri()])
        .then(() => {});
    }
  },
  created() {
    this.$nextTick(() => {});
  },
  data() {
    return {
      retData: "",
      current_dataCollection: [],
      voltage_dataCollection: [],
      temperature__dataCollection: []
    };
  }
};
</script>

<style type="text/css" scoped>
.dialog-boday >>> .ref-time-container {
  display: flex;
  display: -ms-flex;
  display: -webkit-flex;
  display: -o-flex;
  display: -moz-flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-boday >>> .other-status-container {
  width: 100%;
  display: -webkit-flex;
  display: flex;
  display: -moz-flex;
  display: -o-flex;
  justify-content: center;
  align-items: center;
}

.dialog-boday >>> .status-container .left-title-container {
  display: -webkit-inline-flex;
  display: inline-flex;
  flex-direction: row-reverse;
  width: 80%;
  margin-right: 1rem;
}

.dialog-boday >>> .status-container .right-title-container {
  width: 20%;
}

.dialog-boday >>> .status-container {
  width: 100%;
  display: -webkit-flex;
  display: flex;
  display: -moz-flex;
  display: -o-flex;
  justify-content: center;
  align-items: center;
}

.dialog-boday >>> .gif-container {
  width: 100%;
  display: -webkit-flex;
  display: flex;
  display: -moz-flex;
  display: -o-flex;
  justify-content: flex-end;
  align-items: center;
}

/*.dialog-boday >>> .status-wrapper-container:not(:first-child) {*/
/*margin-top: 2rem;*/
/*}*/

.dialog-boday >>> .status-wrapper-container {
  margin-top: 1rem;
}

.dialog-boday >>> .content-box-container {
  padding: 0.5rem;
}

.dialog-boday >>> .table-container {
  margin: 1rem 0rem 0rem 0rem;
}

.dialog-boday {
  height: 40rem;
}
</style>
