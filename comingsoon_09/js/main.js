(function($) {
	"use strict";

	/*==================================================================
    [ Validate ]*/
	var input = $(".validate-input .input100");

	$(".validate-form").on("submit", function() {
		var check = true;

		for (var i = 0; i < input.length; i++) {
			if (validate(input[i]) == false) {
				showValidate(input[i]);
				check = false;
			}
		}

		return check;
	});

	$(".validate-form .input100").each(function() {
		$(this).focus(function() {
			hideValidate(this);
		});
	});

	function validate(input) {
		if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
			if (
				$(input)
					.val()
					.trim()
					.match(
						/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
					) == null
			) {
				return false;
			}
		} else {
			if (
				$(input)
					.val()
					.trim() == ""
			) {
				return false;
			}
		}
	}

	function showValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).addClass("alert-validate");
	}

	function hideValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).removeClass("alert-validate");
	}

	/*==================================================================
    [ Simple slide100 ]*/

	$(".simpleslide100").each(function() {
		var delay = 7000;
		var speed = 1000;
		var itemSlide = $(this).find(".simpleslide100-item");
		var nowSlide = 0;

		$(itemSlide).hide();
		$(itemSlide[nowSlide]).show();
		nowSlide++;
		if (nowSlide >= itemSlide.length) {
			nowSlide = 0;
		}

		setInterval(function() {
			$(itemSlide).fadeOut(speed);
			$(itemSlide[nowSlide]).fadeIn(speed);
			nowSlide++;
			if (nowSlide >= itemSlide.length) {
				nowSlide = 0;
			}
		}, delay);
	});
	$("#signup").click(function() {
		let temp2 = $("#signupResponse").val();
		let temp = $("#kindaForm").html();
		let addn =
			'<p class="subscribeMessage">You have subscribed succesfully!</p>';
		if (!temp.includes(addn)) temp = addn + temp;
		$("#kindaForm").html(temp);
		$("#signupResponse").val(temp2);
		sendInfo(temp2);
	});
})(jQuery);

function sendInfo(_temp) {
	var data = JSON.stringify({
		email_address: { _temp },
		status: "subscribed"
	});

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function() {
		if (this.readyState === 4) {
			console.log(this.responseText);
		}
	});

	xhr.open(
		"POST",
		"https://us7.api.mailchimp.com/3.0/lists/08e2bb3aeb/members"
	);
	xhr.setRequestHeader(
		"authorization",
		"Basic YW55U3RyaW5nOjI3YmU1ZTdiOTM0NjVhNzQwYjAwN2FlNGI4MzNjZmNkLXVzNw=="
	);
	xhr.setRequestHeader("content-type", "application/json");
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.setRequestHeader("postman-token", "20d4bb14-a508-b771-10d8-97fb5399cef1");

	xhr.send(data);
}
