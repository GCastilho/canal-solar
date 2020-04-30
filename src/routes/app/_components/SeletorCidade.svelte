<script>
	export let estado
	export let cidade

	async function fetchMunicipios() {
		const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.id}/municipios`)
		return await res.json()
	}
</script>

<h2>Muito bem. Agora precisamos saber o nome da sua cidade</h2>
<select bind:value="{cidade}">
	<option value="">Selecione</option>
	{#await fetchMunicipios()}
	{:then municipios}
		{#each municipios as municipio}
			<option value="{municipio.id}">{municipio.nome}</option>
		{/each}
	{/await}
</select>
