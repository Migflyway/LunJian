// ��������ϵͳ
$("#out2").bind("DOMSubtreeModified", checkTask);
//jQuery('#out').on("DOMSubtreeModified",myFunction);

//����ʹ����������19��41����ɱҰ����
//�������ڵط������ǣ�ѩͤ��-����С��


sepStr = /�������ڵط�������/
matinf = /��(.+)-(.+)[\r\n]/

/*
function checkTask() {
	var chatmsg = document.getElementById("out2").getElementsByClassName("out2")
	var chatarr = Array.prototype.slice.call(chatmsg)
	//var lastmsg = chatarr[chatarr.length-1].innerText
	for(var i=0; i < chatarr.length;i++){
		var chatstr = chatarr[i].innerText.toString();
		if(sepStr.test(chatstr)){
			console.log("������Ϣ ��")
			var map_inf= chatstr.match(matinf)
			if (map_inf[1] && map_inf[2]){
				console.log("��ʼ�� "+map_inf[1], "Ŀ�ĵ� "+map_inf[2])
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
		console.log("������Ϣ ��")
		var map_inf= lastmsg.match(matinf)
		if (map_inf[1] && map_inf[2]){
			console.log("��ʼ�� "+map_inf[1], "Ŀ�ĵ� "+map_inf[2])
		}
	}
}