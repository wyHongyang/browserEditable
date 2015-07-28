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
		var url = $(e.target).closest('.g-bd').find('input[type="radio"]:checked').closest('.u-radio').data('content');
		window.open(unescape(url));
	});
	
	render();
})(jQuery);