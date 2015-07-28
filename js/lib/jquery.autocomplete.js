(function(factory){
	factory(jQuery);	
})(function($){
	var Autocomplete = function(element, options){
		var me = this;
		this.$el = $(element);
		this.options = $.extend({}, Autocomplete.defaults, options);
		me.$el.on('input',function(e){
			var searchVal = $(e.target).val();
			if(searchVal){
				me.search(searchVal);
			}
		});
		// me.$el.blur(function(e){
		// 	me.$el.closest('.bd-main').siblings('.u-sch').hide();
		// });
		me.$el.closest('.bd-main').siblings('.u-sch, .u-option').on('click','.sch-item',function(e){
			var $target = $(e.target);
			me.options.onSelect.call(me, $target, me.$el);
		});
	};

	/**
	relations的格式：[{“user” :'aaaa',"psw" :'123'}]
	
	*/
	Autocomplete.defaults = {
		relations : [],
		limit : 10,
		ajaxUrl : '',
		isCall : false,
		searchVal : '',
		onSelect : $.noop
	};
	
	Autocomplete.prototype.search = function(searchVal){
		var me = this ;
		var $ul = $('<ul />',{
			'class' : 'u-val'
		});
		var html = "";
		// var reg = eval("/"+search+"/ig");
		if(searchVal){
			var reg = new RegExp(searchVal,'ig');
		}else{
			var reg = /.*/;
		}
		
		// 首先判断是否需要call后台
		if(me.options.ajaxUrl == "" && !me.options.isCall){
			if(me.options.relations.length){
				var result = [];
				for(var i=0, len= me.options.relations.length; i<len ;i++){
					var s = me.options.relations[i].username.match(reg);
					if(s && s.length){
						result.push(me.options.relations[i]);
					}
					
				}
				if(result.length){
					html = $.map(result,function(n,i){
					if(i<me.options.limit){
						return "<li class='sch-item' data-psw = '"+n.userpassword+"'>"+
								n.username+
							"</li>"; 
						}
					});
				}else{
					html = "<li class='no-data'>没有找到用户</li>";
				}

			}else{
				html = "<li class='no-data'>没有找到用户</li>";
			}
		}else{
			if(me.options.ajaxUrl && me.options.isCall){
				$.ajax({
					url : me.options.ajaxUrl,
					type: 'GET',
					data: $.param({searchVal : me.options.searchVal, limit : me.options.limit}),
					dataType:'json',
					success : function(result){
						if(result.length){
							html = $.map(result,function(n,i){
								if(i<me.options.limit){
									return "<li class='sch-item' data-psw = '"+n.userpassword+"'>"+
											n.username+
										"</li>"; 
								}
							});
						}
					}
				});
			}
		}
		$ul.append(html);
		me.$el.closest('.bd-main').siblings('.u-sch').empty().append($ul).show();
	};

	$.fn.aotocomplete = function(options,args){
		return this.each(function(){
			var $this = $(this);
			data = $this.data('autocomplete');
			if(!data){
				$this.data('autocomplete',new Autocomplete(this,options));
			   if(typeof args==='string'){
			     $this.data('autocomplete')[args](options);
			   	}
		}else if(typeof args==='string'){
			data[args](options);
		}
		});
	};

});