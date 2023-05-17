$(document).ready(function () {
	setTiles();

	function setTiles() {
		var childDivs = $('#puzzlearea div');
		var n = 0;
		var id = 0;

		$('#shufflebutton').click(shufflePuzzle);

		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				childDivs.eq(n).attr('id', id);
				id++;
				childDivs.eq(n).mouseover(hoverCall);
				childDivs.eq(n).mouseout(mouseOut);
				childDivs.eq(n).click(clickCall);

				if (i === parseInt('3') && j === parseInt('3')) {
					break;
				}

				childDivs.eq(n).addClass('puzzlepiece');

				if (i == 0 || j == 0) {
					if (i == 0 && j == 0) {
						childDivs.eq(n).css({ top: '0px', left: '0px', backgroundPosition: '0px 0px' });
						n++;
						continue;
					} else if (i == 0) {
						childDivs.eq(n).css({ left: parseInt(j) * 100 + 'px', top: '0px', backgroundPosition: parseInt(-j) * 100 + 'px 0px' });
					} else if (j == 0) {
						childDivs.eq(n).css({ left: '0px', top: parseInt(i) * 100 + 'px', backgroundPosition: '0px ' + parseInt(-i) * 100 + 'px' });
					}
				} else {
					childDivs.eq(n).css({ top: parseInt(i) * 100 + 'px', left: parseInt(j) * 100 + 'px', backgroundPosition: parseInt(-j) * 100 + 'px ' + parseInt(-i) * 100 + 'px' });
				}

				n++;
			}
		}
	}

	function shufflePuzzle() {
		if ($('#empty').length === 0) {
			addDiv();
		}
		var index = 0;
		var last_num = 0;
		var count = 0;

		while (count < 100) {

			var neighs = [];
			var empty_div_curr_loc = $('#empty').val();

			var leftid = parseInt(empty_div_curr_loc) - 1;
			var rightid = parseInt(empty_div_curr_loc) + 1;
			var topid = parseInt(empty_div_curr_loc) - 4;
			var downid = parseInt(empty_div_curr_loc) + 4;

			var left_neigh;
			var right_neigh;
			var top_neigh;
			var down_neigh;

			if (leftid >= 0 && leftid <= 15) {
				left_neigh = $('#' + leftid).css('left');
			}
			if (rightid >= 0 && rightid <= 15) {
				right_neigh = $('#' + rightid).css('left');
			}
			if (topid >= 0 && topid <= 15) {
				top_neigh = $('#' + topid).css('top');
			}
			if (downid >= 0 && downid <= 15) {
				down_neigh = $('#' + downid).css('top');
			}

			if (parseInt(empty_div_curr_loc) == 4 || parseInt(empty_div_curr_loc) == 8 || parseInt(empty_div_curr_loc) == 12 || parseInt(empty_div_curr_loc) == 0) {
				left_neigh = undefined;
			}
			if (parseInt(empty_div_curr_loc) == 3 || parseInt(empty_div_curr_loc) == 7 || parseInt(empty_div_curr_loc) == 11 || parseInt(empty_div_curr_loc) == 15) {
				right_neigh = undefined;
			}
			if (parseInt(empty_div_curr_loc) == 0 || parseInt(empty_div_curr_loc) == 1 || parseInt(empty_div_curr_loc) == 2 || parseInt(empty_div_curr_loc) == 3) {
				top_neigh = undefined;
			}
			if (parseInt(empty_div_curr_loc) == 12 || parseInt(empty_div_curr_loc) == 13 || parseInt(empty_div_curr_loc) == 14 || parseInt(empty_div_curr_loc) == 15) {
				down_neigh = undefined;
			}

			if (left_neigh) {
				neighs.push(leftid);
			}

			if (right_neigh) {
				neighs.push(rightid);
			}

			if (down_neigh) {
				neighs.push(downid);
			}

			if (top_neigh) {
				neighs.push(topid);
			}

			index = newRandomGen(neighs.length, last_num);

			var emp_div_id = $('#empty').val();
			var cur_div = neighs[parseInt(index) - 1];
			$('#empty').val(cur_div);
			$('#' + cur_div).attr('id', emp_div_id);

			interchangeCoords('empty', emp_div_id);

			neighs.length = 0;
			last_num = index;
			count++;
		}
	}

	function newRandomGen(maxi, lastnum) {
		var randomnumber = Math.floor(Math.random() * parseInt(maxi)) + 1;

		while (true) {
			randomnumber = Math.floor(Math.random() * parseInt(maxi)) + 1;
			if (lastnum != randomnumber) {
				break;
			}
		}
		return randomnumber;
	}

	function hoverCall() {
		var empty_x = $('#empty').css('left');
		var empty_y = $('#empty').css('top');

		var l_x = $('#' + this.id).css('left');
		var t_y = $('#' + this.id).css('top');

		if (parseInt(l_x) == parseInt(parseInt(empty_x) - 100) && parseInt(t_y) == parseInt(empty_y)) {
			$('#' + this.id).addClass('movablepiece');
		}
		if (parseInt(l_x) == parseInt(parseInt(empty_x) + 100) && parseInt(t_y) == parseInt(empty_y)) {
			$('#' + this.id).addClass('movablepiece');
		}
		if (parseInt(t_y) == parseInt(parseInt(empty_y) - 100) && parseInt(l_x) == parseInt(empty_x)) {
			$('#' + this.id).addClass('movablepiece');
		}
		if (parseInt(t_y) == parseInt(parseInt(empty_y) + 100) && parseInt(l_x) == parseInt(empty_x)) {
			$('#' + this.id).addClass('movablepiece');
		}
	}

	function clickCall() {
		if ($('#empty').length === 0) {
			alert('Please shuffle the puzzle to Start the game');
		}

		var empty_x = $('#empty').css('left');
		var empty_y = $('#empty').css('top');

		var l_x = $('#' + this.id).css('left');
		var t_y = $('#' + this.id).css('top');

		if (parseInt(l_x) == parseInt(parseInt(empty_x) - 100) && parseInt(t_y) == parseInt(empty_y)) {
			$('#empty').val(this.id);
			this.id = parseInt(this.id) + 1;
			currentDiv = this.id;
			interchangeCoords('empty', currentDiv);
		}

		if (parseInt(l_x) == parseInt(parseInt(empty_x) + 100) && parseInt(t_y) == parseInt(empty_y)) {
			$('#empty').val(this.id);
			this.id = parseInt(this.id) - 1;
			currentDiv = this.id;
			interchangeCoords('empty', currentDiv);
		}


		if (parseInt(t_y) == parseInt(parseInt(empty_y) - 100) && parseInt(l_x) == parseInt(empty_x)) {
			$('#empty').val(this.id);
			this.id = parseInt(this.id) + 4;
			currentDiv = this.id;
			interchangeCoords('empty', currentDiv);
		}

		if (parseInt(t_y) == parseInt(parseInt(empty_y) + 100) && parseInt(l_x) == parseInt(empty_x)) {
			$('#empty').val(this.id);
			this.id = parseInt(this.id) - 4;
			currentDiv = this.id;
			interchangeCoords('empty', currentDiv);
		}
	}

	function addDiv() {
		var adiv = $('<div></div>');

		adiv.attr('id', 'empty');
		$('#puzzlearea').append(adiv);
		$('#empty').val('15');
		$('#empty').css('left', '300px');
		$('#empty').css('top', '300px');
	}

	function mouseOut() {
		$(this).removeClass('movablepiece');
	}

	function interchangeCoords(id1, id2) {
		var empty_x = $('#' + id1).css('left');
		var empty_y = $('#' + id1).css('top');

		var l_x = $('#' + id2).css('left');
		var t_y = $('#' + id2).css('top');

		$('#' + id1).css('left', l_x);
		$('#' + id1).css('top', t_y);

		$('#' + id2).css('left', empty_x);
		$('#' + id2).css('top', empty_y);
	}
});
