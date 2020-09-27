import utilsTool from './pages/CommonComponent/utils.js'

App({
	onLaunch(options) {
		dd.getAuthCode({
			success: (res) => {
				// console.log(JSON.stringify(res));
				console.log('onLaunch DingLogin');
				this.DingLogin(res.authCode);
			},
			fail: (err) => {
				console.log('onLaunch.getAuthCode:::'+err)
				dd.alert({ content: JSON.stringify(err) })
			}
		});

	},
	onShow(options) {
		// 从后台被 scheme 重新打开
		// options.query == {number:1}
	},
	onHide() {
	},
	PUBLIC_BASE_URL: "http://10.0.100.221:8888",
	PUBLIC_BASE_IMG_URL: "http://10.0.100.221:8888",
	// PUBLIC_BASE_URL: "http://10.0.100.232:8080",
	// PUBLIC_BASE_IMG_URL: "http://10.0.100.232:8001",
	// PUBLIC_BASE_URL:"http://app.ijuyou.com",
	// PUBLIC_BASE_IMG_URL:"http://saas.ijuyou.com",
  /**
   * @description 上传服务地址
   */
	fileUploadServer: "/FileUpload/FileUploadHandler.ashx",
  /***
  * API地址
  */
	APIURL: {
		FollowUpRecentlyByUser: "API/FollowUp/FollowUpRecentlyByUser", //最近跟进
		/**
		 * @description 领取客户
		 */
		ReceiveTask: "API/Customer/ReceiveTask",
		/**
		 * @description 领取客户
		 */
		ReceiveTask_V1: "API/Customer/ReceiveTask_V1",
		/**
		 * @description 客户列表
		 */
		CustList: "API/Customer/CustList", //客户列表
		/**
		 * @description 获取往来单位--客户
		 */
		GetWldwCustList: "API/Customer/GetWldwCustList",
		/**
		 * @description 最终用户
		 */
		EndCustList: "API/Customer/EndCustList",
		/**
		 * @description 客户类型
		 */
		CustType: "API/Customer/CustType",
		/**
		 * @description 行业
		 */
		CustIndustry: "API/Constant/Industry",
		/**
		 * @description 客户新增保存
		 */
		CustAddSave: "API/Customer/AddSave",
		/**
		 * @description 客户修改保存
		 */
		CustEditSave: "API/Customer/EditSave",
		/**
		 * @description 根据客户Id得到客户信息
		 */
		CustById: "API/Customer/CustById",
		/**
		 * @description 新增保存最终客户
		 */
		AddSaveEndCust: "API/Customer/AddSaveEndCust",
		/**
		 * @description 我有权查看的所有客户（直销、渠道、最终客户）
		 */
		AllCustList_V2: "API/Customer/AllCustList_V2",
		/**
		 * @description 获取钉钉小程序--日常检查 列表数据
		 */
		DailyCheckList: "API/DailyCheck/DailyCheckList",
		/**
		 * @description 读取有权查看的人
		 */
		UserPower: "API/User/ViewHasRightUser",
		/**
		 * @description 获取App客户列表上有权查看的销售人员列表
		 */
		GetCustomerListRightSalers: "API/Customer/GetCustomerListRightSalers",
		/**
		 * @description 登录
		 */
		IsLogin: 'Login/IsLogin',
		/**
		 * @description 得到日报详细
		 */
		DiaryDetails: 'API/Diary/GetDiaryByUserId',
		/**
		 * @description 得到今日计划
		 */
		DiaryTodayPlan: 'API/Diary/GetTodayPlan',
		/**
		 * @description 得到跟进内容
		 */
		DiaryFollowupList: 'API/FollowUp/GetFollowupList',
		/**
		 * @description 根据日期得到日报
		 */
		DiaryByDate: 'API/Diary/GetDiaryByDate',
		/**
		 * @description 保存日报
		 */
		DiarySave: 'API/Diary/SaveDiary',
		/**
		 * @description 审批日报
		 */
		DiaryReview: 'API/Diary/ReviewDiary',
		/**
		 * @description 得到评论
		 */
		GetComment: 'API/Comment/GetComment',
		/**
		 * @description 回复评论
		 */
		ReplyComment: "/API/Comment/ReplyComment",
		/**
		 * @description 获取集团下所有用户信息--用于App端缓存20171116
		 */
		GetFirmUsers: "API/User/GetFirmUsers",
		/**
		 * @description 获取集团下所有用户信息--用于App端缓存20180418[修复App端离职/停用的人员头像信息获取不到的问题]
		 */
		GetFirmUsersV2: "API/User/GetFirmUsersV2",
		/**
		 * @description 联系-同事
		 */
		GetContactList: "API/User/GetContactList",
		/**
		 * @description 联系-最近跟进（无分页，取前limitNum条）
		 */
		FollowUpTopContact: 'API/FollowUp/FollowUpTopContact',
		/**
		 * @description 跟进方式
		 */
		GetFollowUpWay: "Api/FollowUp/GetFollowUpWay",
		/**
		 * @description 跟进有权查看的人
		 */
		FollowUpUserPower: "Api/FollowUp/FollowUpUserPower",
		/**
		 * @description 待我审批日报列表
		 */
		ViewUnApprovedDiaryList: 'API/Diary/ViewUnApprovedDiaryList',
		/**
		 * @description 根据用户Id得到该用户的日报列表
		 */
		ViewUserDiaryList: 'API/Diary/ViewUserDiaryList',
		/**
		 * @description 工作日报\工作周报App合并数据列表接口版本
		 */
		ViewUserWorkListV2: 'API/Diary/ViewUserWorkListV2',
		/**
		 * @description 根据用户Id得到该用户有权查看的日报列表
		 */
		ViewRightUserDiaryList: 'API/Diary/ViewRightUserDiaryList',
		/**
		 * @description 根据用户Id获取他有权查看的用户日报周报列表V2
		 */
		ViewRightUserWorkListV2: 'API/Diary/ViewRightUserWorkListV2',
		/**
		 * @description 根据用户Id获取他有权查看的用户日报周报列表V3(同事)
		 */
		ViewRightUserWorkListV3: 'API/Diary/ViewRightUserWorkListV3',
		/**
		 * @description 根据用户Id获取他有权查看的用户日报周报月报列表(他人分享给我的)
		 */
		ViewShareUserWorkList: 'API/Diary/ViewShareUserWorkList',
		/**
		 * @description 根据日期获取写周报时需要的信息
		 */
		GetWeeklyDetailByDate: 'API/Diary/GetWeeklyDetailByDate',
		/**
		 * @description 根据Id获取周报信息
		 */
		GetWeeklyDetailById: 'API/Diary/GetWeeklyDetailById',
		/**
		 * @description 周报保存
		 */
		WeeklySave: 'API/Diary/WeeklySave',
		/**
		 * @description 周报审批
		 */
		WeeklyApprove: 'API/Diary/WeeklyApprove',
		/**
		 * @description 根据日期获取写月报时需要的信息
		 */
		GetMonthlyDetailById: 'API/Diary/GetMonthlyDetailById',
		/**
		 * @description 根据Id获取月报信息
		 */
		GetMonthlyDetailById: 'API/Diary/GetMonthlyDetailById',
		/**
		 * @description 月报保存
		 */
		MonthlySave: 'API/Diary/MonthlySave',
		/**
		 * @description 月报审批
		 */
		MonthlyApprove: 'API/Diary/MonthlyApprove',
		/**
		 * @description 日报有权查看的用户列表
		 */
		ViewHasDiaryRightUser: 'API/Diary/ViewHasRightUser',
		/**
		 * @description 得到集团下所有技术的Id和头像，姓名
		 */
		GetAllTechUsers: 'Api/User/GetAllTechUsers',
		/**
		 * @description 根据userId和集团Id获取用户详细信息
		 */
		GetUserDetailInfo: 'Api/User/GetUserDetailInfo',
		/**
		 * @description 得到首页消息提醒数量
		 */
		GetMsgCount: 'API/Message/GetMsgCount',
		/**
		 * @description 根据客户Id得到客户联系人列表
		 */
		GetLinkManList: 'API/LinkMan/GetLinkManList',
		/**
	 * @description 根据objId和objType得到跟进信息
	 */
		GetListByObjId: 'API/FollowUp/GetListByObjId',
		/**
		 * @description 新增联系人保存
		 */
		AddSaveLinkMan: 'API/LinkMan/AddSaveLinkMan',
		/**
		 * @description 修改联系人保存
		 */
		EditSaveLinkMan: 'API/LinkMan/EditSaveLinkMan',
		/**
		 * @description 查看联系人
		 */
		ViewLinkMan: 'API/LinkMan/ViewLinkMan',
		/**
		 * @description 根据客户Id得到客户下的跟进列表
		 */
		GetFollowupByCust: 'API/FollowUp/GetFollowupByCust',
		/**
		 * @description 根据用户Id查看该用户的跟进列表
		 */
		FollowUpRecentlyByUser: 'API/FollowUp/FollowUpRecentlyByUser',
		/**
		 * @description 根据用户Id查看该用户和同事的的跟进列表
		 */
		FollowUpRecentlyByTongShi: 'API/FollowUp/FollowUpRecentlyByTongShi',
		/**
		 * @description 根据跟进ID得到详细信息
		 */
		GetFollowupDetails: 'API/FollowUp/GetFollowupDetails',
		/**
		 * @description 得到跟进方式
		 */
		LinkWay: "API/Constant/LinkWay",
		/**
		 * @description 保存跟进
		 */
		SaveFollowup: "API/FollowUp/SaveFollowup",
		/**
		 * @description 首页跟进提醒
		 */
		GetFollowUpRemindList: "API/FollowUp/GetRemindList",
		/**
		 * @description 标记跟进计划为已跟进
		 */
		MarkFollowed: "API/FollowUp/MarkFollowed",
		/**
		 * @description 获取跟进计划分页列表
		 */
		GetFollowupPlanList: "API/FollowUp/GetFollowupPlanList",
		/**
		 * @description 得到最新版本编号
		 */
		GetVersion: "API/Base/GetVersion",
		/**
		 * @description 根据平台获取最新版本（0：安卓；1：苹果）
		 */
		GetVersionV2: "API/Base/GetVersionV2",
		/**
		 * @description 根据平台和版本号获取版本信息（0：安卓；1：苹果）
		 */
		GetCurrentVersionV2: "API/Base/GetCurrentVersionV2",
		/**
		 * @description 得到新的token
		 */
		GetToken: "Login/GetToken",
		/**
		 * @description 得到费用列表
		 */
		GetCostList: "API/Cost/GetList",
		/**
		 * @description 费用详细
		 */
		GetCostDetails: "API/Cost/GetCostDetails",
		/**
		 * @description 得到费用类型
		 */
		GetCostType: "API/Cost/GetCostType",
		/**
		 * @description 保存费用
		 */
		SaveCost: "API/Cost/SaveCost",
		/**
		 * @description 得到费用所属
		 */
		GetCostAscription: "API/Cost/GetCostAscription",
		/**
		 * @description 得到所有的常量信息
		 */
		GetConstant: "API/Constant/GetConstant",
		/**
		 * @description 获取任务周期可选项
		 */
		GetTaskCycle: "API/Constant/TaskCycle",
		/**
		 * @description 获取区域分组
		 */
		GetRegionalGroup: "API/UConstant/GetRegionalGroup",
		/**
		 * @description 获取公司自定义费用类型
		 */
		GetDefinedCostType: "API/UConstant/GetDefinedCostType",
		/**
		 * @description 获取提交人所在公司费用类型
		 */
		GetDefinedCostTypeTwo: "API/UConstant/GetDefinedCostTypeTwo",
		/**
		 * @description 根据省市县Id获取区域
		 */
		GetRegion: "API/UConstant/GetRegion",
		/**
		 * @description 提醒-全部标记为已读
		 */
		MarkAllIsRead: "API/Message/MarkAllIsRead",
		/**
		 * @description 提醒-部分标记为已读
		 */
		MarkIsRead: "API/Message/MarkIsRead",
		/**
		 * @description 提醒- 消息列表
		 */
		MsgList: "API/Message/MsgList",
		/**
		 * @description 销售管理-报备列表
		 */
		GetSaleReocrdList: "/API/Record/GetSaleReocrdList",
		/**
		 * @description 销售管理-报备-查看报备信息
		 */
		RecordDetail: "/API/Record/RecordDetail",
		/**
		 * @description 新增报备保存
		 */
		AddSaveRecord: "/API/Record/AddSaveRecord",
		/**
		 * @description 修改报备保存
		 */
		EditSaveRecord: "/API/Record/EditSaveRecord",
		/**
		 * @description 获取已经申请过报备的人员
		 */
		RecordAppliedUsers: "/API/Record/AppliedUsers",
		/**
		 * @description 供应商列表
		 */
		SupplierList: "/API/Supplier/SupplierList",
		/**
		 * @description 供应商列表V2,有权限
		 */
		SupplierListV2: "/API/Supplier/SupplierListV2",
		/**
		 * @description 供应商产品列表
		 */
		SupplierProductList: "/API/Supplier/SupplierProductList",
		/**
		 * @description 产品档案产品列表
		 */
		ProductList: "/API/Product/ProductList",
		/**
		 * @description 产品档案产品列表V2
		 */
		ProductListV2: "/API/Product/ProductListV2",
		/**
		 * @description 获取产品分类一级分类
		 */
		GetProductTypeList: "/API/Product/GetProductTypeList",
		/**
		 * @description 获取产品性质列表
		 */
		GetProductNatureList: "/API/Product/GetProductNatureList",
		/**
		 * @description 获取产品详情
		 */
		GetProductDetail: "/API/Product/GetProductDetail",
		/**
		 * @description 得到待办列表
		 */
		ApprovalList: "API/WorkFlow/ApprovalList",
		/**
		 * @description 得到流程日志
		 */
		WFNotes: "API/WorkFlow/Notes",
		/**
		 * @description 得到下一步骤审批信息
		 */
		NextActivity: "API/WorkFlow/NextActivity",
		/**
		 * @description 流程审批通过
		 */
		ApprovalPass: "API/WorkFlow/Pass",
		/**
		 * @description 流程审批不通过
		 */
		ApprovalNoPass: "API/WorkFlow/NoPass",
		/**
		 * @description 我的任务列表
		 */
		MyTaskList: "API/Task/MyTaskList",
		/**
		 * @description 销售管理-任务列表
		 */
		GetSaleTaskList: "API/Task/GetSaleTaskList",
		/**
		 * @description 待分配任务列表
		 */
		UnDistributeList: "API/Task/UnDistributeList",
		/**
		 * @description 已分配任务列表
		 */
		DistributedList: "API/Task/DistributedList",
		/**
		 * @description 任务详细信息
		 */
		TaskDetail: "API/Task/Detail",
		/**
		 * @description 分配任务保存
		 */
		DistributeSave: "API/Task/DistributeSave",
		/**
		 * @description 任务处理保存
		 */
		DisposeSave: "API/Task/DisposeSave",
		/**
		 * @description 任务处理历史记录
		 */
		DisposeHistory: "API/Task/DisposeHistory",
		/**
		 * @description 任务新增保存
		 */
		AddSaveTask: "API/Task/AddSaveTask",
		/**
		 * @description 任务新增保存(OA流程版)
		 */
		AddSaveTask_V2: "API/Task/AddSaveTask_V2",
		/**
		 * @description 任务修改保存
		 */
		EditSaveTask: "API/Task/EditSaveTask",
		/**
		 * @description 任务修改保存(OA流程版)
		 */
		EditSaveTask_V2: "API/Task/EditSaveTask_V2",
		/**
		 * @description 客户下任务列表
		 */
		GetTaskByCust: "API/Task/GetTaskByCust",
		/**
		 * @description 公告列表
		 */
		NoticeList: "API/Notice/List",
		/**
		 * @description 公告详细信息
		 */
		NoticeDetail: "API/Notice/Detail",
		/**
		 * @description 根据日期得到日程列表
		 */
		GetScheduleList: "API/Schedule/MyList",
		/**
		 * @description 返回一个月内是否有日程
		 */
		GetDataByMon: "API/Schedule/GetDataByMon",
		/**
		 * @description 查看日程的详细信息
		 */
		GetScheduleDetails: "API/Schedule/GetDetails",
		/**
		 * @description 保存日程
		 */
		SaveSchedule: "API/Schedule/SaveSchedule",
		/**
		 * @description 打卡考勤保存
		 */
		AttendSave: "API/Attend/AttendSave",
		/**
		 * @description 上班打卡保存
		 */
		AttendOnSave: "API/Attend/AttendOnSave",
		/**
		 * @description 下班打卡保存
		 */
		AttendOffSave: "API/Attend/AttendOffSave",
		/**
		 * @description 验证是否在规定打卡范围内
		 */
		IsValidAttend: "API/Attend/IsValidAttend",
		/**
		 * @description 获取打卡历史记录
		 */
		GetAttendHistory: "API/Attend/GetAttendHistory",
		/**
		 * @description 得到今天的考勤记录
		 */
		GetTodayAttend: "API/Attend/GetTodayAttend",
		/**
		 * @description 获取规定上班时间
		 */
		GetWorkTime: "API/Attend/GetWorkTime",
		/**
		 * @description 获取商机列表
		 */
		GetProjectList: "API/Project/GetProjectList",
		/**
		 * @description 商机状态列表
		 */
		ProjectStateList: "API/Project/ProjectStateList",
		/**
		 * @description 商机状态列表-根据当前人部门读取
		 */
		ProjectStateListV2: "API/Project/ProjectStateListV2",
		/**
		 * @description 商机类型列表
		 */
		ProjectTypeList: "API/Project/ProjectTypeList",
		/**
		 * @description 商机分类（用户自定义）
		 */
		DefinedProjectType: "API/Project/DefinedProjectType",
		/**
		 * @description 新增/修改商机信息保存
		 */
		SaveProject: "API/Project/SaveProject",
		/**
		 * @description 新增/修改商机信息保存V2
		 */
		SaveProjectV2: "API/Project/SaveProjectV2",
		/**
		 * @description 新增/修改商机信息保存V3
		 */
		SaveProjectV3: "API/Project/SaveProjectV3",
		/**
		 * @description 新增/修改商机信息保存V2
		 */
		SaveRemark: "API/Project/SaveRemark",
		/**
		 * @description 获取商机详细信息
		 */
		GetProjectDetails: "API/Project/Details",
		/**
		 * @description 引用商机列表
		 */
		UsingProjectList: "API/Project/UsingProjectList",
		/**
		 * @description 引用项目列表
		 */
		UsingProjectManagerList: "API/Project/UsingProjectManagerList",
		/**
		 * @description 获取项目状态列表
		 */
		GetProjectManagerState: "API/Project/GetProjectManagerState",
		/**
		 * @description 根据商机Id获取商机对应产品列表
		 */
		UsingProjectProduct: "API/Project/UsingProjectProduct",
		/**
		 * @description 获取商机已经申请过的人员
		 */
		ProjectAppliedUsers: "API/Project/AppliedUsers",
		/**
		 * @description 得到报销类型
		 */
		GetPayCostType: "API/Cost/GetPayCostType",
		/**
		 * @description 会议列表
		 */
		MeetingList: "API/Meeting/List",
		/**
		 * @description 发起会议保存
		 */
		SaveMeeting: "API/Meeting/SaveMeeting",
		/**
			* @description 结束会议
			**/
		FinishMeeting: "API/Meeting/FinishMeeting",
		/**
		 * @description 可选套餐列表
		 */
		ZmPackageList: "API/ZmPackage/List",
		/**
		 * @description 套餐购买
		 */
		BuyZmPackage: "API/ZmPackage/BuyZmPackage",
		/**
		 * @description 获取我的瞩目账号信息
		 */
		GetMyZmInfo: "API/ZmPackage/GetMyZmInfo",
		/**
		 * @description 获取我的套餐列表
		 */
		MyZmPackage: "API/ZmPackage/MyZmPackage",
		/**
		 * @description 取消瞩目套餐订单
		 */
		CancelOrder: "API/ZmPackage/CancelOrder",
		/**
		 * @description 获取支付宝支付签名信息
		 */
		GenerateAliPayment: "API/Pay/GenerateAliPayment",
		/**
		 * @description 获取微信支付签名信息
		 */
		GenerateWxPayment: "API/Pay/GenerateWxPayment",
		/**
		 * @description 获取短信验证码
		 */
		GetSmCode: "API/PwdReset/GetSmCode",
		/**
		 * @description 短信验证码验证是否有效
		 */
		ValidateSmCode: "API/PwdReset/ValidateSmCode",
		/**
		 * @description 重置密码
		 */
		ResetPost: "API/PwdReset/ResetPost",
		/**
		 * @description 注册提交
		 */
		RegistPost: "API/Regist/RegistPost",
		/**
		 * @description 备忘录保存
		 */
		SaveMemo: "API/Memo/SaveMemo",
		/**
		 * @description 根据日期区间获取某个用户的备忘录记录列表
		 */
		GetMemoListByUserDate: "API/Memo/GetListByUserDate",
		/**
		 * @description 根据人员日期获取当天备忘录列表
		 */
		GetMyMemoList: "API/Memo/GetMyMemoList",
		/**
		 * @description 获取备忘录详细信息
		 */
		GetMemoDetails: "API/Memo/GetDetails",
		/**
		 * @description 获取备忘录提醒类型
		 */
		GetMemoAlertType: "API/Constant/GetMemoAlertType",
		/**
		 * @description 获取备忘录重复类型
		 */
		GetMemoRepeatType: "API/Constant/GetMemoRepeatType",
		/**
		 * @description 删除备忘录
		 */
		DelMemo: "API/Memo/DelMemo",
		/**
		 * @description 获取采购订单分页列表
		 */
		GetOrderList: "API/Order/OrderList",
		/**
		 * @description 获取采购订单详细信息
		 */
		GetOrderDetails: "API/Order/GetDetails",
		/**
		 * @description 获取所有的制单人
		 */
		GetOrderAppliedUsers: "API/Order/GetAppliedUsers",
		/**
		 * @description 获取销售合同分页列表数据
		 */
		GetSaleContractList: "API/SaleContract/ContractList",
		/**
		 * @description 获取销售合同详细信息
		 */
		GetSaleContractDetails: "API/SaleContract/GetDetails",
		/**
		 * @description 获取销售合同所有的销售
		 */
		GetSaleContractAppliedUsers: "API/SaleContract/GetAppliedUsers",
		/**
		 * @description 获取付款方式
		 */
		GetPayWay: "API/Constant/GetPayWay",
		/**
		 * @description 获取库存量分页数据
		 */
		GetStockTotalList: "API/Stock/StockTotalList",
		/**
		 * @description 获取所有启用的仓库
		 */
		GetAllWarehouse: "API/Warehouse/GetAllWarehouse",
		/**
		 * @description 任务标记处理人到达
		 */
		TaskMarkArrived: "API/Task/MarkArrived",
		/**
		 * @description 任务开始处理
		 */
		TaskStartingDispose: "API/Task/StartingDispose",
		/**
		 * @description 任务主负责人请求协作时保存
		 */
		TaskSaveCooperation: "API/Task/SaveCooperation",
		/**
		 * @description 任务主负责人结束任务
		 */
		TaskFinishTask: "API/Task/FinishTask",
		/**
		 * @description 任务同意协作/驳回协作
		 */
		TaskOperateIsAccept: "API/Task/OperateIsAccept",
		/**
		 * @description 获取当前技术协作状态
		 */
		TaskGetMyTechInfo: "API/Task/GetMyTechInfo",
		/**
		 * @description 高驰版本我的任务列表数据接口
		 */
		MyTaskListV2: "API/Task/MyTaskListV2",
		/**
		 * @description 带高级查询的销售任务列表数据接口
		 */
		GetSaleTaskListV2: "API/Task/GetSaleTaskListV2",
		/**
		 * @description 获取任务下的客户记录（销售的跟进和任务处理）
		 */
		GetFollowBelowTask: "API/FollowUp/GetFollowBelowTask",
		/**
		 * @description 获取我的数据---商机
		 */
		GetMyDataProject: "API/Project/GetMyDataProject",
		/**
		 * @description 获取我的数据---商机V2
		 */
		GetMyDataProjectV2: "API/Project/GetMyDataProjectV2",
		/**
		 * @description 获取我的数据---商机--获取本月跟进过的商机列表
		 */
		GetFollowedCurMonthList: "API/Project/GetFollowedCurMonthList",
		/**
		 * @description 获取我的数据---商机--获取本月新增的商机的跟进
		 */
		GetProjectFollowUpCurMonth: "API/FollowUp/GetProjectFollowUpCurMonth",
		/**
		 * @description 获取我的数据---商机--获取本月签约过的商机列表
		 */
		GetSignedCurMonthList: "API/Project/GetSignedCurMonthList",
		/**
		 * @description 获取我的数据---商机--获取预期收入列表
		 */
		GetMyEstimatePriceList: "API/Project/GetMyEstimatePriceList",
		/**
		 * @description 获取我的数据---日报统计
		 */
		GetTongjiMyDiary: "API/Diary/GetTongjiMyDiary",
		/**
		 * @description 获取我的数据---日报统计（带权限）
		 */
		GetTongjiMyDiaryV2: "API/Diary/GetTongjiMyDiaryV2",
		/**
		 * @description 获取我的数据--日报--本月新增的日报列表
		 */
		GetAddedDiaryListCurMonth: "API/Diary/GetAddedDiaryListCurMonth",
		/**
		 * @description 获取我的数据--日报--本月新增的周报列表
		 */
		GetAddedWeeklyListCurMonth: "API/Diary/GetAddedWeeklyListCurMonth",
		/**
		 * @description 获取我的数据--日报--本月被评日报列表
		 */
		GetApprovedDiaryListCurMonth: "API/Diary/GetApprovedDiaryListCurMonth",
		/**
		 * @description 获取我的数据--销售订单--统计信息
		 */
		GetMyContractData: "API/SaleContract/GetMyContractData",
		/**
		 * @description 获取我的数据--销售订单--统计信息（带权限）
		 */
		GetMyContractDataV2: "API/SaleContract/GetMyContractDataV2",
		/**
		 * @description 获取我的数据--销售订单--本月新增列表
		 */
		GetAddedContractList: "API/SaleContract/GetAddedContractList",
		/**
		 * @description 获取我的数据--销售订单--本月新增回款列表
		 */
		GetAddedReceivableCurMonth: "API/Receivable/GetAddedReceivableCurMonth",
		/**
		 * @description 获取本月应收回款数据列表
		 */
		GetNeedReceivableCurMonth: "API/ReceivablePlan/GetNeedReceivableCurMonth",
		/**
		 * @description 获取逾期回款计划列表数据
		 */
		GetExpiredReceivableList: "API/ReceivablePlan/GetExpiredReceivableList",
		/**
		 * @description 获取我的数据--服务（任务）
		 */
		GetMyTaskData: "API/Task/GetMyTaskData",
		/**
		 * @description 获取我的数据--服务（任务，带权限）
		 */
		GetMyTaskDataV2: "API/Task/GetMyTaskDataV2",
		/**
		 * @description 获取本月新增任务
		 */
		GetAddedTaskCurMonth: "API/Task/GetAddedTaskCurMonth",
		/**
		 * @description 获取处理中的任务列表
		 */
		GetHandingTask: "API/Task/GetHandingTask",
		/**
		 * @description 获取已处理的任务列表
		 */
		GetHandledTask: "API/Task/GetHandledTask",
		/**
		 * @description 根据菜单类型和用户Id获取有权查看的人员列表
		 */
		GetHasRightUserForMenu: "API/User/GetHasRightUserForMenu",
		/**
		 * @description 获取我的数据=>客户
		 */
		GetMyDataCust: "API/Customer/GetNowMonthinfo",
		/**
		 * @description 获取我的数据=>客户
		 */
		GetMyDataCustV2: "API/Customer/GetNowMonthinfoV2",
		/**
		 * @description 获取当前人员权限下能获取的客户列表
		 */
		GetMyCustListOfPower: "API/Customer/GetMyCustListOfPower",
		/**
		 * @description 本月跟进客户列表
		 */
		GetNowMonthFollowCust: "API/Customer/GetNowMonthFollowCust",
		/**
		 * @description 本月签约客户列表
		 */
		GetNowMonthSignCust: "API/Customer/GetNowMonthSignCust",
		/**
		 * @description 本月跟进列表
		 */
		GetNowMonthFollowList: "API/Customer/GetNowMonthFollowList",
		/**
		 * @description 本月未及时跟进列表
		 */
		GetNowMonthNoFollowList: "API/Customer/GetNowMonthNoFollowList",
		/**
		 * @description 30天后计划跟进列表
		 */
		GetNowMonthWillFollowList: "API/Customer/GetNowMonthWillFollowList",
		/**
		 * @description 临时合同分页列表
		 */
		GetTempContractList: "API/TempContract/GetTempContractList",
		/**
		 * @description 临时合同详细信息
		 */
		GetTempContractDetails: "API/TempContract/GetDetails",
		/**
		 * @description 临时合同申请过的销售
		 */
		GetTempContractAppliedUsers: "API/TempContract/GetAppliedUsers",
		/**
		 * @description 获取合同类型
		 */
		GetContractType: "API/Constant/GetContractType",
		/**
		 * @description 临时合同新增修改保存
		 */
		SaveTempContract: "API/TempContract/SaveTempContract",
		/**
		 * @description 合同佣金列表
		 */
		GetContractCommissionList: "API/BondMoney/GetContractCommissionList",
		/**
		 * @description 添加佣金
		 */
		SaveCommission: "API/BondMoney/SaveCommission",
		/**
		 * @description 获取可申请佣金金额
		 */
		GetMoneyNumber: "API/BondMoney/GetMoneyNumber",
		/**
		 * @description 获取佣金申请数据
		 */
		GetCommissionInfo: "API/BondMoney/GetCommissionInfo",
		/**
		 * @description 获取结算方式
		 */
		GetPayMentType: "API/Constant/GetPayMentType",
		/**
		 * @GetProjectNumberAndMoney 获取统计商机数和金额
		 */
		GetProjectNumberAndMoney: "API/project/GetProjectNumberAndMoney",
		/**
		 * @GetBondMoneyList 获取保证金列表
		 */
		GetBondMoneyList: "API/BondMoney/GetBondMoneyList",
		/**
		 * @SaveBondMoney 保证金保存
		 */
		SaveBondMoney: "API/BondMoney/SaveBondMoney",
		/**
		 * @GetBondMoneyInfo 获取保证金实体数据
		 */
		GetBondMoneyInfo: "API/BondMoney/GetBondMoneyInfo",
		/**
		 * @GetPayType 获取保证金付款方式
		 */
		GetPayType: "API/BondMoney/GetPayType",
		/**
		 * @GetPayType 获取保证金统计数据
		 */
		GetforBondSum: "API/BondMoney/GetforBondSum",
		/**
		 * @GetBondType 获取保证金类型
		 */
		GetBondType: "API/BondMoney/GetBondType",
		/**
		 * @description 报价单分页列表
		 */
		GetQuotationList: "API/Quotation/QuotationList",
		/**
		 * @description 报价单所有销售
		 */
		GetQuotationAppliedUsers: "API/Quotation/GetAppliedUsers",
		/**
		 * @description 获取报价单详细信息
		 */
		GetQuotationDetails: "API/Quotation/GetDetails",
		/**
		 * @description 保存报价单
		 */
		SaveQuotation: "API/Quotation/SaveQuotation",
		/**
		 * @description 历史报价单列表
		 */
		HistoryQuotationList: "API/Quotation/HistoryQuotationList",
		/**
		 * @description 报价单模板
		 */
		GetQuotationTemplates: "API/Quotation/GetExportTemplates",
		/**
		 * @description 获取报价单预览文件url
		 */
		GetQuotationPreviewFileUrl: "API/Quotation/GetPreviewFileUrl",
		/**
		 * @description 根据Id单独给消息列表中点击详情获取下日报、周报、月报中的填报人、月报中的填报人id、和填写的开始时间
		 */
		GetThreeTableParams: "API/Diary/GetThreeTableParams",
		/**
		 * @description 获取供应商类别列表
		 */
		GetSupplierTypeList: "API/Supplier/GetSupplierTypeList",
		/**
		 * @description 新增保存供应商和联系人
		 */
		SaveSupplierInfo: "API/Supplier/SaveSupplierInfo",
		/**
		 * @description 获取供应商详细信息
		 */
		GetSupplierDetails: "API/Supplier/GetSupplierDetails",
		/**
		 * @description 获取供应商联系人列表
		 */
		GetSupplierLinkmanList: "API/Supplier/GetSupplierLinkmanList",
		/**
		 * @description 获取单个供应商联系人详细信息
		 */
		GetSupplierLinkman: "API/Supplier/GetSupplierLinkman",
		/**
		 * @description 新增/修改供应商联系人
		 */
		SaveSupplierLinkMan: "API/Supplier/SaveSupplierLinkMan",
		/**
		 * @description 修改供应商信息
		 */
		UpdateSupplierInfo: "API/Supplier/UpdateSupplierInfo",

		/**
		 * @description 费用报销列表
		 */
		GetApplicationList: "API/Application/GetApplicationList",
		/**
		 * @description 费用报销修改保存
		 */
		ApplicationSave: "API/Application/ApplicationSave",
		/**
		 * @description 获取单个费用报销实体数据
		 */
		GetApplicationModel: "API/Application/GetApplicationModel",
		/**
		 * @description 获取费用报销费用类型
		 */
		GetApplicationType: "API/Application/GetApplicationType",
		/**
		 * @description 获取部门列表
		 */
		GetHasRightDepartList: "API/User/GetHasRightDepartList",
		/**
		 * @description 获取公司列表
		 */
		GetHasRightCompanyList: "API/User/GetHasRightCompanyList",
		/**
		 * @description 获取公司和部门的数据作为公司部门的二级选择页面
		 */
		GetHasRightCompanyAndDeptList: "API/User/GetHasRightCompanyAndDeptList",
		/**
		 * @description 根据客户Id获取关联合同
		 */
		GetContractCust: "API/SaleContract/GetContractCust",
		/**
		 * @description 检查是否有模块菜单权限
		 */
		CheckMenuRight: "API/User/CheckMenuRight",
		/**
		 * @description 根据采购单id获取付款列表
		 */
		OrderPayList: "API/Order/OrderPayList",
		/**
		 * @description 根据采购单id获取付款详情
		 */
		OrderPayDetails: "API/Order/OrderPayDetails",
		/**
		 * @description 添加客户时查重
		 */
		RepeatCustomer: "API/Customer/RepeatCustomer",
		/**
		 * @description 是否可以添加档案产品
		 */
		IsProductAdd: "API/Product/IsProductAdd",
		/**
		 * @description 保存档案产品
		 */
		SaveProduct: "API/Product/SaveProduct",
		/**
		 * @description 获取产品类别、计量单位、物品性质
		 */
		GetNatureAll: "API/Product/GetNatureAll",
		/**
		 * @description 获取产品类型
		 */
		GetProductTypeJson: "API/Product/GetProductTypeJson",
		/**
		 * @description 获取用户邮箱列表
		 */
		UserEmailList: "API/User/UserEmailList",
		/**
		 * @description 获取借测列表
		 */
		BymeasuringList: "API/Bymeasuring/BymeasuringList",
		/**
		 * @description 保存借测申请
		 */
		SaveBymeasuring: "API/Bymeasuring/SaveBymeasuring",
		/**
		 * @description 当前登录人员是否有在借测中有借出产品未归还 0：无1：有
		 */
		GetOverdueOfUserId: "API/Bymeasuring/GetOverdueOfUserId",
		/**
		 * @description 查看借测详情
		 */
		GetBymeasuringDetail: "API/Bymeasuring/GetBymeasuringDetail",
		/**
		 * @description 延长借测申请
		 */
		SaveOverdueManget: "API/Bymeasuring/SaveOverdueManget",
		/**
		 * @description 获取产品列表操作按钮权限
		 */
		GetProductListRight: "API/Product/GetProductListRight",
		/**
		 * @description 检测产品是否重复
		 */
		IsProductRepeat: "API/Product/IsProductRepeat",
		/**
		 * @description 获取发送邮件按钮权限
		 */
		GetSendEmailRight: "API/Task/GetSendEmailRight",
		/**
		 * @description 发送任务邮件
		 */
		SendTaskEmail: "API/Task/SendTaskEmail",
		/**
		 *  @description 获取临时合同添加页面商机是否必填
		 */
		IsProjectInfo: "API/TempContract/GetIsProjectInfo",
		/**
		 * @description 获取任务处理记录详细
		 */
		GetDisposeDetail: "API/Task/GetDisposeDetail",
		/**
		 * @description 新增/编辑保存任务处理记录
		 */
		SaveDisposeContent: "API/Task/SaveDisposeContent",
		/**
		 * @description 获取任务标签
		 */
		GetTaskTags: "API/Task/GetTaskTags",
		/**
		 * @description 根据用户Id,集团Id,任务Id获取当前技术执行情况V2
		 */
		TaskGetMyTechInfoV2: "API/Task/GetMyTechInfoV2",
		/**
		 * @description 任务处理保存V2
		 */
		DisposeSaveV2: "API/Task/DisposeSaveV2",
		/**
		 * @description 任务开始处理V2
		 */
		TaskStartingDisposeV2: "API/Task/StartingDisposeV2",
		/**
		 * @description 主负责人结束任务V2
		 */
		TaskFinishTaskV2: "API/Task/FinishTaskV2",
		/**
		 * @description 服务记录分页
		 */
		GetTaskHisList: "API/Task/GetTaskHisList",
		/**
		 * @description 服务记录详情
		 */
		GetTaskHistoryDetail: "API/Task/GetTaskHistoryDetail",

		/**
		 * @description 计算单个日程有效时间
		 */
		CalValidHours: "API/Attend/CalValidHours",
		/**
		 * @description 获取流程上一步
		 */
		UpActivity: "API/WorkFlow/UpActivity",
		/**
		 * @description 驳回到上一步
		 */
		NoPassUp: "API/WorkFlow/NoPassUp",
		/**
		 * @description 获取我关注的跟进数据
		 */
		GetMyFocusFollowList: "API/FollowUp/GetMyFocusFollowList",
		/**
		 * @description 获取分享给我的跟进
		 */
		GetShareToMeFollowList: "API/FollowUp/GetShareToMeFollowList",
		/**
		 * @description 关注，取消关注跟进
		 */
		PostFollowFocus: "API/FollowUp/PostFollowFocus",
		/**
		 * @description 完成拜访计划
		 */
		CompleteVisit: "API/FollowUp/CompleteVisit",
		/**
		 * @description 获取未跟进拜访计划
		 */
		GetFollowPlanNo: "API/FollowUp/GetFollowPlanNo",
		/**
		 * @description 得到加班、年假历史记录
		 */
		GeScheduleHistoryList: "API/Schedule/GeScheduleHistoryList",
		/*
		 * @description 获取流程分类(左侧大类)
		 */
		GetNewFormdesigMenu: "API/NewFormdesig/GetNewFormdesigMenu",
		/*
		 * @description 获取流程类型下的可发起流程列表数据
		 */
		GetFormdesigContent: "API/NewFormdesig/GetFormdesigContent",
		/*
		 * @description 获取流程类型下的可发起流程列表数据
		 */
		GetFormdesigAssembly: "API/NewFormdesig/GetFormdesigAssembly",
		/*
		 * @description 发起自定义流程
		 */
		SaveCurrency: "API/NewFormdesig/SaveCurrency",
		/*
		 * @description 自定义表单对应流程实体
		 */
		GetFormdesigAssemblyflow: "API/NewFormdesig/GetFormdesigAssemblyflow",
		/*
		 * @description 自定义表单对应流转中的控件列表数据
		 */
		GetFormdesigAssemblyDetail: "API/NewFormdesig/GetFormdesigAssemblyDetail",
		/*
		 * @description 自定义表单中所有表单类型
		 */
		GetFormdesigTypeAll: "API/NewFormdesig/GetFormdesigTypeAll",
		/*
		 * @description 自定义表单已完成的所有类型数据
		 */
		GetMyFormdesigList: "API/NewFormdesig/GetMyFormdesigList",
		/*
		 * @description 获取表单所有类型
		 */
		GetAllTypeOf: "API/NewFormdesig/GetAllTypeOf",
		/*
		 * @description 获取个人发起的自定义表单数据
		 */
		GetMyFormdesigListAll: "API/NewFormdesig/GetMyFormdesigListAll",
		/*
		 * @description 获取权限下所有客户联系人
		 */
		GetLinkManListAll: "API/LinkMan/GetLinkManListAll",
		/*
		 * @description 获取指定日期下已分配的工程师
		 */
		GetPresonDistribution: "API/Task/GetPresonDistribution",
		/*
		 * @description 获取本周工程师任务列表数据
		 */
		GetEngineerList: "API/Task/GetEngineerList",
		/*
		 * @description 获取选中人员某天的任务分配数据
		 */
		GetOwnerWorkList: "API/Task/GetOwnerWorkList",
		/*
		 * @description 获取主管、销售、工程师三种身份,返回1为主管2位销售3位工程师
		 */
		GetOwnerPower: "API/Task/GetOwnerPower",
		/*
		 * @description 共享客户操作
		 */
		ShareCustomer: "API/Customer/ShareCustomer",
		/*
		 * @description 共享客户的权限
		 */
		GetCustomerSharePower: "API/Customer/GetCustomerSharePower",
		/**
		 * @description 根据客户类型获取客户对应列表菜单权限
		 */
		GetCustMenuPower: "API/Customer/GetCustMenuPower",
		/*
		 * @description 获取客户联系人下的归属销售
		 */
		CustHasRightUser: "API/Customer/CustHasRightUser",
		/*
		 * @description 获取业务扩展表数据
		 */
		GetExpandInfo: "API/NewFormdesig/GetExpandInfo",
		/**
		 * @description 保存采购订单
		 */
		SaveOrder: "API/Order/SaveOrder",
		/**
		 * @description 获取供应商二维码小程序url
		 */
		GetXcxImgesUrl: "API/Quotation/GetXcxImgesUrl",
		/**
		 * @description 获取采购订单类型
		 */
		GetOrderTypes: "API/Order/GetOrderTypes",
		/**
		 * @description 获取客户来源可选项
		 */
		GetCustSource: "API/Customer/GetCustSource",
		/**
		 * @description 获取客户扩展表信息
		 */
		GetCustExtendInfo: "API/Customer/GetCustExtendInfo",
		/**
		 * @description 任务指派保存
		 */
		AddDistributeSave: "API/Task/AddDistributeSave",
		/**
		 * @description 获取任务性质选项
		 */
		GetTaskCross: "API/Task/GetTaskCross",
		/**
		 * @description 服务新增
		 */
		AddService: "API/Task/AddService",
		/**
		 * @description 获取菜单权限
		 */
		GetMenuOperationRight: "/API/User/GetMenuOperationRight",
		/**
		 * @description 获取客户销售情况统计
		 */
		GetCustStatis: "API/Customer/GetCustStatis",
		/**
		 * @description 获取商机状态变更记录
		 */
		GetProjectStateTimeline: "/API/Project/GetProjectStateTimeline",
		/**
		 * @description 单独修改商机状态
		 */
		UpdateProjectState: "/API/Project/UpdateProjectState",
		/**
		 * @description 获取销售线索列表
		 */
		GetCluesList: "/API/Clues/GetCluesList",
		/**
		 * @description 新增、修改保存销售线索
		 */
		SaveClues: "/API/Clues/SaveClues",
		/**
		 * @description 获取销售线索自定义类型
		 */
		GetCluesTypes: "API/UConstant/GetCluesTypes",
		/**
		 * @description 销售线索客户信息、联系人信息查重
		 */
		CheckRepeatCustInfoV2: "/API/Customer/CheckRepeatCustInfoV2",
		/**
		 * @description 销售线索新增时针对客户信息、联系人信息查重判断
		 */
		ExistRepeatCustInfoV2: "/API/Customer/ExistRepeatCustInfoV2",
		/**
		 * @description 获取销售线索详细信息
		 */
		GetCluesDetail: "/API/Clues/GetCluesDetail",
		/**
		 * @description 删除线索
		 */
		DelClues: "/API/Clues/DelClues",
		/**
		 * @description 转移销售线索保存
		 */
		TransferClues: "/API/Clues/TransferClues",
		/**
		 * @description 保存销售订单(合同)
		 */
		SaveContract: "/API/SaleContract/SaveContract",
		/**
		 * @description 得到回款方式
		 */
		PayWayList: "API/Constant/PayWayList",
		/**
		 * @description 获取合同性质
		 */
		GetContractNature: "API/Constant/GetContractNature",
		/**
		 * @description 获取公海列表
		 */
		HighSeaList: "API/Customer/HighSeaList",
		/**
		 * @description 获取是否开启业务自定义表单的扩展字段
		 */
		IsOpenExpand: "API/NewFormdesig/IsOpenExpand",
		/**
		 * @description 获取报备类型
		 */
		GetRecordType: "API/Record/GetRecordType",
		/**
		 * @description 获取集团小数位设置
		 */
		GetDigitSet: "API/SaleContract/GetDigitSet",
		/**
		 * @description 获取是否显示商机六要素
		 */
		GetIsBusinesselements: "API/Project/GetIsBusinesselements",
		/**
		 * @description 是否开启服务记录分享
		 */
		IsRecordShare: "API/Task/IsRecordShare",
		/**
		 * @description 根据表名获取表的实体列
		 */
		TableNameToModelName: "API/Constant/TableNameToModelName",
		/**
		 * @description 修改排期
		 */
		EditTasksave: "API/Task/EditTasksave",
		/**
		 * @description 根据登录账号获取集团基础设置信息
		 */
		GetFirmSetting: "API/PwdReset/GetFirmSetting",
		/**
		 * @description 客户转出保存
		 */
		TurnOutSave: "API/Customer/TurnOutSave",
		/**
		 * @description 销售商机转出
		 */
		ProjectTransferSave: "API/Project/ProjectTransferSave",
		/**
		 * @description 销售商机共享
		 */
		ShareProjectSave: "API/Project/ShareProjectSave",
		/**
		 * @description 删除任务
		 */
		DeleteTask: "API/Task/DeleteTask",
		/**
		 * @description 零售分页列表数据获取
		 */
		GetRetailList: "API/Retail/GetRetailList",
		/**
		 * @description 获取所有零售单的销售
		 */
		GetRetailAppliedUsers: "API/Retail/GetRetailAppliedUsers",
		/**
		 * @description 获取库存产品
		 */
		GetProductStock: "API/Retail/GetProductStock",
		/**
		 * @description 获取有效的仓库选项
		 */
		GetValidWarehouses: "API/Retail/GetValidWarehouses",
		/**
		 * @description 零售开单保存
		 */
		AddRetailSave: "API/Retail/AddRetailSave",
		/**
		 * @description 获取结算账户
		 */
		GetBankAccount: "API/Retail/GetBankAccount",
		/**
		 * @description 获取零售单详细信息
		 */
		GetRetailDetail: "API/Retail/GetRetailDetail",
		/**
		 * @description 获取收款方式
		 */
		GetReceivableTypes: "API/Retail/GetReceivableTypes",
		/**
		 * @description 根据库存Id获取库存信息
		 */
		GetRetailStockInfo: "API/Retail/GetRetailStockInfo",
		/**
		 * @description 获取默认的零售客户
		 */
		GetDefaultRetailCust: "API/Retail/GetDefaultRetailCust",
		/**
		 * @description 根据当前登录人员权限获取可操作的仓库
		 */
		GetOwnWarehouse: "API/Warehouse/GetOwnWarehouse",
		/**
		 * @description 解析是否存在对应API接口
		 */
		ExistApi: "Api/Exist/ExistApi",
		/**
		 * @description 更新用户信息(只允许更新自己的)
		 */
		UpdateUserInfo: "API/User/UpdateUserInfo",
		/**
		 * @description 获取单个人员信息
		 */
		GetUserInfo: "API/User/GetUserInfo",
		/**
		 * @description 获取单个人员信息
		 */
		GetListByProject: "API/FollowUp/GetListByProject",
		/**
		 * @description 获取全部商机状态
		 */
		ProjectStateListAll: "API/Project/ProjectStateListAll",
		/**
		 * @description 按多层级获取公司>部门数据
		 */
		GetHasRightCompanyAndDeptListAll: "API/User/GetHasRightCompanyAndDeptListAll",
		/**
		 * @description 收款方人员选择列表数据获取
		 */
		GetLayerUserList: "API/User/GetLayerUserList",
		/**
		 * @description 从工商接口获取数据(默认读取数据中已存在的能匹配上名称的公司数据,无则直接从工商接口中拉取数据)
		 */
		BusinessFullQuery: "API/Customer/BusinessFullQuery",
		/**
		 * @description 读取数据中已存在的能匹配上名称的公司数据(companydataId为查询单个数据详情,custName为模糊查询列表数据)
		 */
		LocalBusinessQuery: "API/Customer/LocalBusinessQuery",
		/**
		 * @description 是否开启工商业务查询 0为否1为已开启
		 */
		isEnableBusinessQuery: "API/Customer/isEnableBusinessQuery",
		/**
		 * @description 费用申请列表用于选择组件
		 */
		GetSelectApplicationList: "API/Application/GetSelectApplicationList",
		/**
		 * @description 借款列表用于选择组件
		 */
		GetSelectBorrowList: "API/Application/GetSelectBorrowList",
		/**
		 * @description 获取借测类型
		 */
		GetByType: "API/Constant/GetByType",
		/**
		 * @description 根据app端的区域js的版本号和服务器端的版本号比对看是否需要下载最新的区域版本替换app端的js
		 */
		GetAreaJsVersion: "API/Constant/GetAreaJsVersion",
		/**
		 * @description 按基础设置中的客户手机号查重条件判断是否有异常
		 */
		CheckPhoneRepeat: "API/Customer/CheckPhoneRepeat",
		/**
		 * @description 按基础设置中的供应商手机号查重条件判断是否有异常
		 */
		CheckPhoneRepeat_Supplier: "API/Supplier/CheckPhoneRepeat_Supplier"
	},
  /**
  * @description  每页显示个数
  */
	PAGE_SIZE: {
    /**
    * @description 每页显示8个
    */
		size8: 8,
    /**
    * @description 每页显示20个
    */
		size20: 20
	},
  /**
  * @description 调用API后返回的状态信息
  * @param {String} 返回状态
  */
	API_ERRORTEXT(code) {
		var vValue = '';
		switch (code) {
			case 200:
				vValue = '操作成功';
				break;
			case 400:
				vValue = '操作失败';
				break;
			case 401:
				vValue = '用户名、密码错误';
				break;
			case 402:
				vValue = '该账号已在其他设备登录';
				break;
			case 403:
				vValue = '无权限查看';
				break;
			case 404:
				vValue = '令牌过期,请重新登录';
				break;
			case 405:
				vValue = '参数错误';
				break;
			case 406:
				vValue = '时间不对';
				break;
			case 407:
				vValue = '访问超时';
				break;
			case 408:
				vValue = '该类型客户数量已饱和';
				break;
			case 409:
				vValue = '该客户已存在';
				break;
			case 410:
				vValue = '用户请求的资源被删除';
				break;
			case 411:
				vValue = '该信息已被处理过';
				break;
			case 500:
				vValue = '服务器出错';
				break;
			case 601:
				vValue = '不合法的文件大小';
				break;
			case 602:
				vValue = '文件类型不对';
				break;
			case 701:
				vValue = '流程设置存在问题';
				break;
			case 702:
				vValue = '需要选择审核人';
				break;
			case 703:
				vValue = '操作失败，该信息已审批';
				break;
			case 704:
				vValue = '打卡不在有效范围内';
				break;
			case 705:
				vValue = '亲, 上班迟到了';
				break;
			case 706:
				vValue = '亲, 现在下班算早退哦';
				break;
			case 707:
				vValue = '该手机号已注册';
				break;
			case 708:
				vValue = '该账号不存在';
				break;
			case 709:
				vValue = '该企业已注册';
				break;
			case 710:
				vValue = '验证码错误或已过期';
				break;
			case 711:
				vValue = '该账号已停用';
				break;
			case 712:
				vValue = '刚获取过验证码，请1分钟后重试';
				break;
			case 713:
				vValue = '已达获取次数上限，请稍后重试';
				break;
			case 714:
				vValue = '该任务不存在';
				break;
			case 715:
				vValue = '该任务已处理';
				break;
			case 716:
				vValue = '该任务未分配';
				break;
			case 717:
				vValue = '该任务已驳回';
				break;
		}
		return vValue;
	},
  /**
 * 定位失败提示
 */
	LOCATION_ERR: "请检查位置权限或GPS是否开启！",
	/**
	 * @description 成功的状态
	 */
	API_SUCCESS: 200,
	/**
	 * @description 失败的状态
	 */
	API_ERROR: 400,
	/**
	 * @description 没有权限
	 */
	API_NORIGHT: 403,
	/**
	 * @description 流程设置存在问题
	 */
	API_STATUS701: 701,
	/**
	 * @description 需要选择审核人
	 */
	API_STATUS702: 702,
	/**
	 * @description 操作失败，该信息已审批
	 */
	API_STATUS703: 703,
	/**
	 * @description 打卡不在有效范围内
	 */
	API_STATUS704: 704,
	/**
	 * @description 该手机号已注册
	 */
	API_STATUS707: 707,
	/**
	 * @description 该账号不存在
	 */
	API_STATUS708: 708,
	AjaxReady(that, apiurl, methodof, params, func, fail, typesettotal) {
		if (this.needUpdateToken()) {
			var thatof = this;
			//token过期或丢失开始重新获取token
			thatof.updateToken(function () {
				thatof.AjaxLoad(that, apiurl, methodof, params, func, fail, typesettotal);
			});
		}
		else {
			//token无异常直接运行ajax请求
			this.AjaxLoad(that, apiurl, methodof, params, func, fail, typesettotal);
		}
	},
	AjaxLoad(that, apiurl, methodof, params, func, fail, typesettotal) {
		if (methodof == "POST" && typesettotal) {
			dd.showLoading({
				content: '操作数据中...'
			});
		}
		var thisindex = this;
		// thisindex.userinfo['Content-Type']='application/json; charset=utf-8; charset=utf-8; charset=utf-8; charset=utf-8; charset=utf-8';
		dd.httpRequest({
			url: thisindex.PUBLIC_BASE_URL + "/" + apiurl,
			method: methodof,
			headers: thisindex.userinfo,
			async: false,
			data: params,
			dataType: 'JSON',
			success: function (res) {
				if (methodof == "POST" && typesettotal) {
					dd.hideLoading();
					thisindex.showToast("success", "操作成功");
				}
				if (res.data.apiStatus == thisindex.API_SUCCESS) {
					if (typeof (func) == "function") {
						func(res.data);
					}
				}
				else if (res.data.apiStatus == '402' || res.data.apiStatus == '404') {
					console.log('令牌过期')
					dd.getAuthCode({
						success: (res) => {
							thisindex.DingLogin(res.authCode);
						},
						fail: (err) => {
							dd.alert({ content: JSON.stringify(err) })
						}
					});
				}
				else {
					if (typeof (fail) == "function") {
						fail(res.data.apiStatus);
					};
				}
				// console.log(typeof(res.data));
				// console.log('Json转换'+JSON.parse(res.data));
				// console.log('请求接口::::' +'接口名称:::'+apiurl+':::请求参数'+ JSON.stringify(params))
				// console.log(':::返回值参数'+ JSON.stringify(res))

				// var result = JSON.parse(res.data);
				// console.log(result);
				// // 	console.log(':::返回值参数'+ JSON.stringify(res.data))
				// if (methodof == "POST" && typesettotal) {
				// 	dd.hideLoading();
				// 	thisindex.showToast("success", "操作成功");
				// }
				// if (result.apiStatus == thisindex.API_SUCCESS) {
				// 	if (typeof (func) == "function") {
				// 		func(result);
				// 	}
				// }
				// else if (result.apiStatus == '402' || result.apiStatus == '404') {
				// 	console.log('令牌过期')
				// 	dd.getAuthCode({
				// 		success: (res) => {
				// 			thisindex.DingLogin(res.authCode);
				// 		},
				// 		fail: (err) => {
				// 			dd.alert({ content: JSON.stringify(err) })
				// 		}
				// 	});
				// }
				// else {
				// 	if (typeof (fail) == "function") {
				// 		fail(res.data.apiStatus);
				// 	};
				// }
			},
			fail: function (e) {
				// console.log('请求头信息:::'+JSON.stringify(thisindex.userinfo))
				console.log('error:::'+'方法名称:::'+apiurl+'::::::' + JSON.stringify(e))
				// debugger
				// console.log(JSON.stringify(e));
			}
		});
	},
	updateToken(func) {
		// debugger
		let res = dd.getStorageSync({ key: "userInfo" });
		if (this.vnull(res.data)) {
			var timestamp = res.data.timestamp || '';
			console.log('updateToken:::' + timestamp.toString())
			if (timestamp != null && timestamp.toString().length > 0) {
				var s_date = new Date(parseFloat(timestamp));
				if (new Date(parseFloat(s_date.setHours(s_date.getHours() + 2))) < new Date()) {
					this.userinfo.timestamp = new Date().getTime();
					console.log('updateToken DingLogin1');
					dd.getAuthCode({
						success: (res) => {
							this.DingLogin(res.authCode);
						},
						fail: (err) => {
							console.log(err)
							dd.alert({ content: JSON.stringify(err) })
						}
					});
				}
			}
			else {
				console.log('updateToken DingLogin2');
				//丢失时间戳重新登录
				dd.getAuthCode({
					success: (res) => {
						this.DingLogin(res.authCode);
					},
					fail: (err) => {
						dd.alert({ content: JSON.stringify(err) })
					}
				});
			}
		} else {
			console.log('updateToken DingLogin3');
			dd.getAuthCode({
				success: (res) => {
					this.DingLogin(res.authCode);
				},
				fail: (err) => {
					dd.alert({ content: JSON.stringify(err) })
				}
			});
		}

	},
	needUpdateToken() {
		let res = dd.getStorageSync({ key: "userInfo" });
		var needUpToken = false;
		if (this.vnull(res.data)) {
			var vToken = res.data.token || '';
			if (vToken == '') {
				needUpToken = true;
			}
			else {
				var timestamp = res.data.timestamp || '';
				// console.log('needUpdateToken:::' + timestamp.toString())
				if (timestamp.toString().length > 0) {
					var s_date = new Date(parseFloat(timestamp));
					if (new Date(parseFloat(s_date.setHours(s_date.getHours() + 2))) < new Date()) {// 如果token的时间戳+2小时小于当前时间的话那么久需要重新获取token了
						needUpToken = true;
					}
				}
				else {
					needUpToken = true;
				}
			}
		} else {
			needUpToken = true;
		}
		return needUpToken;
	},
	Login(func, successfunc, failfunc) {
		// var that = this;
		// that.LoginData.timestamp = (new Date().getTime()).toString();
		// dd.httpRequest({
		// 	url: this.PUBLIC_BASE_URL + "/" + this.APIURL.IsLogin,
		// 	method: 'POST',
		// 	timeout: 10000,
		// 	data: that.LoginData,
		// 	dataType: 'json',
		// 	async: false,
		// 	success: function (res) {
		// 		if (res.data.apiStatus == that.API_SUCCESS) {
		// 			var userData = res.data.data;
		// 			debugger
		// 			that.setuserinfo(userData, res.data.apiToken);
		// 			//同时创建缓存
		// 			dd.setStorage({
		// 				key: 'userInfo',
		// 				data: {
		// 					uid: userData.id,
		// 					fullName: userData.fullName,
		// 					phoneNum: userData.phoneNum,
		// 					firmId: userData.firmId,
		// 					token: res.data.apiToken,
		// 					companyId: userData.companyId,
		// 					deptId: userData.deptId,
		// 					timestamp: new Date().getTime(),
		// 				},
		// 				success: function () {
		// 				}
		// 			});
		// 			//获取所有人员头像的列表
		// 			that.getFirmUsers(userData.id, userData.firmId);
		// 			if (typeof (func) == "function") {
		// 				func(userData);
		// 			}
		// 			if (typeof (successfunc) == "function") {
		// 				successfunc();
		// 			}
		// 		}
		// 		else {
		// 			if (typeof (failfunc) == "function") {
		// 				failfunc(res.data.msg);
		// 			}
		// 		}
		// 	},
		// 	fail: function (res) {
		// 		//验证过期改重新授权
		// 		dd.alert({ content: '登录异常,请稍候重试' });
		// 		if (typeof (failfunc) == "fucntion") {
		// 			failfunc();
		// 		}
		// 	}
		// });
	},
	GetUserInfo: function () {
		dd.alert('getUserInfo')
		var that = this;
		dd.httpRequest({
			url: that.PUBLIC_BASE_URL + "/" + that.APIURL.GetUserDetailInfo,
			method: 'Get',
			data: {
				userId: that.userinfo.uid,
				firmId: that.userinfo.firmId
			},
			headers: that.userinfo,
			dataType: 'json',
			async: false,
			success: function (res) {
				// debugger
				if (res.data.apiStatus == that.API_SUCCESS) {

				} else {
					dd.reLaunch({
						url: '/pages/index/Login/Login'
					})
				}
			},
			fail: function (res) {
				//验证过期改重新授权
				dd.reLaunch({
					url: '/pages/index/Login/Login'
				})
			}
		});
	},
	//钉钉免登陆身份验证
	DingLogin: function (authCode) {
		var that = this;
		dd.httpRequest({
			url: this.PUBLIC_BASE_URL + "/" + "API/DingTalkConnect/GetMyUserInfo",
			method: 'GET',
			data: { 'authCode': authCode, 'platform': 'DingTalk' },
			dataType: 'json',
			async: false,
			success: function (res) {
				console.log('请求状态:::'+res.data.apiStatus)
				if (res.status == 200) {
					if(res.data.apiStatus==200){
						that.showToast("success", "登录成功", 50000);
					dd.reLaunch({ url: '/pages/index/index' })
					var userData = res.data.data.userInfo;
					if(that.vnull(res.data.data.firmInfo)){
						userData.firmName = res.data.data.firmInfo.firmName;
					}

					that.setuserinfo(userData, res.data.data.token);
					//同时创建缓存
					dd.setStorage({
						key: 'userInfo',
						data: {
							uid: userData.id,
							fullName: userData.fullName,
							phoneNum: userData.phoneNum,
							firmId: userData.firmId,
							firmName: that.vnull(res.data.data.firmInfo)?res.data.data.firmInfo.firmName:'',
							token: res.data.data.token,
							companyId: userData.companyId,
							deptId: userData.deptId,
							timestamp: new Date().getTime(),
							// 'Content-Type':'application/json; charset=utf-8'
						},
						success: function () {
							// dd.alert({content: '写入成功'});
						}
					});
					//获取所有人员头像的列表
					that.getFirmUsers(userData.id, userData.firmId);
					that.getsysinfo();
					if (that.userinfo.token == null) {
						dd.getStorage({
							key: 'userInfo',
							async: false,
							success: function (res) {
								if (that.vnull(res.data)) {
									that.userinfo = {
										uid: res.data.uid,
										uuid: "DingTalk",
										firmId: res.data.firmId,
										firmName: res.data.firmName,
										token: res.data.token,
										phoneNum: res.data.phoneNum,
										timestamp: res.data.timestamp,
									};
								}
								else {
									console.log("获取所有人员头像的列表:::"+JSON.stringify(res))
								}
							},
							fail: function (e) {
							console.log("获取所有人员头像的列表:::"+JSON.stringify(res))
							}
						})
					} 
					}else{
						that.showToast("fail", "登录失败");
					}
					
				}
			},
			fail: function (res) {
				console.log('DingLogin:::'+JSON.stringify(res))
				that.showToast("fail", "登录失败");
				// console.log(JSON.stringify(res))
			}
		});
	},
	//钉钉免登陆身份验证
	// DingLogin: function (authCode) {
	// 	var that = this;
	// 	dd.httpRequest({
	// 		url: this.PUBLIC_BASE_URL + "/" + "DingDing/DingDingUserInfo.ashx",
	// 		method: 'POST',
	// 		data: { 'authCode': authCode, 'corpId': dd.corpId, 'accessToken': dd.getStorageSync({ key: "accessToken" }).data },
	// 		dataType: 'json',
	// 		async: false,
	// 		success: function (res) {
	// 			if (res.status == 200) {
	// 				if (that.vnull(res.data.errormsg)) {
	// 					dd.alert(res.data.errormsg);
	// 				} else {
	// 					dd.reLaunch({
	// 						url: '/pages/index/Login/Login'
	// 					})
	// 				}
	// 			}

	// 		},
	// 		fail: function (res) {
	// 			console.log(JSON.stringify(res))
	// 		}
	// 	});
	// },
	//获取所有人员的头像列表
	getFirmUsers: function (userId, firmId) {
		var that = this;
		delete that.userinfo.firmName
		dd.httpRequest({
			url: that.PUBLIC_BASE_URL + "/" + that.APIURL.GetFirmUsersV2,
			method: 'Get',
			headers: that.userinfo,
			data: {
				userId: userId,
				firmId: firmId
			},
			dataType: 'json',
			success: function (res) {
				if (res.data.apiStatus == that.API_SUCCESS) {
					var iconlist = res.data.data;
					//同时创建缓存
					dd.setStorage({
						key: 'iconlist',
						data: iconlist,
						success: function () {
							// dd.alert({content: '写入成功'});
						}
					});
				}
			},
			fail: function (res) {
				//验证过期改重新授权
				// dd.alert({content: JSON.stringify(res)});
			}
		});
	},
	//  phoneNum: "15168373559",
	//     pwd: "123456789",
	//     uuid: '123',
	LoginData: {
		phoneNum: "",
		pwd: "",
		uuid: 'DingTalk',
		timestamp: (new Date().getTime()).toString()
	},
  /**
    *@description 对象转var str="customer.custName=11&linkman.fullName=333";
   */
	JsonToData(jsondata) {
		console.log('JsonToData:::' + jsondata)
		var result = "";
		for (var key in jsondata) {
			if (typeof (jsondata[key]) == "object") {
				result += this.childrenjson(jsondata[key], key);
			}
			else {
				result += key + "=" + jsondata[key] + "&"
			}
		}
		return result.substring(0, result.length - 1);
	},
	//json子集
	childrenjson(objectjson, parentkey) {
		var result = "";
		for (var key in objectjson) {
			result += parentkey + "." + key + "=" + objectjson[key] + "&";
		}
		return result
	},
	//给userinfo赋值
	setuserinfo(userData, token) {
		this.userinfo = {
			uid: userData.id,
			uuid: "DingTalk",
			firmId: userData.firmId,
			firmName: userData.firmName,
			token: token,
			phoneNum: userData.phoneNum,
			timestamp: "'" + new Date().getTime() + "'",
			// 'Content-Type':'application/json; charset=utf-8'
		}
	},
	getusericon: function (userid) {
		let iconlist = dd.getStorageSync({ key: "iconlist" });
		var icon = '';
		// console.log('getusericon:::' + iconlist.data)
		if (this.vnull(iconlist.data)) {
			for (var i = 0; i < iconlist.data.length; i++) {
				if (userid == iconlist.data[i].id) {
					if (iconlist.data[i].icon.indexOf("http://") > -1 || iconlist.data[i].icon.indexOf("https://") > -1) {
						icon = iconlist.data[i].icon;
					}
					else {
						icon = this.PUBLIC_BASE_IMG_URL + iconlist.data[i].icon;
					}
					break;
				}
			}
		}

		return icon;
	},
	getuserinfo: function () {
		let res = dd.getStorageSync({ key: "userInfo" });
		if (!this.vnull(res.data)) {
			// 重新调用免登接口
			// this.Login(function (userdata) {
			// 	res = userdata;
			// });
			return res;
		}
		return res.data;
	},
	getstatetext: function (state) {
		let Statelist = dd.getStorageSync({ key: "ProjectStateCache" });
		var statetext = '';
		console.log('getstatetext:::' + Statelist.data)
		for (var i = 0; i < Statelist.data.length; i++) {
			if (state == Statelist.data[i].code) {
				statetext = Statelist.data[i].title;
				break;
			}
		}
		return statetext;
	},
	userinfo: {},
	/**
	*@description 缓存所有的跟进方式
	*/
	allFollowUpWay: [{
		id: '010001',
		title: '电话',
		icon: '/followupway_phone.png',
		index: 0
	}, {
		id: '010002',
		title: 'QQ/微信',
		icon: '/followupway_qq.png',
		index: 1
	}, {
		id: '010003',
		title: '上门拜访',
		icon: '/followupway_visit.png',
		index: 2
	}, {
		id: '010004',
		title: '邮件',
		icon: '/followupway_email.png',
		index: 3
	}, {
		id: '010005',
		title: '技术处理',
		icon: '/followupway_tech.png',
		index: 4
	}, {
		id: '010006',
		title: '其他',
		icon: '/followupway_other.png',
		index: 5
	}],
	getFollowupWay(wayId) {
		var way = this.allFollowUpWay[5];
		console.log('getFollowupWay:::' + this.allFollowUpWay)
		for (var i = 0; i < this.allFollowUpWay.length; i++) {
			if (this.allFollowUpWay[i].id == wayId) {
				way = this.allFollowUpWay[i];
				break;
			}
		}
		return way;
	},
	getprojectType(typeid) {
		var text = '';
		var data = dd.getStorageSync({ key: "projectTypeCache" });
		console.log('getprojectType:::' + data.data)
		for (var i = 0; i < data.data.length; i++) {
			if (data.data[i].code == typeid) {
				text = data.data[i].title;
				break;
			}
		}
		return text;
	},
  /**
  *@description 跟进来源对象类型
  */
	followObjType: {
    /**
    * @description 客户跟进 
    */
		cust: 1,
    /**
    * @description 项目跟进
    */
		project: 2,
    /**
    * @description 技术处理
    */
		tech: 3,
    /**
    * @description 服务处理
    */
		service: 4,

	},/**
  * @description 对象类型
  * @param {String} 返回状态
  */
	objType: {
    /**
    * @description 跟进
    */
		followup: 1,
    /**
    * @description 报备
    */
		record: 2,
    /**
    * @description 任务
    */
		task: 3,
    /**
    * @description 服务
    */
		service: 4,
    /**
    * @description 日报
    */
		diary: 5,
    /**
    * @description 周报
    */
		weekly: 6,
    /**
    * @description 月报
    */
		monthly: 8

	},
	getWwwBase(that) {
		// debugger;
		// return "/images";
	},
	getTopValueBelowCust(curpage, firsttop, heightline, pagesize, index) {
		var top = firsttop + heightline * (pagesize * (curpage - 1)) + index * heightline;
		return top;
	},
  /**
  *@description 获取当前时间
   */
	getCurDate: function () {
		var now = new Date();
		var year = now.getFullYear(); //年
		var month = now.getMonth() + 1; //月
		var day = now.getDate(); //日
		var hh = now.getHours(); //时
		var mm = now.getMinutes(); //分
		var ss = now.getSeconds(); //秒
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";

		if (day < 10)
			clock += "0";
		clock += day + " ";
		if (hh < 10)
			clock += "0";
		clock += hh + ":";
		if (mm < 10) clock += '0';
		clock += mm + ":";
		if (ss < 10) clock += '0';
		clock += ss;
		return (clock);
	},
	repaceallbracket(replaceValue) {
		if (replaceValue != null) {
			replaceValue = replaceValue.replace(/</g, "&lt;");
			replaceValue = replaceValue.replace(/>/g, "&gt;");
			return replaceValue;
		} else {
			return '';
		}
	},
	telto(phone) {
		dd.showCallMenu({
			phoneNumber: phone, // 期望拨打的电话号码
			code: '+86', // 国家代号，中国是+86
			showDingCall: true, // 是否显示钉钉电话
			success: function (res) {
			},
			fail: function (err) {
			}
		});
	},
  /**
   *@description 给集合更换input值
   */
	setinputtodata: function (key, thatobject, name, value) {
		if (typeof (thatobject[key]) != "object") {
			if (key == name) {
				thatobject[key] = value;
			}
		}
		else {
			for (var object in thatobject[key]) {
				this.setinputtodata(object, thatobject[key], name, value);
			}
		}
	},
  /**
   * @description 拉取时间选择器
   */
	datepicker: function (curDatestring, that, func) {
		console.log('datepicker:::' + curDatestring)
		var curdate = curDatestring.length > 0 ? curDatestring : this.timeobjecttostring(new Date());
		dd.datePicker({
			format: 'yyyy-MM-dd',
			currentDate: curdate,
			startDate: '1995-01-01',
			endDate: '2100-12-31',
			success: (res) => {
				if (typeof (func) == "function") {
					func(res.date);
				}
			}
		});
	},
	/**
	 * 判断是否为空
	 * @param {*} object 
	 * @param {*} minlength 
	 * @param {*} maxlength 
	 * @param {*} type 
	 */
	vnull: function (object, minlength, maxlength, type) {
		if (object != null && object != '' && object != 'undefind') {
			return true;
		}
		return false;
	},
	valueVerification: function (value, minlength, maxlength, type, error) {
		var flag = true;
		if (this.vnull(value)) {
			//验证长度在验证范围内
			console.log('valueVerification:::' + value)
			if (minlength != null && maxlength != null) {
				if (value.length < minlength || value.length > maxlength) {
					flag = false;
				}
			}
			else if (minlength != null) {
				if (value.length < minlength) {
					flag = false;
				}
			}
			else if (maxlength != null) {
				if (value.length > maxlength) {
					flag = false;
				}
			}
			if (type != null) {
				switch (type) {
					case "tel":
						if (!value.match(/^1([3456789])\d{9}$/)) {
							flag = false;
						}
						break;
					case "eamil":
						var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
						if (!reg.test(Value)) {
							flag = false;
						}
						break;
					case "int":
						if (parseFloat(value) <= 0) {
							flag = false;
						}
						break;
				}
			}
		}
		else {
			flag = false;
		}
		if (!flag) {
			this.showToast("fail", error);
		}
		return flag;
	},
	fileUpload: function (count, pagesthis, fromType) {
		var that = this;
		var images = pagesthis.data.images.data;
		var maxcount = count - images.length;
		if (maxcount > 0) {
			var headers = that.userinfo;
			headers.timestamp = (new Date().getTime()).toString();
			var param = { "fromType": fromType };
			dd.chooseImage({
				sourceType: ['camera', 'album'],
				count: maxcount,
				success: res => {
					if (res.apFilePaths.length > 0 || res.filePaths.length > 0) {
						var imageslength = (res.apFilePaths.length > 0 ? res.apFilePaths.length : res.filePaths.length);
						for (var i = 0; i < imageslength; i++) {
							const path = (res.apFilePaths.length > 0 ? res.apFilePaths[i] : res.filePaths[i]);
							dd.uploadFile({
								url: that.PUBLIC_BASE_URL + that.fileUploadServer,
								fileType: 'image',
								fileName: 'file',
								filePath: path,
								headers: headers,
								formData: param,
								success: res => {
									var result = JSON.parse(res.data);
									if (result.result == "fail") {
										dd.alert({ title: `上传失败` });
									}
									else {
										var filelist = JSON.parse(result.datalist);

										images.push({ url: filelist[0].url })
										pagesthis.setData({
											"images.data": images
										});
									}
								},
								fail: function (res) {
									dd.alert({ title: `上传失败：${JSON.stringify(res)}` });
								},
							});
						}
					}
					else {
						dd.alert({ content: "未选择图片" })
					}
				},
			});
		}
		else {
			dd.alert({ content: "最多选择" + count + "张图片" });
		}
	},
	showimage: function (selecturl, images) {
		console.log('showimage:::' + images)
		if (images.length > 0) {
			var imagesurl = [];
			var index = 0;
			for (var i = 0; i < images.length; i++) {
				if (images[i].url == selecturl) {
					index = i;
				}
				imagesurl.push(images[i].url);
			}
			dd.previewImage({
				current: index,
				urls: imagesurl,
			});
		}
	},
	delimages: function (selecturl, images, pagethis) {
		console.log('delimages:::' + images)
		dd.confirm({
			content: '是否删除该产品?',
			confirmButtonText: '删除',
			cancelButtonText: '取消',
			success: (result) => {
				if (result.confirm) {
					if (images.length > 0) {
						var newimages = [];
						for (var i = 0; i < images.length; i++) {
							if (images[i].url != selecturl) {
								newimages.push({
									url: images[i].url
								})
							}
						}
						pagethis.setData({
							"images.data": newimages
						});
					}
				}
			}
		});
	},
	getimgaestring(images) {
		console.log('getimgaestring:::' + images)
		var imagestring = "";
		for (var i = 0; i < images.length; i++) {
			if (images.length - 1 == i) {
				imagestring += images[i].url;
			}
			else {
				imagestring += images[i].url + "$";
			}
		}
		return imagestring;
	},
	/**
	 * 获取钉钉系统信息
	 */
	getsysinfo: function () {
		var that = this;
		that.sysinfo = dd.getSystemInfoSync();
	},
	sysinfo: {},
	timeobjecttostring: function (time, foromt) {
		var YYYY = time.getFullYear();
		var MM = time.getMonth() + 1;
		var dd = time.getDate();
		var hh = time.getHours();
		var mm = time.getMinutes();
		var ss = time.getSeconds();
		if (!this.vnull(foromt)) {
			foromt = "YYYY-MM-dd";
		}
		if (foromt.indexOf("YYYY") > -1) {
			foromt = foromt.replace("YYYY", YYYY);
		}
		if (foromt.indexOf("MM") > -1) {
			foromt = foromt.replace("MM", MM);
		}
		if (foromt.indexOf("dd") > -1) {
			foromt = foromt.replace("dd", dd);
		}
		if (foromt.indexOf("hh") > -1) {
			foromt = foromt.replace("hh", hh);
		}
		if (foromt.indexOf("mm") > -1) {
			foromt = foromt.replace("mm", mm);
		}
		if (foromt.indexOf("ss") > -1) {
			foromt = foromt.replace("ss", ss);
		}
		return foromt;
	},
  /**
   *@description
   *type:success / fail / exception / none
   */
	showToast: function (type, text) {
		dd.showToast({
			type: type,
			content: text,
			duration: 2000,
			success: () => {
			},
		});
	}
});
