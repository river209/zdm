$(function() {
	console.log(chrome);

	function getItem(date, isinner) {

		$.ajax({
			url: 'https://www.smzdm.com/jingxuan/json_more',
			method: 'GET',
			dataType: 'json',
			data: {
				filter: 's0f0t0b0d0r0p0',
				timesort: date
			},
			success: function(data) {
				var lis = [];
				if (data.article_list.length > 0) {
					$.each(data.article_list, function(i, item) {
						var str = '<li article_id = "' + item.article_id + '" timeshor = "' + item.article_timesort + '">' +
							'<div class="left">' +
							'<img src="' + item.article_pic_url + '" alt="" />' +
							'</div>' +
							'<div class="right">' +
							'<h2><a href="' + item.article_url + '">' + item.article_title + '</a><span>' + item.article_price + '</span></h2>' +
							'<p></p>' +
							'<p><span>值：' + item.article_worthy + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不值：' + item.article_unworthy + '</p>' +
							'<div>来源：' + item.article_referrals + '（' + item.article_date + '）</div>' +
							'</div>' +
							'</li>';
						lis.push(str);
					})
					if (isinner) {
						$('#itemUl').html(lis.join(''))
					} else {
						$('#itemUl').append(lis.join(''))
					}
					$('#nextPage').attr('data-time', data.article_list[data.article_list.length - 1].article_timesort).text("下一页").show();
				}
			}
		})

	}
	$('#nextPage').click(function(event) {
		event.preventDefault();
		$(this).text("正在读取数据...")
		getItem($(this).attr('data-time'), false);
	})
	getItem('', true);
	$('#itemUl').on('click', 'a', function(e) {
		e.preventDefault();
		// console.log($(this).attr('href'));
		chrome.tabs.create({
			url: $(this).attr('href'),
			active: !1
		}, function() {

		});

	})
});