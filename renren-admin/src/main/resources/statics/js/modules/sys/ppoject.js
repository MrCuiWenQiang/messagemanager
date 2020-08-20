$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/ppoject/list',
        datatype: "json",
        colModel: [
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '项目名称', name: 'name', index: 'name', width: 80 },
			{ label: '密钥', name: 'keyCode', index: 'keyCode', width: 80 },
			{ label: '状态', name: 'status', index: 'status', width: 80 ,formatter:function (cellvalue, options, rowObject) {
                    if (cellvalue==0){
                        temp = "正常";
                    } else if (cellvalue==1){
                        temp = "停用";
                    } else {
                        temp = "未知状态";
                    }
                    return temp;
                }},
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 }
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		showedit: false,
		showAdd: false,
		title: null,
		pPoject: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.showAdd = true;
			vm.title = "新增";
			vm.pPoject = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
			vm.showedit = true;
            vm.title = "修改";

            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/ppoject/update",
                    contentType: "application/json",
                    data: JSON.stringify(vm.pPoject),
                    success: function(r){
                        if(r.code === 0){
                             layer.msg("操作成功", {icon: 1});
                             vm.reload();
                                 $('#btnSaveOrUpdate').button('reset');
                                 $('#btnSaveOrUpdate').dequeue();

                        }else{
                            layer.alert(r.msg);
                                $('#btnSaveOrUpdate').button('reset');
                                $('#btnSaveOrUpdate').dequeue();
                        }
                    }
                });
			});
		},

        save:function (event) {
            if (vm.pPoject.name==null){
                layer.alert("请填写项目名称")
                return
            }
            $('#btnSave').button('loading').delay(1000).queue(function () {

                $.ajax({
                    type:"POST",
                    url:baseURL+"sys/ppoject/save",
                    contentType:"application/json",
                    data: JSON.stringify(vm.pPoject),
                    success:function (r) {
                        if (r.code===0){
                            layer.msg("操作成功", {icon: 1});
                            vm.reload();
                            $('#btnSave').button('reset');
                            $('#btnSave').dequeue();
                        } else {
                            layer.alert(r.msg);
                            $('#btnSave').button('reset')
                            $('#btnSave').dequeue()
                        }


                    },
                    error:function (a,b,c) {
                        layer.alert('连接失败');
                        $('#btnSave').button('reset')
                        $('#btnSave').dequeue()
                    }
                });
            });
        },

		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			var lock = false;
            layer.confirm('确定要删除选中的记录？', {
                btn: ['确定','取消'] //按钮
            }, function(){
               if(!lock) {
                    lock = true;
		            $.ajax({
                        type: "POST",
                        url: baseURL + "sys/ppoject/delete",
                        contentType: "application/json",
                        data: JSON.stringify(ids),
                        success: function(r){
                            if(r.code == 0){
                                layer.msg("操作成功", {icon: 1});
                                $("#jqGrid").trigger("reloadGrid");
                            }else{
                                layer.alert(r.msg);
                            }
                        }
				    });
			    }
             }, function(){
             });
		},
		getInfo: function(id){
			$.get(baseURL + "sys/ppoject/info/"+id, function(r){
                vm.pPoject = r.pPoject;
            });
		},
		reload: function (event) {
			vm.showList = true;
			vm.showedit = false;
			vm.showAdd = false;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                page:page
            }).trigger("reloadGrid");
		}
	}
});