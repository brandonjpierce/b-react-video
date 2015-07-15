export default function requestInterval(fn, delay) {
  let start = new Date().getTime();
  let handle = {};
		
  function loop() {
    handle.value = window.requestAnimationFrame(loop);
    
		let current = new Date().getTime();
		let delta = current - start;
			
		if (delta >= delay) {
			fn.call();
			start = new Date().getTime();
		}
	};
	
	handle.value = window.requestAnimationFrame(loop);
  
	return handle;
}
