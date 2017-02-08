$( document ).ready(function() {

	//CLICKING ON FORM ELEMENTS FOCUSES TO INPUT FIELD
	$('.trans-form').on('click','#sendFocus',function(){
		$('#setAmount').focus();
	});
	$('.trans-form').on('click','#getFocus',function(){
		$('#getAmount').focus();
	});
	//SETTING UP RATE FOR CONVERSION
	var exchangeRate = 1.4;
	$('#rate').text(exchangeRate);

	//CHANGING RECEIVED FIELD VALUE BASED ON INPUT - DEFAULT EUR in USD
	$('.trans-send-container').on('keyup','#setAmount',function(){
		var enteredAmount = $('#setAmount').val();
		var conversed = enteredAmount * exchangeRate;
		var savedAmount = (conversed * 0.1).toFixed(2);
		$('#getAmount').val(conversed.toFixed(2));
		//UPDATING SIDEBAR WITH VALUES
		$('#rightSendingAmount').text(enteredAmount);
		var receivingAmount = $('#getAmount').val();
		$('#rightReceivingAmount').text(receivingAmount);
		$('#saved-amount').text(savedAmount);
	});
	//CONVERSION IN CASE THAT USER ENTERS RECEIVING AMOUNT FIRST
	$('.trans-gets-container').on('keyup','#getAmount',function(){
		var receivingAmountInput = $('#getAmount').val();
		$('#rightReceivingAmount').text(receivingAmountInput);
		var counterInputValue = receivingAmountInput / exchangeRate;
		//UPDATING SIDEBAR WITH VALUES
		$('#rightSendingAmount').text(counterInputValue.toFixed(2));
		$('#setAmount').val(counterInputValue.toFixed(2));
	});
	//END UPDATING SIDEBAR WITH VALUES

	//ALLOWING ONLY NUMBERS ON INPUT FIELDS
	$('[id^=number]').keypress(validateNumber);
	$('[id=getAmount]').keypress(validateNumber);
	$('[id=setAmount]').keypress(validateNumber);
	function validateNumber(event) {
	    var key = window.event ? event.keyCode : event.which;
	    if (event.keyCode === 8 || event.keyCode === 46) {
	        return true;
	    } else if ( key < 48 || key > 57 ) {
	        return false;
	    } else {
	    	return true;
	    }
	};
	//END ALLOWING ONLY NUMBERS ON INPUT FIELDS

	//DELIVERY DATE CALCULATION - for example after 2 days
	var monthNames = new Array("January", "February", "March", 
	"April", "May", "June", "July", "August", "September", 
	"October", "November", "December");
	var d = new Date();
	var currentDate = d.getDate();
	var currentMonth = d.getMonth();
	var currentYear = d.getFullYear();
	var monthName = monthNames[currentMonth] ;
	var deliveryDate = currentDate+2;
	$('#delivery-date-right').text(deliveryDate+'th '+monthName);

	var gbpSign = "£";
	var cadSign = "$";
	var usdSign = "$";
	var eurSign = "€";
	//CHANGING COUNTRY FLAGS ON SENDING INPUT
	$('.inputCurrencySelect').on('change',function(){
		var country = $(this).find(':selected').data('countryid');
		if(country == "gbp"){
			$('.inputCurrencySelect').css('background','url(img/gbp-flag.png) top 14px left 14px no-repeat');
			$('.inputCurrencySelect').parent().parent().find('.input-currency-sign').html(gbpSign);
			$('.inputCurrencySelect').parent().parent().parent().parent().parent().parent().find('.sidebar-input-sign').html(gbpSign);
		} else if(country == "cad"){
			$('.inputCurrencySelect').css('background','url(img/cad-flag.png) top 14px left 14px no-repeat');
			$('.inputCurrencySelect').parent().parent().find('.input-currency-sign').html(cadSign);
			$('.inputCurrencySelect').parent().parent().parent().parent().parent().parent().find('.sidebar-input-sign').html(cadSign);
		} else if(country == "usd"){
			$('.inputCurrencySelect').css('background','url(img/usa-flag.png) top 14px left 14px no-repeat');
			$('.inputCurrencySelect').parent().parent().find('.input-currency-sign').html(usdSign);
			$('.inputCurrencySelect').parent().parent().parent().parent().parent().parent().find('.sidebar-input-sign').html(usdSign);
		} else {
			$('.inputCurrencySelect').css('background','url(img/eur-flag.png) top 14px left 14px no-repeat');
			$('.inputCurrencySelect').parent().parent().find('.input-currency-sign').html(eurSign);
			$('.inputCurrencySelect').parent().parent().parent().parent().parent().parent().find('.sidebar-input-sign').html(eurSign);
		}
	});
	//END CHANGING COUNTRY FLAGS ON SENDING INPUT

	//CHANGING COUNTRY FLAGS ON RECEIVER FIELD
	$('.outputCurrencySelect').on('change',function(){
		var country = $(this).find(':selected').data('countryid');
		if(country == "gbp"){
			$('.outputCurrencySelect').css('background','url(img/gbp-flag.png) top 14px left 14px no-repeat');
			$('.outputCurrencySelect').parent().parent().find('.output-currency-sign').html(gbpSign);
			$('#sidebar-output-sign').html(gbpSign);
			$('#sidebar-output-sign-fee').html(gbpSign);
			$('#sidebar-output-sign-last').html(gbpSign);
		} else if(country == "cad"){
			$('.outputCurrencySelect').css('background','url(img/cad-flag.png) top 14px left 14px no-repeat');
			$('.outputCurrencySelect').parent().parent().find('.output-currency-sign').html(cadSign);
			$('#sidebar-output-sign').html(cadSign);
			$('#sidebar-output-sign-fee').html(cadSign);
			$('#sidebar-output-sign-last').html(cadSign);
		} else if(country == "usd"){
			$('.outputCurrencySelect').css('background','url(img/usa-flag.png) top 14px left 14px no-repeat');
			$('.outputCurrencySelect').parent().parent().find('.output-currency-sign').html(usdSign);
			$('#sidebar-output-sign').html(usdSign);
			$('#sidebar-output-sign-fee').html(usdSign);
			$('#sidebar-output-sign-last').html(usdSign);
		} else {
			$('.outputCurrencySelect').css('background','url(img/eur-flag.png) top 14px left 14px no-repeat');
			$('.outputCurrencySelect').parent().parent().find('.output-currency-sign').html(eurSign);
			$('#sidebar-output-sign').html(eurSign);
			$('#sidebar-output-sign-fee').html(eurSign);
			$('#sidebar-output-sign-last').html(eurSign);
		}
	});
	//END CHANGING COUNTRY FLAGS ON RECEIVER FIELD

	//MODAL
	$(function() {
	    $('[data-popup-open]').on('click', function(e)  {
	        var targeted_popup_class = jQuery(this).attr('data-popup-open');
	        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
	        e.preventDefault();
	    });
	    $('[data-popup-close]').on('click', function(e)  {
	        var targeted_popup_class = jQuery(this).attr('data-popup-close');
	        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
	        e.preventDefault();
	    });
	});
	//END MODAL

	//AUTOMATICALLY SWITCHING TO NEXT INPUT FOR VALIDATION SMS CODE
	$('[id^=number]').keyup(function (e) {
	    $(this).next().focus();
	 });

	//Changing button style after last input field
	$('#number6').keyup(function()
	{
	        $('.verify-button').addClass('verify-if-entered');
	});

	//Possibility to hide details window on mobile view and rather to put it after clicking next button after validation
	/*if ($(window).width() < 767) {
		$('.main-right-container').hide();
	}*/
});