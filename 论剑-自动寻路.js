// created by Richard
// 2016年12月25日 完成主搜图逻辑 dfs
// 下一步完成 监控刷新数据。
// 如何快速决定任务属于哪一个任务地点。
// 只测试的第一章地图，需要先打开地图获取数据。
// allrooms = g_obj_map.get("map_snow") 这里需要更改，如果想用其他地图。

$("#out2").bind("DOMSubtreeModified", checkTask);
sepStr = /任务所在地方好像是/
matinf = /：(.+)-(.+)[\r\n]/
var allrooms = null
var direction = ["northwest","north","northeast","west","east","southwest","south","southeast"]
 // onclick="clickButton('go east', 0)"
var result = []
var path_tracker = null;

var map_world=[
	"雪亭镇",
	"洛阳",
	"华山村",
	"华山",
	"扬州",
	"丐帮",
	"乔阴县",
	"峨眉山",
	"恒山",
	"武当山",
	"晚月庄",
	"水烟阁",
	"少林寺",
	"唐门",
	"青城山",
	"逍遥林",
	"开封",
	"明教",
	"全真教",
	"古墓",
	"白驮山",
	"嵩山",
	"寒梅庄",
	"泰山",
	"大旗门",
	"大昭寺",
	"魔教",
	"星宿海",
	"茅山",
	"桃花岛",
	"铁雪山庄",
	"慕容山庄",
	"大理"
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
	if (allrooms[from]==undefined){ console.log("无法获知房间")};
	if (allrooms[to]==undefined){ console.log("无法获知房间")};
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
// 18 饮风客栈 --- 1 安记钱庄

function get_path(from,to){
	console.log();
	if (from == to){
		console.log("没错吧")
		return;
	}
	
	for(var key in allrooms){
		allrooms[key].visited = false;
	}
	
	if (allrooms[from]==undefined){
		console.log("无法获知房间")
	}
	if (allrooms[to]==undefined){
		console.log("无法获知房间")
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
				console.log("yu~~到达目的地！")
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



//clickButton('prev') //返回到前一界面

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
	console.log("数据获取完成")
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
    if(destation)//如果返回的有内容
    {
		setTimeout("get_map_inf()",2000);
		setTimeout(function(){searchMap(destation)},4000);
    }
}

//prom()