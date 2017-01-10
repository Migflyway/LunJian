// created by Richard
// 2016��12��25�� �������ͼ�߼� dfs
// ��һ����� ���ˢ�����ݡ�
// ��ο��پ�������������һ������ص㡣
// ֻ���Եĵ�һ�µ�ͼ����Ҫ�ȴ򿪵�ͼ��ȡ���ݡ�
// allrooms = g_obj_map.get("map_snow") ������Ҫ���ģ��������������ͼ��

$("#out2").bind("DOMSubtreeModified", checkTask);
sepStr = /�������ڵط�������/
matinf = /��(.+)-(.+)[\r\n]/
var allrooms = null
var direction = ["northwest","north","northeast","west","east","southwest","south","southeast"]
 // onclick="clickButton('go east', 0)"
var result = []
var path_tracker = null;

var map_world=[
	"ѩͤ��",
	"����",
	"��ɽ��",
	"��ɽ",
	"����",
	"ؤ��",
	"������",
	"��üɽ",
	"��ɽ",
	"�䵱ɽ",
	"����ׯ",
	"ˮ�̸�",
	"������",
	"����",
	"���ɽ",
	"��ң��",
	"����",
	"����",
	"ȫ���",
	"��Ĺ",
	"����ɽ",
	"��ɽ",
	"��÷ׯ",
	"̩ɽ",
	"������",
	"������",
	"ħ��",
	"���޺�",
	"éɽ",
	"�һ���",
	"��ѩɽׯ",
	"Ľ��ɽׯ",
	"����"
]

Object.prototype.getKeyByValue = function( value ) {
	re = new RegExp(value, 'gi');
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ].name.match(re) )
                 return prop;
        }
    }
}

function search_room(from,to, result){
	if (allrooms[from]==undefined){ console.log("�޷���֪����")};
	if (allrooms[to]==undefined){ console.log("�޷���֪����")};
	if (allrooms[from].visited == true){return;}
	if (from == to ){ 
		return true;
	}
	allrooms[from].visited = true;
	var edges = allrooms[from] //object
	for(var key in edges) {
		if (direction.indexOf(key) != -1) {
			result.push(key);
			if (search_room(edges[key],to,result) == true) {
				return true;
			}
			result.pop(result);
		}
	}
}
// 18 �����ջ --- 1 ����Ǯׯ

function get_path(from,to){
	console.log();
	if (from == to){
		console.log("û���")
		return;
	}
	
	for(var key in allrooms){
		allrooms[key].visited = false;
	}
	
	if (allrooms[from]==undefined){
		console.log("�޷���֪����")
	}
	if (allrooms[to]==undefined){
		console.log("�޷���֪����")
	}
	if (from != to){
		var map_id = g_obj_map.get("msg_room").get("map_id");
		from = g_obj_map.get("map_"+map_id).start_room;// --18
	}
	if (search_room(from,to,result)==true){
		return true;
	}
}


//get_path(18,1)



var j = 0;
function main(){
	var buttons = document.getElementsByTagName('button');
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		if (window.getComputedStyle(document.querySelector("."+button.className)).getPropertyValue('background').match(/room_self/)){
			if (j >= result.length){
				console.log("yu~~����Ŀ�ĵأ�")
				clearInterval(path_tracker);
			}else{
				clickButton('go '+result[j], 0);
				console.log(j,result[j])
				j++;
			}
			break;
		}
	}
}



//clickButton('prev') //���ص�ǰһ����

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
			intoMap(map_inf[1],map_inf[2])
		}
	}
}

function intoMap(ksroom, jsroom){
	my_first_room = new RegExp(ksroom, 'gi');
	for (i = 0; i < map_world.length; i++) { 
		if (map_world[i].match(my_first_room)){
			clickButton('jh '+(i+1));
			prom(jsroom)
			break;
		}
	}
}

function get_map_inf(){
	var map_id = g_obj_map.get("msg_room").get("map_id");
	allrooms = g_obj_map.get("map_"+map_id)
	console.log("���ݻ�ȡ���")
}

function searchMap(destation){
	if (allrooms && allrooms.getKeyByValue(destation)){
		console.log("destination id is "+allrooms.getKeyByValue(destation));
		var map_id = g_obj_map.get("msg_room").get("map_id");
		from = g_obj_map.get("map_"+map_id).start_room;// --18
		var to = allrooms.getKeyByValue(destation)
		if (get_path(from,to)){
			path_tracker = setInterval(function() { main() }, 2000);
		}
	}
}

function prom(destation)
{
    if(destation)//������ص�������
    {
		setTimeout("get_map_inf()",2000);
		setTimeout(function(){searchMap(destation)},4000);
    }
}

//prom()