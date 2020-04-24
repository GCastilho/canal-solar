<script>
	import Mapa from './_mapa.svelte'

	function printClick(event) {
		console.log(event.detail)
	}
</script>

<h2>Hello from app</h2>

<Mapa on:click="{printClick}" />
