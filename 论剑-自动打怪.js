/*
ʹ��˵������ t �м�����Ҫɱ��npc���֡�
����ص㣬�򿪽ű���

Ŀǰ���⣬��Ҫ�����ص��鿴���档
*/
var tempSearched = [] //npc��������id����ֹ�ظ�����

t = ["Ұ��","����"] //��ɱnpc������


function findnewnpc(){
	var buttons = document.getElementsByTagName('button');
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		if (t.indexOf(button.innerHTML) != -1) {
		console.log("���� "+ button.innerHTML);
		button.onclick();
		break;
		}
		if (button.innerHTML.match(/ɱ��/)){
			button.onclick();
			console.log("���� "+ button.innerHTML)
			break;
		}else if(button.innerHTML.match(/����/)){
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
			console.log("���� "+k[1]);
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
			if (out_text[i].innerHTML.match(/ս������/)){
				console.log("ɱ����λ�����ء�");
				clickButton('prev_combat');
				searchNpc();
				break;
			}
		}
	}
}

var taskid = setInterval(function() { main() }, 2000);

// clearInterval(taskid) ֹͣ�ű�