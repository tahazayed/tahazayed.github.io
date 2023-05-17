"use strict";

window.onload = setTiles;

var currentDiv;

function setTiles()
{
	var childDivs = document.getElementById('puzzlearea').getElementsByTagName('div');

	var n = 0;
	var id = 0;

	document.getElementById("shufflebutton").onclick = shufflePuzzle;

	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			childDivs[n].id = id;
			id++;
			childDivs[n].onmouseover = hoverCall;
			childDivs[n].onmouseout = mouseOut;
			childDivs[n].onclick = clickCall;
			
			if(i===parseInt("3") && j===parseInt("3")){
				break;
			}
			childDivs[n].className = "puzzlepiece";
			
			if(i==0 || j==0){
				if(i==0 && j==0){
					childDivs[n].style.top = "0px";
					childDivs[n].style.left = "0px";
					childDivs[n].style.backgroundPosition = '0px 0px';
					n++;
					continue;
				}
				else if(i==0){
					childDivs[n].style.left = (parseInt(j)) * 100 + "px";
					childDivs[n].style.top = "0px";
					childDivs[n].style.backgroundPosition = (parseInt(-j)*100)+ 'px 0px';
				}
				else if(j==0){
					childDivs[n].style.left = "0px";
					childDivs[n].style.top = (parseInt(i)) * 100 + "px";
					childDivs[n].style.backgroundPosition = '0px '+(parseInt(-i)*100)+ 'px';
				}
			}
			else{
				childDivs[n].style.top = (parseInt(i)) * 100 + "px";
				childDivs[n].style.left = (parseInt(j)) * 100 + "px";
				childDivs[n].style.backgroundPosition = (parseInt(-j)*100)+ 'px '+(parseInt(-i)*100)+ 'px';
			}

			n++;
		}
	}

}


function shufflePuzzle()
{
	if(document.getElementById('empty') === null){
		addDiv();
	}
	var index = 0;
	var last_num = 0;
	var count = 0;
	
	while(count < 100)
	{
		var empty_x = document.getElementById('empty').style.left;
		var empty_y = document.getElementById('empty').style.top;
	
		var neighs = [];
		var empty_div_curr_loc = document.getElementById('empty').value;
	
		var leftid = parseInt(empty_div_curr_loc)-1;
		var rightid = parseInt(empty_div_curr_loc)+1;
		var topid = parseInt(empty_div_curr_loc)-4;
		var downid = parseInt(empty_div_curr_loc)+4;
	
		var left_neigh;
		var right_neigh;
		var top_neigh;
		var down_neigh;
	
		if(leftid>=0 && leftid<=15){
			left_neigh = (document.getElementById(leftid).style.left);
		}
		if(rightid>=0 && rightid<=15){
			right_neigh = (document.getElementById(rightid).style.left);
		}
		if(topid>=0 && topid<=15){
			top_neigh = (document.getElementById(topid).style.top);
		}
		if(downid>=0 && downid<=15){
			down_neigh = (document.getElementById(downid).style.top);
		}
	
		//Block the wrong pointers to the neighbour
		if (parseInt(empty_div_curr_loc)==4 || parseInt(empty_div_curr_loc)==8 || parseInt(empty_div_curr_loc)==12 || parseInt(empty_div_curr_loc)==0){
			left_neigh = undefined;
		}
		if (parseInt(empty_div_curr_loc)==3 || parseInt(empty_div_curr_loc)==7 || parseInt(empty_div_curr_loc)==11 || parseInt(empty_div_curr_loc)==15){
			right_neigh = undefined;
		}
		if (parseInt(empty_div_curr_loc)==0 || parseInt(empty_div_curr_loc)==1 || parseInt(empty_div_curr_loc)==2 || parseInt(empty_div_curr_loc)==3){
			top_neigh = undefined;
		}
		if (parseInt(empty_div_curr_loc)==12 || parseInt(empty_div_curr_loc)==13 || parseInt(empty_div_curr_loc)==14 || parseInt(empty_div_curr_loc)==15){
			down_neigh = undefined;
		}
	
		if(left_neigh){
			neighs.push(leftid);
		}
	
		if(right_neigh){
			neighs.push(rightid);
		}
	
		if(down_neigh){
			neighs.push(downid);
		}
	
		if(top_neigh){
			neighs.push(topid);
		}
		
		index = newRandomGen(neighs.length, last_num);

		var emp_div_id = document.getElementById('empty').value;
		var cur_div = neighs[parseInt(index)-1];
		document.getElementById('empty').value = cur_div;
		document.getElementById(cur_div).setAttribute('id', emp_div_id);
		
		interchangeCoords('empty', emp_div_id);
		
		neighs.length = 0;
		last_num = index;
		count++;
	}
}

function newRandomGen(maxi, lastnum)
{
	var randomnumber = Math.floor((Math.random() * parseInt(maxi)) + 1);

	while(true){
		randomnumber = Math.floor((Math.random() * parseInt(maxi)) + 1);
		if(lastnum != randomnumber){
			break;
		}
	}
	return randomnumber;
}

function hoverCall()
{
	var empty_x = document.getElementById('empty').style.left;
	var empty_y = document.getElementById('empty').style.top;
	
	var l_x = document.getElementById(this.id).style.left; 
	var t_y = document.getElementById(this.id).style.top;
	
	if((parseInt(l_x) == parseInt(parseInt(empty_x) - 100)) && (parseInt(t_y) == parseInt(empty_y))){
		document.getElementById(this.id).className += " movablepiece";
	}
	if((parseInt(l_x) == parseInt(parseInt(empty_x) + 100)) && (parseInt(t_y) == parseInt(empty_y))){
		document.getElementById(this.id).className += " movablepiece";
	}
	if((parseInt(t_y) == parseInt(parseInt(empty_y) - 100)) && (parseInt(l_x) == parseInt(empty_x))){
		document.getElementById(this.id).className += " movablepiece";
	}
	if((parseInt(t_y) == parseInt(parseInt(empty_y) + 100)) && (parseInt(l_x) == parseInt(empty_x))){
		document.getElementById(this.id).className += " movablepiece";
	}
}

function clickCall()
{
	if(document.getElementById('empty') === null){
		alert("Please shuffle the puzzle to Start the game");
	}
	//Get the position of 'empty' div
	var empty_x = document.getElementById('empty').style.left;
	var empty_y = document.getElementById('empty').style.top;
	//alert("x,y "+empty_x+empty_y);
	
	//Get the coordinates of the clicked div
	var l_x = document.getElementById(this.id).style.left; //left
	var t_y = document.getElementById(this.id).style.top;	//top
	
	//alert("empty_x " + empty_x +" empty_y " + empty_y + " l_x " + l_x + " t_y " + t_y);
	
	//Check whether the source exists in left of empty div
	if((parseInt(l_x) == parseInt(parseInt(empty_x) - 100)) && (parseInt(t_y) == parseInt(empty_y))){
		//space exists in left
		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)+1;
		currentDiv = this.id;
		//alert("left!!!"+document.getElementById('empty').value+" id changed to "+currentDiv);
		interchangeCoords('empty', currentDiv);
	}
	
	if((parseInt(l_x) == parseInt(parseInt(empty_x) + 100)) && (parseInt(t_y) == parseInt(empty_y))){
		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)-1;
		currentDiv = this.id;
		interchangeCoords('empty', currentDiv);
	}
	

	if((parseInt(t_y) == parseInt(parseInt(empty_y) - 100)) && (parseInt(l_x) == parseInt(empty_x))){
		//space exists in right
		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)+4;
		currentDiv = this.id;
		//alert("top!!!"+document.getElementById('empty').value+" changed to "+currentDiv);
		interchangeCoords('empty', currentDiv);
	}

	if((parseInt(t_y) == parseInt(parseInt(empty_y) + 100)) && (parseInt(l_x) == parseInt(empty_x))){
		//space exists in right
		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)-4;
		currentDiv = this.id;
		interchangeCoords('empty', currentDiv);
	}
}


function addDiv()
{
	var adiv = document.createElement('div');

	adiv.id = 'empty';
	document.getElementById('puzzlearea').appendChild(adiv);
	document.getElementById('empty').value = "15";
	document.getElementById('empty').style.left = "300px";
	document.getElementById('empty').style.top = "300px";
}


function mouseOut()
{
	this.className = this.className.replace("movablepiece", '');
}

function interchangeCoords(id1, id2)
{
	var empty_x = document.getElementById(id1).style.left;
	var empty_y = document.getElementById(id1).style.top;
	
	var l_x = document.getElementById(id2).style.left; 
	var t_y = document.getElementById(id2).style.top;
	
	document.getElementById(id1).style.left = l_x;
	document.getElementById(id1).style.top = t_y;
	
	document.getElementById(id2).style.left = empty_x;
	document.getElementById(id2).style.top = empty_y;

}