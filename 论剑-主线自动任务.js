/*
Richard Wen 制作
论剑mud 自动任务js
2016年12月19日


这种方式固定了时间

试想可不可以使用while loop + random sleep 来操作。
*/



function main(){
	// 退出任务
	var out_text = document.getElementsByClassName("outbig_text");
	if (out_text != null){
		for(var i = 0; i < out_text.length; i++) {
			if (out_text[i].innerHTML.match(/离开关卡/)){
				console.log("主线任务结束");
				clickButton('home');
				clearInterval(taskid);
				break;
			}
		}	
	}
	
	//主任务逻辑
	var buttons = document.getElementsByTagName('button');
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		if (button.innerHTML.match(/确定/) || button.innerHTML.match(/进入关卡/)){
			button.onclick();
			console.log("点击 "+ button.innerHTML)
			break;
		}
		if (window.getComputedStyle(document.querySelector("."+button.className)).getPropertyValue('background').match(/gif/)){
			button.onclick();
			console.log("点击 "+ button.innerHTML)
			break;
		}
	}	
}

clickButton('jh');
var taskid = setInterval(function() { main() }, 2000);
