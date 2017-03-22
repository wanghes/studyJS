var showInput = function(){
	var con = document.querySelector('.con');
	con.classList.add('active');

};

 function testFont(){
	console.log(this.value);
}

window.addEventListener('load', function (e) {
	//alert(112)
    window.applicationCache.addEventListener('updateready', function (e) {
        	
        	

        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            // Browser downloaded a new app cache.
            // Swap it in and reload the page to get the new hotness.
            window.applicationCache.swapCache();
            if (confirm('有新的版本可用. 确定重载么?')) {
                window.location.reload();
            }
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);
}, false);
