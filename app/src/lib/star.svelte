<script>
    export let filled, title, num;
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function changeRating() {
		dispatch('changeRating', {
			to: num
		});
	}
</script>

<div on:click = {changeRating}>
    <span class:filled {title}></span>
</div>

<style>
    div {
        display: inline-block;
        position: relative;
        width: 50px;
        height: 50px;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        background: black;
    }
    div span {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 44px;
        height: 44px;
        background: white;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        
    }
    
    .filled {
        background: yellow;
    }
</style>