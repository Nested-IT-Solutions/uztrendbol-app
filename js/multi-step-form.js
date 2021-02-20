// JavaScript Document
// Author: Paul Shopi
// Published: 30th March 2014
// License: There are no warantees/ guarantees given by the author for using this script
//			The Author of this script is in no circumstances liable for any situation that may arise from using this script
// 			and therefore the liability falls on the person who has taken it upon himself to use this script

	$(document).ajaxStart(function(){
		$('#preloader').delay(100).fadeIn(350);
		$('#preloader').removeClass('none');
	});

	$(document).ajaxStop(function(){
		$('#preloader').fadeOut(300);
		$('#preloader').addClass('none');
	});
	

	multi_step_form = function(defaults)
	{
		total_sections = 0; // Number of sections including the final step
		complete_sections = 0; // Initialize the sections that are completed
		section_container = defaults.container; // id or class identifier of the sections' container
		section = defaults.section; // id or class identifier of the sections
		section_title = ".section-title" // id or class identifier of the section title
		//submit_form = '#form'; // id or class identifier of the form
		//submit_action = ''; // file name to which the form data will be posted
		submit_button = '<div class="submit-data">Submit</div>'; // Initialize the submit button
		submit_class = "submit-data";
		post_type_class = "post-type";
		
		back_button = "back"; // id or class identifier of the back button
		next_button = "next"; // id or class identifier of the next button
		error = 0; // Initialize error handler
		final_section = ".final";
		
		
		// count the number of sections in the form
		total_sections = $(section_container+' '+section).length;

		// set the title of the section
		$(section_container+" "+section_title).html($(section).attr('section'));
		
		// load the contents of the previous section
		$(section_container+" ."+back_button).click(function() {
			// reset the errors
			error=0;
			
			// verify and load the previous section
			multiStepForm(back_button);
		});
		
		// load the contents of the next section
		$(section_container+" ."+next_button).click(function() {
			// reset the errors
			error=0;
			
			// verify and load the next section
			multiStepForm(next_button);
		});
		
		// Submit the contents of the form via Ajax
		$(section_container).on("click", "."+submit_class,function() {
			//post_data($(post_type_class).html());
			//alert($(".post-type").val());
			post_data(section_container, $(".post-type").val(), fields);
		});	
		
		// validate the input control's data 
		$(section+' input, '+section+' select, '+section+' textarea').focusout(function() {
			Validate_Section_e($(this));
		});

		
	};
	
	var table = "your_table";
	var values = [];
	var fields = {
		//id        :  field name
		'first_name' : 'firstName',
		'last_name' : 'lastName',
		'gender' : 'gender',
		'mobile'  : 'mobile',
		'email' : 'email',
		'username'  : 'username',
		'password'  : 'password',
		'address'  : 'address',
		'shipping'  : 'shipping',
		'permit'  : 'permit'
	};
	
	var email_to = "youremail@yourdomain.com";

	// function to verify and load the section
	function multiStepForm(button){
		var sectionObj = $(section);
		current = sectionObj.filter('.current'),
		currentIndex = sectionObj.index(current);
		complete_sections = currentIndex+1;
		
		// load the next form section and hide the current one
		$(section).each(function(i){
			// reset the value of the submit button

			// check if the back button and current index is valid
			// if the current section is not the first,
			// if not remove from display
			if(button==back_button && currentIndex==i && currentIndex>0){
				if(currentIndex<total_sections){
					$(section_container+" .submit").addClass("next");
					$(section_container+" .submit").html("Next");
					$(section_container+" .submit").removeClass("submit");
				}
				$(this).slideUp();
				$(this).removeClass('current');
			}
			
			// check if the back button and current index is valid
			// if the section to be loaded is not the first, 
			// if not load into display
			if(button==back_button && currentIndex-1==i && currentIndex>0){
				$(section_container+" "+section_title).html($(this).attr('section'));
				$(this).slideDown();
				$(this).addClass('current');
			}
			
			// check if the next button and current index is valid
			// if the current section is not the last,
			// if not verify the form data, 
			// if form is completed without errors, remove from display and set the progress made so far
			if(button==next_button && currentIndex==i && currentIndex<total_sections-1){
				// check for any errors found in the section
				Validate_Section('.current ');
				if(error>0){
					return false; // exit the process 
				}
				ProgressBar();
				$(this).slideUp();
				$(this).removeClass('current');
			}
			
			// check if the back button and current index is valid
			// if the section to be loaded is not the last, 
			// if not load into display,
			// if yes load the final details and summary of data entered,
			// initialize the submit button and set the progress bar to 100%
			if(button==next_button && currentIndex+1==i && currentIndex<total_sections){
				LoadFinalSection(final_section);
				$(section_container+" "+section_title).html($(this).attr('section'));
				$(this).slideDown();
				$(this).addClass('current');
			}
			
			
		});

	}
	
	// Validate the input values in the form section
	function Validate_Section(sectionObject){
		// loop through the input controls in the current section
		$(sectionObject+' input, '+sectionObject+' select, '+sectionObject+' textarea, '+sectionObject+' input:checkbox').each(
			function(index){  
				// create an object of the current input control
				var input = $(this);

				// set the value of the data attribute
				data_format = input.attr('data');
				// set the value of the input
				val = input.val();
				
				// check for any scripts or tags in string from input
				// this is checking for any XSS attacks
				if(IsContainsTags(val)==true){
					input.addClass('invalid');
					error++; // increase the error number by 1
				}else{
					val = val.replace(/(<([^>]+)>)/ig,"");
					// check which data format is the input by checking its 'data' attribute
					// if normal text validate the data
					if(data_format == 'required'){
						if(val=='' || val.length==0 || IsContainsTags(val)==true){
							input.addClass('invalid');
							error++; // increase the error number by 1
						}else{
							input.removeClass('invalid');
							input.addClass('valid');
						}
						if(input.is(":checkbox")){
							if(input.is(":checked")){
								input.removeClass('invalid');
								input.addClass('valid');
							}else{
								input.removeClass('valid');
								input.addClass('invalid');
								error++; // increase the error number by 1
								$(this).effect("shake", { times:3 }, 50);
							}
						}
						if(input.is(":radio")){
							var currentRadioName = "";
							var alreadyChecked = false;
								currentRadioName = input.attr('name');
							if(input.is(":checked")){
								input.removeClass('invalid');
								input.addClass('valid');
							}
							$("input[name=" + currentRadioName + "]").each(function(){
								if($(this).is(":checked")){
									alreadyChecked = true;
								}
							});
							if(alreadyChecked == true){
								input.removeClass('invalid');
								input.addClass('valid');	
							}else{
								input.removeClass('valid');
								input.addClass('invalid');
								error++; // increase the error number by 1
								$(this).effect("shake", { times:3 }, 50);
							}
						}
					}
					// if email format validate the email
					if(data_format == 'email'){
						//alert(IsEmailValid(val));
						if(IsEmailValid(val)==false || val=='' || val.length==0 || IsContainsTags(val)==true){
							input.addClass('invalid');
							error++; // increase the error number by 1
							$(this).effect("shake", { times:3 }, 50);
						}else{
							input.removeClass('invalid');
							input.addClass('valid');
						}
					}
				}
			}
		);
	}

	// Validate the input values in the form section
	function Validate_Section_e(sectionObject){
		// loop through the input controls in the current section
		//$(sectionObject+' input, '+sectionObject+' select, '+sectionObject+' textarea').each(
			//function(index){  
				// create an object of the current input control
				var input = sectionObject;

				// set the value of the data attribute
				data_format = input.attr('data');
				// set the value of the input
				val = input.val();
				
				// check for any scripts or tags in string from input
				// this is checking for any XSS attacks
				if(IsContainsTags(val)==true){
					input.addClass('invalid');
					error++; // increase the error number by 1
				}else{
					val = val.replace(/(<([^>]+)>)/ig,"");
					
					// check which data format is the input by checking its 'data' attribute
					// if normal text validate the data
					if(data_format == 'required'){
						if(val=='' || val.length==0 || IsContainsTags(val)==true){
							input.addClass('invalid');
							error++; // increase the error number by 1
						}else{
							input.removeClass('invalid');
							input.addClass('valid');
						}
						if(input.is(":checkbox")){
							if(input.is(":checked")){
								input.removeClass('invalid');
								input.addClass('valid');
							}else{
								input.removeClass('valid');
								input.addClass('invalid');
								error++; // increase the error number by 1
								$(this).effect("shake", { times:3 }, 50);
							}
						}
						if(input.is(":radio")){
							var currentRadioName = "";
							var alreadyChecked = false;
								currentRadioName = input.attr('name');
							if(input.is(":checked")){
								input.removeClass('invalid');
								input.addClass('valid');
							}
							$("input[name=" + currentRadioName + "]").each(function(){
								if($(this).is(":checked")){
									alreadyChecked = true;
								}
							});
							if(alreadyChecked == true){
								input.removeClass('invalid');
								input.addClass('valid');	
							}else{
								input.removeClass('valid');
								input.addClass('invalid');
								error++; // increase the error number by 1
								$(this).effect("shake", { times:3 }, 50);
							}
						}
					}
					// if email format validate the email
					if(data_format == 'email'){
						//alert(IsEmailValid(val));
						if(IsEmailValid(val)==false || val=='' || val.length==0 || IsContainsTags(val)==true){
							input.addClass('invalid');
							$(this).effect("shake", { times:3 }, 50);
							error++; // increase the error number by 1
						}else{
							input.removeClass('invalid');
							input.addClass('valid');
						}
					}
				}
			//}
		//);
	}

	function ProgressBar(){
		progrssBarWidth = $('.progress-bar').width(); // get the current width of the progress bar
		// check to see if all sections have been completed successfully
		// if yes set the progress bar to 100%
		// else compute the correct percentage completed so far
		if(complete_sections==total_sections-1){
			progressWidth = 100;
		}else{
			progressWidth = Math.ceil((complete_sections/total_sections)*100); 
		}
		$('.progress').css('width',progressWidth+'%'); // set the width of the progress completed so far
		$('.progress-text').html(progressWidth+'% Complete'); // set the percentage completed so far
	}

	function LoadFinalSection(sectionObject){
		if(complete_sections==total_sections-1){
			$(sectionObject).addClass('current');

			var wrapper_width = getStyleRuleValue('width', '.email-format-wrapper');
			var wrapper_bgcolor = getStyleRuleValue('background', '.email-format-wrapper');
			var wrapper_margin = getStyleRuleValue('margin', '.email-format-wrapper');
			var wrapper_padding = getStyleRuleValue('padding', '.email-format-wrapper');
			var body_width = getStyleRuleValue('width', '.email-format-body');
			var body_bgcolor = getStyleRuleValue('background', '.email-format-body');
			var body_margin = getStyleRuleValue('margin', '.email-format-body');
			var body_padding = getStyleRuleValue('padding', '.email-format-body');
			var body_border = getStyleRuleValue('border', '.email-format-body');
			var body_font = getStyleRuleValue('font', '.email-format-body');
			var body_color = getStyleRuleValue('color', '.email-format-body');
			var color = getStyleRuleValue('color', '.email-format');
			var font = getStyleRuleValue('font', '.email-format');
			var font_title = getStyleRuleValue('font', '.email-format-title');

			confirmed_values = "";
			confirmed_email_values = "";
			confirmed_email_values += "<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"width:"+wrapper_width+";background:"+wrapper_bgcolor+";margin:"+wrapper_margin+";padding:"+wrapper_padding+";\"><tr><td>";
			confirmed_email_values += "<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"width:"+body_width+";background:"+body_bgcolor+";margin:"+body_margin+";padding:"+body_padding+";border:"+body_border+";font:"+body_font+";color:"+body_color+";\"> ";
			// load the next form section and hide the current one
			$(section+':not('+sectionObject+')').each(function(){
				sectionobj = $(this);
				confirmed_values += "<h2>"+sectionobj.attr('section')+"</h2>";
				confirmed_email_values += "<tr><th style=\"color:"+color+";font:"+font_title+";\">"+sectionobj.attr('section')+"</th></tr><tr><td>&nbsp;</td></tr>";
				confirmed_input_values = "";
				confirmed_input_email_values = "";
				$(sectionobj).find(' input, select, textarea').each(
					function(index){  
						// create an object for the current input control
						var input = $(this);
						// set the value of the data attribute
						caption = input.attr('placeholder');
						val = input.val();
						if(input.is(":checkbox")){
							if(input.is(":checked")){
								val = input.val();
							}else{
								caption = "";
								val = "";
							}
						}

						if(input.is(":radio")){
							if(input.is(":checked")){
								val = input.val();
							}else{
								caption = "";
								val = "";
							}
						}

						// set the value of the input
						
						val = escapeHtml(val);
						post_values(input.attr('name'), val);

						val = val.replace(/(<([^>]+)>)/ig,"");
						// check if the input control is of password type
						// if yes dont show the value
						// else show the value
						if(input.attr('type')=='password'){
							confirmed_input_values += "<p><strong>Your Chosen Password:</strong> ******</p>";
							confirmed_email_values += "<tr><td><strong style=\"color:"+color+";font:"+font+";\">Your Chosen Password:</strong> ******</td></tr>";
						}else{
							if(caption != "" && caption != undefined){
								confirmed_input_values += "<p><strong>" + caption + ":</strong> " + val+"</p>";
								confirmed_email_values += "<tr><td><strong style=\"color:"+color+";font:"+font+";\">" + caption + ":</strong> <em style=\"font:"+body_font+";color:"+body_color+";\">" + val+"</em></td></tr>";
							}
						}
					}
				);
				confirmed_values += confirmed_input_values+'<p class="line">&nbsp;</p>';
				confirmed_email_values += confirmed_input_email_values+'<tr><td style=\"border-bottom:1px solid '+color+';margin:10px 0px;\">&nbsp;</td></tr><tr><td>&nbsp;</td></tr>';
			});
			// display the data entered in the various sections 
			confirmed_email_values += "</table></td></tr></table>";
			$(sectionObject).html(confirmed_values);
			$(section_container+" ."+next_button).html(submit_button);
			$(section_container+" ."+next_button).addClass("submit");
			$(section_container+" ."+next_button).removeClass("next");
		}
	}
	
	// function to post data
	function post_data(section_container, type, fields){
		if(type == "Database"){
			$.ajax({
			cache: false,
			type: 'POST',
			url: '/post.asp',
			data: {post_type: type, data_table: table, data_fields: fields, data_values: values},
			success: function(data) {
				if(data){
					$(section_container).html(data);
				}
			}
			});
		}
		
		if(type == "Email" || type == "Both" ){
			$.ajax({
			cache: false,
			type: 'POST',
			url: '/post.asp',
			data: {post_type: type, data_table: table, data_fields: fields, data_values: values, data_email_to: email_to, data_email_body: confirmed_email_values},
			success: function(data) {
				if(data){
					$(section_container).html(data);
				}
			}
			});
		}
	}
	
	function post_values(field_input, field_value){
		type = $(".post-type").val();
		if(type == "Database" || type == "Both"){
			if(fields != ''){
				$.each( fields, function( key, value ) {
					if(field_input === key){
						values.push(field_value);
					}
				});
			}
		}
		
		if(type == "Email" ){
			
		}
		//return values;
	}

	// function to check if email is in the valid format
	function IsEmailValid(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  
	  return regex.test(email);
	}
	
	// build array of characters to replace/escape
	var entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': '&quot;',
		"'": '&#39;',
		"/": '&#x2F;'
    };

	// strip and escape any tags or invalid characters from string
	function escapeHtml(string) {
		return String(string).replace(/[&<>"'\/]/g, function (s) {
		  return entityMap[s];
		});
	}
	
	// check if string contains any tags
	function IsContainsTags(string){
		var expRe = /(<([^>]+)>)/ig;
		return expRe.test(string);
	}
	

	function css(a) {
		var sheets = document.styleSheets, o = {};
		for (var i in sheets) {
			var rules = sheets[i].rules || sheets[i].cssRules;
			for (var r in rules) {
				if (a.is(rules[r].selectorText)) {
					o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
				}
			}
		}
		return o;
	}

	function css2json(css) {
		var s = {};
		if (!css) return s;
		if (css instanceof CSSStyleDeclaration) {
			for (var i = 0; i < css.length; i += 1) {
				s[css[i]] = css.getPropertyValue(css[i]);
			}
			//for (var i in css) {
//				if ((css[i]).toLowerCase) {
//					s[(css[i]).toLowerCase()] = (css[css[i]]);
//				}
//			}
		} else if (typeof css == "string") {
			css = css.split("; ");
			for (var i in css) {
				var l = css[i].split(": ");
				s[l[0].toLowerCase()] = (l[1]);
			}
		}
		return s;
	}

	function getStyleRuleValue(style, selector, sheet) {
		var sheets = typeof sheet !== 'undefined' ? [sheet] : document.styleSheets;
		for (var i = 0, l = sheets.length; i < l; i++) {
			var sheet = sheets[i];
			if( !sheet.cssRules ) { continue; }
			for (var j = 0, k = sheet.cssRules.length; j < k; j++) {
				var rule = sheet.cssRules[j];
				if (rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) {
				//if (rule.selectorText.split(',').indexOf(selector) !== -1) {
					return rule.style[style];
				}
			}
		}
		return null;
	}