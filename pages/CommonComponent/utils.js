module.export={
    /**
	 * @description 判断是否为空
	 * @param{String} string值
	 */
	verNull:function(obj) {
        debugger
		var b = false;
		if(obj != null && obj != '' && obj != 'undefined' && obj != 'null') {
			b = true;
		}
		return b;
	},
}