<template>
	<div>
		<!-- 타이틀바 / 공통버튼 영역    -->
		<title-bar-n-role-buttons 
			:fnCallFunc='$fnCallFunc' 
		/>
		<!-- 타이틀바 / 공통버튼 영역 끝 -->

		<!-- search_table -->
		<div class="search_table">
			<table>
				<caption></caption>
				<colgroup>
					<col style="width:150px" />
					<col style="width:auto" />
					<col style="width:150px" />
					<col style="width:auto"  />
				</colgroup>
				<tbody>
					<tr>
						<!-- 등록일자 -->
						<th>{{$t('label.REGIST')}}{{$t('label.DE')}}</th>
						<td>
							<common-datepicker ref="rceptBeginDe" id="rceptDe" v-model.trim="srchParams.srchRceptFromDe" :options="{}" />
                            <common-datepicker ref="rceptEndDe" id="rceptDe" v-model.trim="srchParams.srchRceptToDe" :options="{}" />
						</td>
                        <!-- 회원여부 -->
                        <th>{{$t('label.MBER')}}{{$t('label.SE_CODE')}}</th>
                        <td>
                            <select class="form-control" v-model="srchParams.srchMberSeCode" style='width: 100px;'>
                                <option v-for='option in attrsMberSeCode' :value='option.value' :key='option.key'>{{ option.text }}</option>
                            </select>
                        </td>
					</tr>
                    <tr>
                        <!-- 회원검색 -->
                        <th>{{$t('label.MBR_SRCH')}}</th>
                        <td>
                            <common-mber-search :selectValue="''" :textValue1="''" :textValue2="''" :textValue3="'01'" 
                                ref="mberSearch" :indinfoSeCode='indinfoSeCode' @commMberSearch="$mberSelected"
                                />
                        </td>
                        <!-- 처리단계 -->
                        <th>{{$t('label.PROCESS')}}{{$t('label.STEP')}}</th>
                        <td>
                            <select class="form-control" ref="rceptSttusCode" v-model="srchParams.srchRceptSttusCode" style='width: 100px;' >
                                <option v-for='option in attrsRceptSttusCode' :value='option.value' :key='option.key'>{{ option.text }}</option>
                            </select>
                        </td>
                    </tr>
					<tr>
						<!-- 유형 -->
						<th>{{$t('label.TYPE')}}</th>
						<td>
                            <select class="form-control" ref="rceptTyCode" v-model="srchParams.srchRceptTyCode" style='width: 120px;' @change='$setRceptTyDtCombo' >
                                <option v-for='option in attrsRceptTyCode' :value='option.value' :key='option.key'>{{ option.text }}</option>
                            </select>
                            <select class="form-control" ref="rceptTyDtCode" v-model="srchParams.srchRceptTyDtCode" style='width: 120px;' >
                                <option v-for='option in attrsRceptTyDtCode' :value='option.value' :key='option.key'>{{ option.text }}</option>
                            </select>	
						</td>
                        <!-- 접수번호 -->
                        <th>{{$t('label.RCEPT')}}{{$t('label.NO')}}</th>
                        <td>
                            <input id="srchRceptNo" ref="srchRceptNo" type="text" name="srchRceptNo" :placeholder="''" maxlength="100" v-model="srchParams.srchRceptNo" v-on:keydown.enter='$fnInquire'/>
                        </td>
					</tr>
                    <tr>
                        <!-- 처리자 -->
                        <th>{{ $t('label.PROC_CHARGER')}}</th>
                        <td>
                            <div class="code_sea">
                                <!-- 사원번호 -->
                                <p><input v-model="srchParams.srchProcessEmplyrLoginId" type="text" :disabled="true" :placeholder="$t('label.ID')" maxlength="10"  
                                    v-on:keydown.enter='$searchEmpPopup(srchParams,"process")'
                                    v-on:keydown.delete='$searchEmpClear(srchParams,"process")'
                                /></p>
                                <!-- 검색 -->
                                <p><button @click.prevent="$searchEmpPopup(srchParams,'process')" >{{$t('label.SEARCH')}}</button></p><!-- 단건파라미터, 단건리턴 -->
                                <!-- 사원명 -->
                                <p><input v-model="srchParams.srchProcessEmplyrNm" type="text" :placeholder="$t('label.EMP_NM')" maxlength="50"
                                    v-on:keydown.enter='$searchEmpPopup(srchParams,"process")'
                                    v-on:keydown.delete='$searchEmpClear(srchParams,"process")'
                                /></p>
                            </div>
                        </td>
                        <!-- 접수자 -->
                        <th>{{$t('label.RCEPT_CHARGER')}}</th>
                        <td>
                            <div class="code_sea">
                                <!-- 사원번호 -->
                                <p><input v-model="srchParams.srchRceptEmplyrLoginId" type="text" :disabled="true" :placeholder="$t('label.ID')" maxlength="10"  
                                    v-on:keydown.enter='$searchEmpPopup(srchParams,"rcept")'
                                    v-on:keydown.delete='$searchEmpClear(srchParams,"rcept")'
                                /></p>
                                <!-- 검색 -->
                                <p><button @click.prevent="$searchEmpPopup(srchParams,'rcept')" >{{$t('label.SEARCH')}}</button></p><!-- 단건파라미터, 단건리턴 -->
                                <!-- 사원명 -->
                                <p><input v-model="srchParams.srchRceptEmplyrNm" type="text" :placeholder="$t('label.EMP_NM')" maxlength="50"  
                                    v-on:keydown.enter='$searchEmpPopup(srchParams,"rcept")'
                                    v-on:keydown.delete='$searchEmpClear(srchParams,"rcept")'
                                /></p>
                            </div>
                        </td>
                    </tr>
				</tbody>
			</table>
		</div>
		<!-- search_table -->

		<!-- 그리드 영역     -->
        <div>
            <div class="con_tit">
                <!-- 상담 조회 내역 -->
                <h3>{{$t('label.CNSLT')}} {{$t('label.INQUERY')}} {{$t('label.DTLS')}}</h3>
                <p class="num">[ {{ $t('label.TOTALCOUNT', {'count': mstRowCountInfo}) }} ]</p>
            </div>

        	<div class="grid_edge">
				<div class="default-list">
					<grid
						id="grdHistory"
						ref="grdHistory"
						v-bind='grdHistoryProps'
						@click="$rowClick"   
					/>
				</div>

			    <!-- 페이지 영역    -->
			    <pagination 
		        	:totalRows="totalRows"
		        	:pageModel="srchParams"
		        	:clickFunc="$grdSch"
		        	ref="pagination"
		        />
			    <!-- 페이지 영역 끝 -->
			</div>
        </div>

		<!-- 그리드 영역 끝 -->

		<!-- 
			팝업창(필요시 동적으로 로딩)
			dynComp / options / params / submit / cancel 은 
			data() 에 기본값으로 설정 해둠
		 -->
		<component
			ref='popComp'
			:is="dynComp"
			:options='options'
			:params='params'
			:submit='submit'
			:cancel='cancel'
		/>
		<!-- 팝업창 끝 -->
	</div> 
</template>

<script>
import cscript from '@/plugins/commonScripts'
import cutil from '@/plugins/commonUtils'
import Constant from '@/plugins/constant'

import mixinCsCenterCommon from './mixin/mixinCsCenterCommon'
import CommonMberSearch from '@/components/commonMber/CommonMberSearch.vue'
import { CustomRowNumRenderer, CustomLinkRenderer } from '@/plugins/customTuiGridUtils'

export default {
    name: "VocRecordHistory",
    mixins : [
        mixinCsCenterCommon
    ],
    components : {
        CommonMberSearch,
    },
    computed	:	{

		// 기본정보 그리드 총건수 정보
		mstRowCountInfo() {
		    return this.$commaNumber(this.totalRows || 0);
		},	
    },
    methods : {
		//	페이지 공통
		//	공통 권한 버튼 클릭시 호출 됨
		$fnCallFunc( id, ev ) {
            switch( id ) {
				case 'inquire'	:	//	조회
					this.$fnInquire();
					break;
				case 'new'		:	//	신규
					this.$fnNew();
					break;
				case 'delete'	:	//	삭제
					this.$fnDelete();
					break;
				case 'save'		:	//	저장
					this.$fnSave();
					break;
				case 'excel'	:	//	엑셀
					this.$fnExcel();
					break;
				case 'print'	:	//	인쇄
					this.$fnPrint();
					break;
				case 'skll1'	:	//	기능1
					this.$fnSkll1();
					break;
				case 'skll2'	:	//	기능2
					this.$fnSkll2();
					break;
				case 'skll3'	:	//	기능3
					this.$fnSkll3();
					break;

				default:
					break;
			}
		},

		// 회원검색 완료 시 선택한 회원의 이메일과 전화번호를 세팅한다.
		$mberSelected(selected) {
            // 회원 선택 취소
            if (!selected) {
                this.srchParams.srchMberNo = null;

                return;
            }

            this.srchParams.srchMberNo = selected.mberNo;
		},

	    // 접수유형코드 [CSC0003] 변경시 옆에 있는 접수유형상세코드[CSC0004] 콤보 설정
        $setRceptTyDtCombo(e) { 
            e.preventDefault(); 
            e.stopPropagation();	

            console.log( "setRceptTyDtCombo : ", e );

            // this.attrsRceptTyDtCode.splice(0);
            // this.rceptData.rceptTyDtCode = '';

            // 접수유형코드가 선택으로 변경되었을 경우 상세코드 초기화
            if(e.target.value === "") {
                this.attrsRceptTyDtCode = cscript.$getComboOptions( [], { head: 'A' })
            } else {
                const dtlCodeList = this.attrsRceptTyDtCodeList.filter( ( x ) => { return x.refrn1Value == e.target.value
                                                                                        || x.refrn2Value == e.target.value
                                                                                        || x.refrn3Value == e.target.value
                                                                                        || x.refrn4Value == e.target.value; } );

                this.attrsRceptTyDtCode = cscript.$getComboOptions( dtlCodeList , { head: 'A' } );
            }

            this.srchParams.srchRceptTyDtCode = '';
        },

        /********* 처리자 관련 Method Start *********/
        /*
        * 사원 팝업 호출
        */
        $searchEmpPopup(srchParams,srchFg) {

   			const _this = this;

   			//	팝업 컴포넌트 동적 로딩
   			this.dynComp  = () => import( '@/pages/svcm/popup/EmpLoginIdSearchPopup.vue' );

            //	조회용 파라미터
            if(srchFg === "process") {
   			    this.params   = {
                    emplyrLoginId  : srchParams.srchProcessEmplyrLoginId,
		  		    emplyrNm       : srchParams.srchProcessEmplyrNm
   				};
            } else if(srchFg === "rcept") {
   			    this.params   = {
                    emplyrLoginId  : srchParams.srchRceptEmplyrLoginId,
		  		    emplyrNm       : srchParams.srchRceptEmplyrNm,
   				};
            }

   			//	callback 함수
   			//	리턴 데이터 처리
   			//	{ row data }
   			this.submit = function( dataList ) { 
   			  
   				if ( dataList && dataList.length > 0 ) {

                       //	코드/명 ( 기본 검색 대상 )
                       if(srchFg === "process") {
    			       	    srchParams.srchProcessEmplyrNo      = dataList[0].emplyrNo;
   				       	    srchParams.srchProcessEmplyrNm      = dataList[0].emplyrNm;
                            srchParams.srchProcessEmplyrLoginId = dataList[0].emplyrLoginId;
                       } else if(srchFg === "rcept") {
    			       	    srchParams.srchRceptEmplyrNo      = dataList[0].emplyrNo;
   				       	    srchParams.srchRceptEmplyrNm      = dataList[0].emplyrNm;
                            srchParams.srchRceptEmplyrLoginId = dataList[0].emplyrLoginId;
                       }
   				}
   			};

   			//	창을 그냥 닫을 경우, 
   			//	팝업창은 hidden 이벤트가 발생하며, 
   			//	이때, calcel() 을 호출 해서 컴포넌트를 destroy 하도록 함
   			//	팝업창이 destroy 되기 전 필요한 처리가 있을 경우 아래에 구현 함
   			this.cancel = function( p ) { 
   					//	동적 로딩한 팝업창 컴포넌트 destroy
   					//	팝업창을 띄울때, 기존에 생성된 컴포넌트는 
   					//	어차피 destroy 되고 새로 생성 됨
   					_this.dynComp = null;
			};
        },

        /**
        * 입력필드에서 Delete / Backspace 를 누를 경우 
        * 기존 조회한 결과 삭제
        */        
        $searchEmpClear(srchParams, srchFg) {
            if(srchFg === "process") {
                srchParams.srchProcessEmplyrNo      = null;
                srchParams.srchProcessEmplyrNm      = null;
                srchParams.srchProcessEmplyrLoginId = null;
            } else if(srchFg === "rcept") {
                srchParams.srchRceptEmplyrNo        = null;
                srchParams.srchRceptEmplyrNm        = null;
                srchParams.srchRceptEmplyrLoginId   = null;
            }
        },
        /********* 처리자 관련 Method End *********/

		//	조회
		$fnInquire() {			
			this.srchParams.pageNo = 1;
			this.$grdSch();
		},

		//	그리드 조회 호출
		$grdSch() {
    		this.srchParams.prevPageNo = this.srchParams.pageNo;

            // 혜택그리드 초기화
            this.grdHistory.invoke('resetData', []);

			this.$getList();
		},

		//	그리드 조회
		$getList() {
			const _this = this;
			
			const url = Constant.svcmFoHost + '/fo/svcm/v1.0.0/cscenter/voc-history'; // 호출 URL

			const config = {
				params : _this.srchParams
			};

			this.$axios.get(url, config).then( response => {
				console.log( 'response : ', response );
				
				// console.log(response.data.list)
				
				if ( !! response.data.list ) {

				    this.grdHistory.gridInstance.pageNo = this.srchParams.pageNo;		  
					this.grdHistory.gridInstance.size = this.srchParams.size;							
					
                    const data = response.data.list;

					_this.$refs.grdHistory.invoke('resetData', cutil.$setRowNumber( data, _this.srchParams.pageNo, _this.srchParams.size ) );

					// rows 표시
					_this.pageRows  = cscript.$numFmt( { value : this.grdHistory.invoke('getRowCount') } );
					_this.totalRows = response.data.totalRows;
				}
			}).catch( error => {
				cutil.$alertUncatchedError(error);
			});
		},

		// 그리드 row 클릭
		async $rowClick(e) {
		    // 그리드 외부 클릭한 경우는 skip
			if (e && e.targetType && (e.targetType === 'etc' || e.targetType === 'columnHeader')) {
			  return;
			}

			const rowKey = e == null ? 0 : e.rowKey;
            const row = this.$refs.grdHistory.invoke("getRow", rowKey);

            console.log(row);
			
            if(e.columnName == "rceptSj") {
   			    const _this = this;
    
   			    //	팝업 컴포넌트 동적 로딩
   			    this.dynComp  = () => import( '@/pages/cscenter/popup/VocHistoryPopup.vue' );
    
                //	조회용 파라미터
                this.params   = {
                    ctmmnyNo : row.ctmmnyNo,
                    rceptNo  : row.rceptNo,
                    mberNo   : row.mberNo,
                };

                console.log(this.params);
    
   			    //	callback 함수
   			    //	리턴 데이터 처리
   			    //	{ row data }
   			    this.submit = function( dataList ) { 
   			    	if ( dataList && dataList.length > 0 ) {
    
   			    	}
   			    };
    
   			    //	창을 그냥 닫을 경우, 
   			    //	팝업창은 hidden 이벤트가 발생하며, 
   			    //	이때, calcel() 을 호출 해서 컴포넌트를 destroy 하도록 함
   			    //	팝업창이 destroy 되기 전 필요한 처리가 있을 경우 아래에 구현 함
   			    this.cancel = function( p ) { 
   			    		//	동적 로딩한 팝업창 컴포넌트 destroy
   			    		//	팝업창을 띄울때, 기존에 생성된 컴포넌트는 
   			    		//	어차피 destroy 되고 새로 생성 됨
   			    		_this.dynComp = null;
			    };

            }

		},
    },
    data() {
		//	메뉴, 프로그램 정보
		const menuId        = this.$route.meta.menuCd; // 메뉴CD

        return {
			// 팝업창 관련 변수 설정
			dynComp     :   null,			//	동적으로 바인딩 할 팝업창 컴포넌트 
			options     :   {},				//	팝업창 관련 옵션. ex) multiSelect
			params      :   {},				//	팝업창에 전달할 파라미터. ex) 검색조건
			submit      :   null,			//	콜백함수. 전송한 데이터 처리 함수 설정
			cancel      :   null,			//	데이터 전송 없이 창을 닫을때 처리할 함수 설정

            indinfoSeCode : '',
            attrsMberSeCode : [],
            attrsRceptTyCode : [],
            attrsRceptTyDtCodeList : [],
            attrsRceptTyDtCode : [],
            attrsRceptSttusCode : [],
            attrsTrsmrcvSeCode : [],

			// 조회 데이터 전체 개수
			pageRows : 0,
			totalRows : 0,

            srchParams : {
                pageNo: 1,
                size: 10,
                indinfoSeCode : '',
                ctmmnyNo : '',
                srchRceptFromDe : '',
                srchRceptToDe : '',
                srchMberSeCode : '',
                tlphonMberNm : '',
                srchMberNo : '',
                srchRceptSttusCode : '',
                srchRceptTyCode : '',
                srchRceptTyDtCode : '',
                srchRceptNo : '',
                srchProcessEmplyrNo : '',
                srchProcessEmplyrLoginId  : '',
                srchProcessEmplyNm  : '',
                srchRceptEmplyrNo : '',
                srchRceptEmplyrLoginId  : '',
                srchRceptEmplyrNm  : '',
            },

        }
    },
    created() {

        ( async _ => {

        const authParams = {
                             ctmmnyNo      : this.$store.state.loginUser.ctmmnyNo  	//	고객사번호
                           , emplyrLoginId : this.$store.state.loginUser.loginId    //	사용자ID
                           , langTyCode    : this.$store.state.loginUser.langTyCode	//	언어유형코드
                           , menuId        : this.$route.meta.menuCd				//	메뉴CD
        };
        
        const btnAuths = await cutil.$getBtnAuth( authParams )
                                .catch( error => { 
                                        console.error( error.response );
                                    } );

        this.indinfoSeCode =  btnAuths.indinfoSeCode;	// 개인정보 접근권한여부

        this.srchParams.ctmmnyNo        = authParams.ctmmnyNo;
        this.srchParams.indinfoSeCode   = this.indinfoSeCode;

		const ctmmnyCmmnCodeList = await cutil.$getCtmmnyCmmnCodes( ['CSC0002', 'CSC0003', 'CSC0004', 'CSC0005', 'CSC0008'] );
        
        // 고객여부 [ CSC0002 ]
        this.attrsMberSeCode = cscript.$getComboOptions( ctmmnyCmmnCodeList['CSC0002'], {head:'A'});

	    // 접수유형코드 [ CSC0003 ]
	   	this.attrsRceptTyCode = cscript.$getComboOptions( ctmmnyCmmnCodeList['CSC0003'], {head:'A'});

	    // 접수유형상세코드 [ CSC0004 ]
	   	this.attrsRceptTyDtCodeList = cscript.$getComboOptions( ctmmnyCmmnCodeList['CSC0004'], {head:'A'}); //
        this.attrsRceptTyDtCode = cscript.$getComboOptions( [], { head: 'A' })

	    // 접수상태코드 [ CSC0005 ]
	   	this.attrsRceptSttusCode = cscript.$getComboOptions( ctmmnyCmmnCodeList['CSC0005'], {head:'A'});

	    // 송수신구분코드 [ CSC0008 ]
	   	this.attrsTrsmrcvSeCode = cscript.$getComboOptions( ctmmnyCmmnCodeList['CSC0008']);

        } )();

        // 주문 취소 정보
        this.grdHistoryProps = {
                name           : 'grdHistory',
                rowHeaders     : [{type: 'rowNum', renderer:CustomRowNumRenderer }],	//	['checkbox', 'rowNum']
                columnOptions  : { resizable: true },
                header: {
                    height: 70,
                    complexColumns: [
                        { desc: '접수유형', header: this.$t('label.RCEPT')+this.$t('label.TYPE'), name: 'mergeColumn1', childNames: ['rceptTyCode', 'rceptTyDetailCode'] },
                    ]
                },
                columns        : [
                        { desc:'등록일자'   , header: this.$t('label.REGIST')+this.$t('label.DE')   , name: 'rceptDe'             , align: 'center'    , width: 120, formatter: cscript.$dtFmt },
                        { desc:'회원여부'   , header: this.$t('label.MBER')+this.$t('label.SE_CODE'), name: 'mberSeCode'          , align: 'center'    , width: 100, formatter: row => this.$CodeNm(this.attrsMberSeCode, row) },
                        { desc:'유형'       , header: this.$t('label.TYPE')                         , name: 'rceptTyCode'         , align: 'center'    , width: 100, formatter: row => this.$CodeNm(this.attrsRceptTyCode, row) },
                        { desc:'상세'       , header: this.$t('label.DETAIL')                       , name: 'rceptTyDetailCode'   , align: 'center'    , width: 100, formatter: row => this.$CodeNm(this.attrsRceptTyDtCodeList, row) },
                        { desc:'처리단계'   , header: this.$t('label.PROCESS')+this.$t('label.STEP'), name: 'rceptSttusCode'      , align: 'center'    , width: 100, formatter: row => this.$CodeNm(this.attrsRceptSttusCode, row) },
                        { desc:'처리자'     , header: this.$t('label.PROC_CHARGER')                 , name: 'processEmplyrNm'     , align: 'center'    , width: 120 },
                        { desc:'회원이름'   , header: this.$t('label.MBER')+this.$t('label.NAME')   , name: 'tlphonMberNm'        , align: 'center'    , width: 120 },
                        { desc:'회원번호'   , header: this.$t('label.MBER')+this.$t('label.NO')     , name: 'mberNo'              , align: 'center'    , width: 120 },
                        { desc:'접수자'     , header: this.$t('label.RCEPT_CHARGER')                , name: 'rceptEmplyrNm'       , align: 'center'    , width: 120 },
                        { desc:'제목'       , header: this.$t('label.TESTNM')                       , name: 'rceptSj'             , align: 'left'      , width: 'auto', renderer: { type: CustomLinkRenderer } },
                ],
                data: [],
                usageStatistics: false,	//	false 로 설정 할것
                bodyHeight     : 428,
        };

    },
    mounted() {
		// 그리드 세팅
		this.grdHistory  = this.$refs.grdHistory;

        this.srchParams.srchRceptFromDe = this.$moment( new Date() ).format('YYYYMMDD');
        this.srchParams.srchRceptToDe   = this.$moment( new Date() ).format('YYYYMMDD');
    },
}
</script>
