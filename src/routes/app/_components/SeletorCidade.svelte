<script>
	export let estado
	export let cidade

	async function fetchMunicipios() {
		const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.id}/municipios`)
		return await res.json()
	}
</script>

<style>
	select {
		font-size: 16px;
		width: 250px;
		font-weight: bold;
		padding: .6em 1.4em .5em .8em;
		margin: 0;
		border: 1px solid #aaa;
		box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
		border-radius: .5em;
		background-color: #BFBDFF;
	}

	select:focus {
		border-color: #aaa;
		box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
		box-shadow: 0 0 0 3px -moz-mac-focusring;
		color: #222;
		outline: none;
	}
</style>

<h2>Muito bem. Agora precisamos saber o nome da sua cidade</h2>
<select bind:value="{cidade}">
	<option value="">Selecione</option>
	{#await fetchMunicipios()}
		<option value="">buscando...</option>
	{:then municipios}
		{#each municipios as municipio}
			<option value="{municipio.id}">{municipio.nome}</option>
		{/each}
	{:catch err}
		<option value="">Erro buscando municípios</option>
	{/await}
</select>
