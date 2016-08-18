$(document).ready(function(){
	var mX;
	var mY;
	var trZ=0;
	var roX=330;
	var roY=30;
	var b_up=1;
	var roxn=0;
	var subface=new Array();
	var cube_html="";
	var sfID="";
	var mouseSwitch=0;
	var r_switch=0;
	var ran_switch=1;

	var state = new Array();
	state['U'] = "UUUUUUUUU";
	state['R'] = "RRRRRRRRR";
	state['F'] = "FFFFFFFFF";
	state['D'] = "DDDDDDDDD";
	state['L'] = "LLLLLLLLL";
	state['B'] = "BBBBBBBBB";


	function trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}

	function printInfo() {
		console.log("U:" + state["U"]);
		console.log("R:" + state["R"]);
		console.log("F:" + state["F"]);
		console.log("D:" + state["D"]);
		console.log("L:" + state["L"]);
		console.log("B:" + state["B"]);

	}

	function MyObject(str, arr) {
		this.str = str;
		this.arr = arr;
	}

	function change(str ,flag) {
		var result = "";
		if(flag == 1) {
			//console.log("顺时针");
			result = str[6] + str[3] + str[0] + str[7] + str[4] + str[1] + str[8] + str[5] + str[2];
		}
		else {
			result = str[2] + str[5] + str[8] + str[1] + str[4] + str[7] + str[0] + str[3] + str[6];
		}

		return result;
	}


	function change1(obj_arr, flag) {
		state_arr = new Array();
		for(i = 0; i < obj_arr.length; i++) {
			state_arr[i] = state[obj_arr[i].str].split("");
		}
		if(flag == 1) {
			for(i = 0; i < state_arr.length - 1; i++) {
				for(j in obj_arr[i].arr) {
					state_arr[i][obj_arr[i].arr[j]] = state_arr[i + 1][obj_arr[i + 1].arr[j]];
				}
			}
			for(j in obj_arr[state_arr.length - 1].arr) {
				state_arr[state_arr.length - 1][obj_arr[state_arr.length - 1].arr[j]] = state[obj_arr[0].str][obj_arr[0].arr[j]];
			}
		}
		else {
			for(i = state_arr.length - 1; i > 0; i--) {
				for(j in obj_arr[i].arr) {
					state_arr[i][obj_arr[i].arr[j]] = state_arr[i - 1][obj_arr[i - 1].arr[j]];
				}
			}
			for(j in obj_arr[0].arr) {
				state_arr[0][obj_arr[0].arr[j]] = state[obj_arr[obj_arr.length - 1].str][obj_arr[obj_arr.length - 1].arr[j]];
			}

		}


		for(i = 0; i < obj_arr.length; i++) {
			state[obj_arr[i].str] = state_arr[i].join("");
		}
	}

	function up(flag) {
		state['U'] = change(state['U'], flag);

		obj_arr = [new MyObject("F", [0, 1, 2]), new MyObject("R", [0, 1, 2]), new MyObject("B", [0, 1, 2]), new MyObject("L", [0, 1, 2])];
		change1(obj_arr, flag);

	}

	function down(flag) {
		state['D'] = change(state['D'], -flag);

		obj_arr = [new MyObject("F", [6, 7, 8]), new MyObject("R", [6, 7, 8]), new MyObject("B", [6, 7, 8]), new MyObject("L", [6, 7, 8])];
		change1(obj_arr, flag);
	}

	function right(flag) {
		state['R'] = change(state['R'], flag);

		obj_arr = [new MyObject("F", [2, 5, 8]), new MyObject("D", [2, 5, 8]), new MyObject("B", [6, 3, 0]), new MyObject("U", [2, 5, 8])];
		change1(obj_arr, flag);
	}

	function left(flag) {
		state['L'] = change(state['L'], -flag);

		obj_arr = [new MyObject("F", [0, 3, 6]), new MyObject("D", [0, 3, 6]), new MyObject("B", [8, 5, 2]), new MyObject("U", [0, 3, 6])];
		change1(obj_arr, flag);
	}

	function front(flag) {
		state['F'] = change(state['F'], flag);

		obj_arr = [new MyObject("U", [8, 7, 6]), new MyObject("L", [2, 5, 8]), new MyObject("D", [0, 1, 2]), new MyObject("R", [6, 3, 0])];
		change1(obj_arr, flag);
	}

	function behind(flag) {
		state['B'] = change(state['B'], -flag);

		obj_arr = [new MyObject("U", [0, 1, 2]), new MyObject("L", [6, 3, 0]), new MyObject("D", [8, 7, 6]), new MyObject("R", [2, 5, 8])];
		change1(obj_arr, flag);
	}






	var is_recover = 0;

	rotateCUBE();
	$("#container").css("left",$(document).width()/2-400+"px");
	for(i=1;i<=6;i++){
		//6个面，1前2后3右4左5上6下
		subface[i]=new Array();
		for(j=1;j<=9;j++){
			//每面9个小块，1左上2上3右上4左5中6右7左下8下9右下
			subface[i][j]=new Array();
			for(k=1;k<=2;k++)
			//k=1设置背景颜色，k=2设置位置
				subface[i][j][k]="";
		}
	}
	
	//初始化大面颜色和位置
	for(j=1;j<=9;j++){
		subface[1][j][1]="#FD2429";
		subface[1][j][2]+="rotateY(0deg)";
	}
	for(j=1;j<=9;j++){
		subface[2][j][1]="#F60";
		subface[2][j][2]+="rotateY(180deg)";
	}
	for(j=1;j<=9;j++){
		subface[3][j][1]="#0BBB1D";
		subface[3][j][2]+="rotateY(90deg)";
	}
	for(j=1;j<=9;j++){
		subface[4][j][1]="#06C";
		subface[4][j][2]+="rotateY(-90deg)";
	}
	for(j=1;j<=9;j++){
		subface[5][j][1]="#FF0";
		subface[5][j][2]+="rotateX(90deg)";
	}
	for(j=1;j<=9;j++){
		subface[6][j][1]="#FFF";
		subface[6][j][2]+="rotateX(-90deg)";
	}
	
	//初始化子面位置
	for(i=1;i<=6;i++){
		subface[i][1][2]+=" translateX(-100px) translateY(-100px)";
		subface[i][2][2]+=" translateY(-100px)";
		subface[i][3][2]+=" translateX(100px) translateY(-100px)";
		subface[i][4][2]+=" translateX(-100px)";
		subface[i][5][2]+="";
		subface[i][6][2]+=" translateX(100px)";
		subface[i][7][2]+=" translateX(-100px) translateY(100px)";
		subface[i][8][2]+=" translateY(100px)";
		subface[i][9][2]+=" translateX(100px) translateY(100px)";
	}
	
	addsf();
	
	//拖动转向
	var md=2;
	$(document).mousemove(function(e){
		if(md==1){
 		    mX=e.pageX;
			mY=e.pageY;
			md=2;
		}else if(!md){
			mX=e.pageX-mX;
			mY=e.pageY-mY;
			md=2;
			if(Math.abs(mX)>50||Math.abs(mY)>50){
				if(sfID!=""){
					//转动一层
					switch(parseInt(sfID.charAt(2))){
						case 1:
							if(Math.abs(mX)>Math.abs(mY))
								lr(-mX*b_up);
							else
								bu(-mY*b_up);
							break;
						case 2:
							if(Math.abs(mX)>Math.abs(mY))
								lr(-mX*b_up);
							else
								bu2(mY*b_up);
							break;
						case 3:
							if(Math.abs(mX)>Math.abs(mY))
								lr(-mX*b_up);
							else
								buff4(mY*b_up);
							break;
						case 4:
							if(Math.abs(mX)>Math.abs(mY))
								lr(-mX*b_up);
							else
								buff3(-mY*b_up);
							break;
						case 5:
							switch(roxn%2){
								case 0:
									if(Math.abs(mX)>Math.abs(2*mY))
										buff((1-roxn)*mX);
									else
										bu((roxn-1)*mY);
									break;
								case 1:
									if(Math.abs(mX)>Math.abs(2*mY))
										bu((roxn-2)*mX);
									else
										buff((roxn-2)*mY);
									break;
							}
							break;
						case 6:
							switch(roxn%2){
								case 0:
									if(Math.abs(mX)>Math.abs(2*mY))
										bu((1-roxn)*mX);
									else
										buff2((roxn-1)*mY);
									break;
								case 1:
									if(Math.abs(mX)>Math.abs(2*mY))										
										buff2((2-roxn)*mX);
									else
										bu((2-roxn)*mY);
									break;
							}
							break;
					}
				}else{
					//转动整体
					if(Math.abs(mX)>Math.abs(mY)){
						if(mX>0){
							if(b_up==1){
								roY+=90;
								roxn++;
								roxn%=4;
							}
							else{
								roxn--;
								if(roxn<0)
									roxn+=4;
								roY-=90;
							}
							console.log("向右转动整体");
							rotateCUBE();

						}else {
							if(b_up==-1){
								roY+=90;
								roxn++;
								roxn%=4;
							}
							else{
								roxn--;
								if(roxn<0)
									roxn+=4;
								roY-=90;
							}
							console.log("向左转动整体");
							rotateCUBE();
						}						
					}else{
						b_up=-b_up;
						if(mY>0){
							roX-=180;
							roY-=b_up*30;
							console.log("向下转动整体");
							rotateCUBE();
							

						}else {
							roX+=180;
							roY-=b_up*30;
							console.log("向上转动整体");
							rotateCUBE();

						}					
					}
				}
			}
			mX=e.pageX;
			mY=e.pageY;
			sfID="";
		}
	});
	$(document).mousedown(function(){
		md=1;
		if(!mouseSwitch){
			mouseSwitch=1;
		}
	});
	$(document).mouseup(function(){
		md=0;
		if(mouseSwitch==1){
			mouseSwitch=2;
			var timer_=setTimeout(function(){mouseSwitch=0},500);
		}
	});
	
	//向页面中添加各面
	function addsf(){
		cube_html="";
		for(i=1;i<=6;i++)
			for(j=1;j<=9;j++){
				if(j==1)
					switch(i){
						case 1:
							cube_html+='<div id="frontF">';
							break;
						case 2:
							cube_html+='<div id="backF">';
							break;
						case 3:
							cube_html+='<div id="rightF">';
							break;
						case 4:
							cube_html+='<div id="leftF">';
							break;
						case 5:
							cube_html+='<div id="topF">';
							break;
						case 6:
							cube_html+='<div id="bottomF">';
					}
				cube_html+='<li id="sf'+i+'_'+j+'" style="background-color:'+subface[i][j][1]+'; -webkit-transform:'+subface[i][j][2]+' translateZ(150px); -moz-transform:'+subface[i][j][2]+' translateZ(150px);"></li>'
				if(j==9)cube_html+='</div>';
			};
		$("#cube").html(cube_html);
		$("li").bind("mousedown",function(){
			sfID=$(this).attr("id");
		});
	}
	
	//转动整体
	function rotateCUBE(){
		$("#cube").css("-webkit-transform","rotateX("+roX+"deg) rotateY("+roY+"deg) translateX("+trZ*Math.sin(-roX*0.0174)+"px) translateY("+trZ*Math.sin(roY*0.0174)+"px) translateZ(-"+trZ+"px)");
		$("#cube").css("-moz-transform","rotateX("+roX+"deg) rotateY("+roY+"deg) translateX("+trZ*Math.sin(-roX*0.0174)+"px) translateY("+trZ*Math.sin(roY*0.0174)+"px) translateZ(-"+trZ+"px)");
	}
	
	//转动一层
	//左右上
	function lru(x){
		console.log("左右上");
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			up(1);
			console.log("顺时针");
			$("#topF").css("-webkit-transform","rotateY(-90deg)");
			$("#topF").css("-moz-transform","rotateY(-90deg)");
			col_c2(5);
			for(j=1;j<=3;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[4][j][1];
				subface[4][j][1]=col;
			}
		}
		else{
			up(-1);
			console.log("逆时针");
			$("#topF").css("-webkit-transform","rotateY(90deg)");
			$("#topF").css("-moz-transform","rotateY(90deg)");
			col_c(5);
			for(j=1;j<=3;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[4][j][1];
				subface[4][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[1][j][1];
				subface[1][j][1]=col;
			}
		}

		printInfo();

		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//左右中
	function lrm(x){
		console.log("左右中");
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0) {
			console.log("顺时针");
			for(j=4;j<=6;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[4][j][1];
				subface[4][j][1]=col;
			}
		}
		else
			for(j=4;j<=6;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[4][j][1];
				subface[4][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[1][j][1];
				subface[1][j][1]=col;
			}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//左右下
	function lrb(x){
		console.log("左右下");
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			down(1);
			console.log("顺时针");
			$("#bottomF").css("-webkit-transform","rotateY(-90deg)");
			$("#bottomF").css("-moz-transform","rotateY(-90deg)");
			col_c(6);
			for(j=7;j<=9;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[4][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[2][j][2].replace("Y(180","Y(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[4][j][1];
				subface[4][j][1]=col;
			}
		}
		else{
			down(-1);
			$("#bottomF").css("-webkit-transform","rotateY(90deg)");
			$("#bottomF").css("-moz-transform","rotateY(90deg)");
			col_c2(6);
			for(j=7;j<=9;j++){
				$("#sf1_"+j).css("-webkit-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-webkit-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-webkit-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[3][j][2]+" translateZ(150px)");
				$("#sf2_"+j).css("-moz-transform",subface[4][j][2].replace("Y(-90","Y(270")+" translateZ(150px)");
				$("#sf3_"+j).css("-moz-transform",subface[2][j][2]+" translateZ(150px)");
				$("#sf4_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[4][j][1];
				subface[4][j][1]=subface[2][j][1];
				subface[2][j][1]=subface[3][j][1];
				subface[3][j][1]=subface[1][j][1];
				subface[1][j][1]=col;
			}
		}
		printInfo();
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上左
	function bul(x){
		console.log("下上左");
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			left(1);
			console.log("顺时针");
			$("#leftF").css("-webkit-transform","rotateX(90deg) translateY(-50px) translateZ(-50px)");
			$("#leftF").css("-moz-transform","rotateX(90deg) translateY(-50px) translateZ(-50px)");
			col_c(4);
			for(j=1;j<=7;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[6][j][1];
				subface[6][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[5][j][1];
				subface[5][j][1]=col;
			}
		}
		else{
			left(-1);
			$("#leftF").css("-webkit-transform","rotateX(-90deg) translateY(-50px) translateZ(50px)");
			$("#leftF").css("-moz-transform","rotateX(-90deg) translateY(-50px) translateZ(50px)");
			col_c2(4);
			for(j=1;j<=7;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[5][j][1];
				subface[5][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[6][j][1];
				subface[6][j][1]=col;
			}
		}
		printInfo();
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上中
	function bum(x){
		console.log("下上中bum");
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0) {
			console.log("顺时针");
			for(j=2;j<=8;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[6][j][1];
				subface[6][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[5][j][1];
				subface[5][j][1]=col;
			}
		}
		else
			for(j=2;j<=8;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[5][j][1];
				subface[5][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[6][j][1];
				subface[6][j][1]=col;
			}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上右
	function bur(x){
		console.log("下上右");
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			right(1);
			console.log("顺时针");
			$("#rightF").css("-webkit-transform","rotateX(90deg) translateY(-50px) translateZ(-50px)");
			$("#rightF").css("-moz-transform","rotateX(90deg) translateY(-50px) translateZ(-50px)");
			col_c2(3);
			for(j=3;j<=9;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[5][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(270deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[5][j][2].replace("X(90","X(180")+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[6][j][1];
				subface[6][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[5][j][1];
				subface[5][j][1]=col;
			}
		}
		else{
			right(-1);
			$("#rightF").css("-webkit-transform","rotateX(-90deg) translateY(-50px) translateZ(50px)");
			$("#rightF").css("-moz-transform","rotateX(-90deg) translateY(-50px) translateZ(50px)");
			col_c(3);
			for(j=3;j<=9;j+=3){
				$("#sf1_"+j).css("-webkit-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-webkit-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-webkit-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");		
				
				$("#sf1_"+j).css("-moz-transform",subface[6][j][2]+" translateZ(150px)");
				$("#sf2_"+(10-j)).css("-moz-transform",subface[2][10-j][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf5_"+j).css("-moz-transform",subface[1][j][2]+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[6][j][2].replace("X(-90","X(-180")+" translateZ(150px)");	
				col=subface[1][j][1];
				subface[1][j][1]=subface[5][j][1];
				subface[5][j][1]=subface[2][10-j][1];
				subface[2][10-j][1]=subface[6][j][1];
				subface[6][j][1]=col;
			}
		}
		printInfo();
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上前
	function buf(x){
		console.log("下上前");
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			front(1);
			console.log("顺时针");
			$("#frontF").css("-webkit-transform","rotateZ(90deg) translateX(50px) translateY(-50px)");
			$("#frontF").css("-moz-transform","rotateZ(90deg) translateX(50px) translateY(-50px)");
			col_c2(1);
			for(j=1;j<=3;j++){
				$("#sf5_"+(j+6)).css("-webkit-transform",subface[5][j+6][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[6][j][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-2)).css("-webkit-transform",subface[3][j*3-2][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3)).css("-webkit-transform",subface[4][j*3][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
				
				
				$("#sf5_"+(j+6)).css("-moz-transform",subface[5][j+6][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[6][j][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-2)).css("-moz-transform",subface[3][j*3-2][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3)).css("-moz-transform",subface[4][j*3][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
				
				col=subface[5][10-j][1];
				subface[5][10-j][1]=subface[4][j*3][1];
				subface[4][j*3][1]=subface[6][j][1];
				subface[6][j][1]=subface[3][10-j*3][1];
				subface[3][10-j*3][1]=col;
			}
		}
		else{
			front(-1);
			$("#frontF").css("-webkit-transform","rotateZ(-90deg) translateX(-50px) translateY(-50px)");
			$("#frontF").css("-moz-transform","rotateZ(-90deg) translateX(-50px) translateY(-50px)");
			col_c(1);
			for(j=1;j<=3;j++){
				$("#sf5_"+(j+6)).css("-webkit-transform",subface[5][j+6][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+j).css("-webkit-transform",subface[6][j][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-2)).css("-webkit-transform",subface[3][j*3-2][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3)).css("-webkit-transform",subface[4][j*3][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
				
				$("#sf5_"+(j+6)).css("-moz-transform",subface[5][j+6][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+j).css("-moz-transform",subface[6][j][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-2)).css("-moz-transform",subface[3][j*3-2][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3)).css("-moz-transform",subface[4][j*3][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
				
				col=subface[5][10-j][1];
				subface[5][10-j][1]=subface[3][10-j*3][1];
				subface[3][10-j*3][1]=subface[6][j][1];
				subface[6][j][1]=subface[4][j*3][1];
				subface[4][j*3][1]=col;
			}
		}
		printInfo();
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上中
	function bufm(x){
		console.log("下上中bufm");
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0) {
			console.log("顺时针");
			for(j=1;j<=3;j++){
				$("#sf5_"+(j+3)).css("-webkit-transform",subface[5][j+3][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+3)).css("-webkit-transform",subface[6][j+3][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-1)).css("-webkit-transform",subface[3][j*3-1][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-1)).css("-webkit-transform",subface[4][j*3-1][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
				
				
				$("#sf5_"+(j+3)).css("-moz-transform",subface[5][j+3][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+3)).css("-moz-transform",subface[6][j+3][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-1)).css("-moz-transform",subface[3][j*3-1][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-1)).css("-moz-transform",subface[4][j*3-1][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
				
				col=subface[5][7-j][1];
				subface[5][7-j][1]=subface[4][j*3-1][1];
				subface[4][j*3-1][1]=subface[6][j+3][1];
				subface[6][j+3][1]=subface[3][11-j*3][1];
				subface[3][11-j*3][1]=col;
			}
		}
		else
			for(j=1;j<=3;j++){
				$("#sf5_"+(j+3)).css("-webkit-transform",subface[5][j+3][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+3)).css("-webkit-transform",subface[6][j+3][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-1)).css("-webkit-transform",subface[3][j*3-1][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-1)).css("-webkit-transform",subface[4][j*3-1][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
				
				
				$("#sf5_"+(j+3)).css("-moz-transform",subface[5][j+3][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+3)).css("-moz-transform",subface[6][j+3][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3-1)).css("-moz-transform",subface[3][j*3-1][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-1)).css("-moz-transform",subface[4][j*3-1][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
				
				col=subface[5][7-j][1];
				subface[5][7-j][1]=subface[3][11-j*3][1];
				subface[3][11-j*3][1]=subface[6][j+3][1];
				subface[6][j+3][1]=subface[4][j*3-1][1];
				subface[4][j*3-1][1]=col;
			}
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//下上后
	function bub(x){
		console.log("下上后");
	if(!r_switch){
			r_switch=1;
			var timer_=setTimeout(function(){r_switch=0},500);
		if(x>0){
			behind(1);
			console.log("顺时针");
			$("#backF").css("-webkit-transform","rotateZ(90deg) translateX(50px) translateY(-50px)");
			$("#backF").css("-moz-transform","rotateZ(90deg) translateX(50px) translateY(-50px)");
			col_c(2);
			for(j=1;j<=3;j++){
				$("#sf5_"+j).css("-webkit-transform",subface[5][j][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+6)).css("-webkit-transform",subface[6][j+6][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3)).css("-webkit-transform",subface[3][j*3][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-2)).css("-webkit-transform",subface[4][j*3-2][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
				
				
				$("#sf5_"+j).css("-moz-transform",subface[5][j][2].replace("deg)","deg) rotateY(90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+6)).css("-moz-transform",subface[6][j+6][2].replace("deg)","deg) rotateY(-90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3)).css("-moz-transform",subface[3][j*3][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-2)).css("-moz-transform",subface[4][j*3-2][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");		
								
				col=subface[5][4-j][1];
				subface[5][4-j][1]=subface[4][j*3-2][1];
				subface[4][j*3-2][1]=subface[6][j+6][1];
				subface[6][j+6][1]=subface[3][12-j*3][1];
				subface[3][12-j*3][1]=col;
			}
		}
		else{
			behind(-1);
			$("#backF").css("-webkit-transform","rotateZ(-90deg) translateX(-50px) translateY(-50px)");
			$("#backF").css("-moz-transform","rotateZ(-90deg) translateX(-50px) translateY(-50px)");
			col_c2(2);
			for(j=1;j<=3;j++){
				$("#sf5_"+j).css("-webkit-transform",subface[5][j][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+6)).css("-webkit-transform",subface[6][j+6][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3)).css("-webkit-transform",subface[3][j*3][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-2)).css("-webkit-transform",subface[4][j*3-2][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
				
				
				$("#sf5_"+j).css("-moz-transform",subface[5][j][2].replace("deg)","deg) rotateY(-90deg)")+" translateZ(150px)");
				$("#sf6_"+(j+6)).css("-moz-transform",subface[6][j+6][2].replace("deg)","deg) rotateY(90deg)") +" translateZ(150px)");
				$("#sf3_"+(j*3)).css("-moz-transform",subface[3][j*3][2].replace("deg)","deg) rotateX(90deg)")+" translateZ(150px)");
				$("#sf4_"+(j*3-2)).css("-moz-transform",subface[4][j*3-2][2].replace("deg)","deg) rotateX(-90deg)")+" translateZ(150px)");		
								
				col=subface[5][4-j][1];
				subface[5][4-j][1]=subface[3][12-j*3][1];
				subface[3][12-j*3][1]=subface[6][j+6][1];
				subface[6][j+6][1]=subface[4][j*3-2][1];
				subface[4][j*3-2][1]=col;
			}
		}
		printInfo();
		var timer_=setTimeout(function(){addsf();},500);
	}
	}
	
	//一面转动改变颜色
	function col_c(x){
			col=subface[x][7][1];
			subface[x][7][1]=subface[x][1][1];
			subface[x][1][1]=subface[x][3][1];
			subface[x][3][1]=subface[x][9][1];
			subface[x][9][1]=col;
			col=subface[x][2][1];
			subface[x][2][1]=subface[x][6][1];
			subface[x][6][1]=subface[x][8][1];
			subface[x][8][1]=subface[x][4][1];
			subface[x][4][1]=col;
	}
	function col_c2(x){
			col=subface[x][7][1];
			subface[x][7][1]=subface[x][9][1];
			subface[x][9][1]=subface[x][3][1];
			subface[x][3][1]=subface[x][1][1];
			subface[x][1][1]=col;
			col=subface[x][2][1];
			subface[x][2][1]=subface[x][4][1];
			subface[x][4][1]=subface[x][8][1];
			subface[x][8][1]=subface[x][6][1];
			subface[x][6][1]=col;
	}
	function lr(xx){
		switch(parseInt(sfID.charAt(4))){
			case 1:
			case 2:
			case 3:
				lru(xx);
				break;
			case 4:
			case 5:
			case 6:
				lrm(xx);
				break;
			case 7:
			case 8:
			case 9:
				lrb(xx);
				break;
			}
	}
	function bu(xx){
		switch(parseInt(sfID.charAt(4))){
			case 1:
			case 4:
			case 7:
				bul(xx);
				break;
			case 2:
			case 5:
			case 8:
				bum(xx);
				break;
			case 3:
			case 6:
			case 9:
				bur(xx);
				break;
			}
	}
	function bu2(xx){
		switch(parseInt(sfID.charAt(4))){
			case 1:
			case 4:
			case 7:
				bur(xx);
				break;
			case 2:
			case 5:
			case 8:
				bum(xx);
				break;
			case 3:
			case 6:
			case 9:
				bul(xx);
				break;
			}
	}
	function buff(xx){
		switch(parseInt(sfID.charAt(4))){
			case 1:
			case 2:
			case 3:
				bub(xx);
				break;
			case 4:
			case 5:
			case 6:
				bufm(xx);
				break;
			case 7:
			case 8:
			case 9:
				buf(xx);
				break;
		}
	}
	function buff2(xx){
		switch(parseInt(sfID.charAt(4))){
			case 1:
			case 2:
			case 3:
				buf(xx);
				break;
			case 4:
			case 5:
			case 6:
				bufm(xx);
				break;
			case 7:
			case 8:
			case 9:
				bub(xx);
				break;
		}
	}
	function buff3(xx){
		switch(parseInt(sfID.charAt(4))){
			case 3:
			case 6:
			case 9:
				buf(xx);
				break;
			case 2:
			case 5:
			case 8:
				bufm(xx);
				break;
			case 1:
			case 4:
			case 7:
				bub(xx);
				break;
		}
	}
	function buff4(xx){
		switch(parseInt(sfID.charAt(4))){
			case 3:
			case 6:
			case 9:
				bub(xx);
				break;
			case 2:
			case 5:
			case 8:
				bufm(xx);
				break;
			case 1:
			case 4:
			case 7:
				buf(xx);
				break;
		}
	}
	$("#cube_ran").click(function(){
		if(!is_recover) {
			if(ran_switch){
				ran_switch=0;
				cube_random(15);
				is_recover = 1;
				$("#cube_ran").text("复原");
			}
		}
		else {
			if(ran_switch) {
				is_recover = 0;
				ran_switch = 0;
				$("#cube_ran").text("打乱");

				$.get("solver.jsp?cubeString=" + state['U'] + state['R'] + state['F'] + state['D'] + state['L'] + state['B'], function(data) {
					console.log(data);
					


					if(data != "error") {
						actions = data.split(/[ ]+/);
						methods = [];
						acts = [];
						for(i = actions.length - 1; i >= 0; i--) {
							//console.log(actions[i] + "hh" + i + "HH");
							actions[i] = trimStr(actions[i]);
							if(actions[i].length > 0) {
								method = '';
								act2 = 1;
								loop = 1;
								switch(actions[i][0]) {
									case 'U':
										method = lru;
									break;
									case 'F':
										method = buf;
									break;
									case 'R':
										method = bur;
									break;
									case 'L':
										act2 = 0;
										method = bul;
									break;
									case 'B':
										act2 = 0;
										method = bub;
									break;
									case 'D':
										act2 = 0;
										method = lrb;
									break;
									default:
								}

								if(actions[i].length > 1) {
									if(actions[i][1] == '\'') {
										if(actions[i][0] == 'L' || actions[i][0] == 'B' || actions[i][0] == 'D') {
											act2 = 1;
										}
										else {
											act2 = 0;
										}
									}
									else if(actions[i][1] == '2') {
										loop++;
									}
								}


								for(j = 0; j < loop; j++) {
									methods.push(method);
									acts.push(act2);
								}




							}

						}
						do_action(methods, acts);
					}

				});
			}
			
		}
		
	});

	function do_action(methods, acts) {
		if(methods.length > 0) {
			method = methods.pop();
			act = acts.pop();

			method(act);
			console.log("act=" + act);

			setTimeout(function() {
				do_action(methods, acts);
			}, 600);
		}
		else {
			ran_switch = 1;
		}
		
	}


	function cube_random(rn){
		if(rn){
			rn--;
			act=Math.floor(Math.random() * 6);
			act2=Math.floor(Math.random() * 2);
			console.log("act2=" + act2);
			r_switch=0;
			switch(act){
				case 0:		
					lru(act2);
					break;	
				
				case 1:		
					lrb(act2);
					break;
				case 2:	
					bul(act2);	
					break;
				
				case 3:		
					bur(act2);
					break;
				case 4:		
					buf(act2);
					break;
				
				case 5:	
					bub(act2);	
					break;
			}
			var ran_timer=setTimeout(function(){cube_random(rn);},600);
		}
		else{
			clearTimeout(ran_timer);
			ran_switch=1;
		}
	}
});
