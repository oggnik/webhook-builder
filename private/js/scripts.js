var earned_cards = ['From Work', 'From Parents', 'Other'];
var earned_results = [];
var spent_cards = ['Going out to eat', 'Grocery shopping', 'Shopping', 'Bills', 'Other'];
var spent_results = [];

var earned_counter = 0;
var spent_counter = 0;


$(document).ready(function() {

	displayNextCard();
});

function displayNextCard() {
	if (earned_counter < earned_cards.length) {
		if (earned_counter > 0) {
			// Save the last card result
			earned_results[earned_counter - 1] = $('.add_input').val();
		}
		$('.card_view').html(createEarnedCard(earned_cards[earned_counter]));
		earned_counter++;
	} else if (spent_counter < spent_cards.length) {
		if (spent_counter === 0) {
			// Save the last earned card result
			earned_results[earned_counter - 1] = $('.add_input').val();
		} else if (spent_counter > 0) {
			// Save the last spent card result
			spent_results[spent_counter - 1] = $('.subtract_input').val();
		}
		$('.card_view').html(createSpentCard(spent_cards[spent_counter]));
		spent_counter++;
	} else if (spent_counter === spent_cards.length) {
		spent_results[spent_counter - 1] = $('.subtract_input').val();
		spent_counter++;
		$('.card_view').hide("slow");
		displayResults();
	}

	$('.next_button').click(function(e) {
		$('.card_view').animate({"opacity": 0, "margin-right": '+=200'}, 200, function() {
			displayNextCard();
			if (spent_counter <= spent_cards.length) {
				$('.card_view').animate({"opacity": 1, "margin-right": '-=200'}, 0);
			}
		});
	});
}

function displayResults() {
	var earned = 0;
	earned_results.forEach(function(value, index, array) {
		earned += parseFloat(value);
	});
	var spent = 0;
	spent_results.forEach(function(value, index, array) {
		spent += parseFloat(value);
	});
	$('.money_earned').text("Money Earned: $" + earned.toFixed(2));
	$('.money_spent').text("Money Spent: $" + spent.toFixed(2));
	var remaining = earned - spent;
	$('.money_remaining').text("Remaining Balance: $" + remaining.toFixed(2));

	/*
	 * Load the charts after the div is done showing.  This prevents issues of the charts being the wrong size.
	 */
	$('.result_view').show("slow", function() {
		earned_floats = earned_results.map(function(value, index, array) {
			return parseFloat(value);
		});

		$('.earned_chart').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Money Earned'
			},
			xAxis: {
				categories: earned_cards,
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Money Earned ($)'
				}
			},
			series: [
				{
					name: 'Amount',
					data: earned_floats
				}
			],
			legend: {
				enabled: false
			}
		});

		spent_floats = spent_results.map(function(value, index, array) {
			return parseFloat(value);
		});

		$('.spent_chart').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Money Spent'
			},
			xAxis: {
				categories: spent_cards,
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Money Spent ($)'
				}
			},
			series: [
				{
					name: 'Amount',
					data: spent_floats
				}
			],
			legend: {
				enabled: false
			}
		});
	});
}

function createEarnedCard(label) {
	return '<div class="earned_card_header">' + 
				'<h1>Money Management - Money Earned</h1>' +
			'</div>' +
			'<div class="card_input">' +
				'<div class="input_label">' + label + '</div>' +
				'<input class="add_input" type="text" value="0.00"></input>' +
			'</div>' +
			'<div class="next_button">' +
				'Next' +
			'</div>';
}

function createSpentCard(label) {
	return '<div class="spent_card_header">' + 
				'<h1>Money Management - Money Spent</h1>' +
			'</div>' +
			'<div class="card_input">' +
				'<div class="input_label">' + label + '</div>' +
				'<input class="subtract_input" type="text" value="0.00"></input>' +
			'</div>' +
			'<div class="next_button">' +
				'Next' +
			'</div>';
}