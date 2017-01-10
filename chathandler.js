// 监听聊天系统
$("#out2").bind("DOMSubtreeModified", checkTask);
//jQuery('#out').on("DOMSubtreeModified",myFunction);

//颜旗使道：给我在19分41秒内杀野狗。
//任务所在地方好像是：雪亭镇-黄土小径


sepStr = /任务所在地方好像是/
matinf = /：(.+)-(.+)[\r\n]/

/*
function checkTask() {
	var chatmsg = document.getElementById("out2").getElementsByClassName("out2")
	var chatarr = Array.prototype.slice.call(chatmsg)
	//var lastmsg = chatarr[chatarr.length-1].innerText
	for(var i=0; i < chatarr.length;i++){
		var chatstr = chatarr[i].innerText.toString();
		if(sepStr.test(chatstr)){
			console.log("任务信息 ：")
			var map_inf= chatstr.match(matinf)
			if (map_inf[1] && map_inf[2]){
				console.log("起始点 "+map_inf[1], "目的地 "+map_inf[2])
			}
			break;
		}
	}
}



checkTask()

*/

function checkTask() {
	var chatmsg = document.getElementById("out2").getElementsByClassName("out2")
	var chatarr = Array.prototype.slice.call(chatmsg)
	var lastmsg = chatarr[chatarr.length-1].innerText
	var lastmsg = lastmsg.toString();
	if(sepStr.test(lastmsg)){
		console.log("任务信息 ：")
		var map_inf= lastmsg.match(matinf)
		if (map_inf[1] && map_inf[2]){
			console.log("起始点 "+map_inf[1], "目的地 "+map_inf[2])
		}
	}
}