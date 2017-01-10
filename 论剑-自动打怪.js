/*
使用说明，在 t 中加入你要杀的npc名字。
到达地点，打开脚本。

目前问题，需要反复回到查看界面。
*/
var tempSearched = [] //npc搜索过的id，防止重复搜身

t = ["野狗","豆豆"] //击杀npc的名字


function findnewnpc(){
	var buttons = document.getElementsByTagName('button');
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		if (t.indexOf(button.innerHTML) != -1) {
		console.log("发现 "+ button.innerHTML);
		button.onclick();
		break;
		}
		if (button.innerHTML.match(/杀死/)){
			button.onclick();
			console.log("尝试 "+ button.innerHTML)
			break;
		}else if(button.innerHTML.match(/搜索/)){
			clickButton('prev')
			break;
		}
	}
}

function searchNpc(){
	var e = g_obj_map.get("msg_room");
	for (c = 1; k = e.get("item" + c); c++){
		k = k.split(",")
		if (tempSearched.length > 100){
			tempSearched = []
		}
		if (tempSearched.indexOf(k[0]) != -1){
		}else{
			console.log("搜索 "+k[1]);
			clickButton('look_item '+k[0], 0)
			clickButton('get '+k[0], 1);
			tempSearched.push(k[0]);
			break;
		}
	}
}

function main(){
	clickButton('golook_room');
	findnewnpc();
	var out_text = document.getElementsByClassName("outbig_text");
	if (out_text != null){
		for(var i = 0; i < out_text.length; i++) {
			if (out_text[i].innerHTML.match(/战斗结束/)){
				console.log("杀死单位，返回。");
				clickButton('prev_combat');
				searchNpc();
				break;
			}
		}
	}
}

var taskid = setInterval(function() { main() }, 2000);

// clearInterval(taskid) 停止脚本