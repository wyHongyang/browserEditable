(function($){
	var $list = $('.m-list');
	//init func
	function render(){
		$.getJSON('../json/data.json',function(data){
			var html = $.map(data.data,function(n,i){
				return '<div data-content="'+n.content+'" class="u-radio"><label><input type="radio" name="type" value="'+n.type+'"/><span>'+n.type+'</span></label></div>';
			}).join('');
			$list.empty().append(html);
		});
	}

	$('.btn-primary').on('click',function(e){
		var baseurl = $(e.target).closest('.g-bd').find('input[type="radio"]:checked').closest('.u-radio').data('content');
//		window.open(unescape(baseurl));
		chrome.tabs.create({
			url:unescape(baseurl),
			selected:true,
		},function(tab){
			var _tabID = tab.id;
			chrome.tabs.onUpdated.addListener(function(_tabID , info) {
			    if (info.status == "complete") {
					chrome.browserAction.onClicked.addListener(function(tab) {  
						chrome.tabs.executeScript(tab.id, {file: 'js/lib/jquery-1.11.3.min.js'});  
						chrome.tabs.executeScript(tab.id, {file: 'js/content.js'});  
					});  
			    }
			});
		});
	});
	
	render();
})(jQuery);