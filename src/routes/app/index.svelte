<script>
	import { fade } from 'svelte/transition'
	import FancyInput from '../../components/FancyInput.svelte'
	import Mapa from './_mapa.svelte'

	$: estado = ''
	$: dimensionamento = ''

	function dimensionar(event) {
		dimensionamento = event.target.consumo.value
	}
</script>

<style>
	.container {
		text-align: center;
	}

	form {
		max-width: 500px;
		margin: 0 auto;
		border: 1px solid red;
		padding: 20px;
		border-radius: 6px;
		box-shadow: 0px 5px 50px 0px rgba(18, 89, 93, 0.15);
	}

	.buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.buttons > button {
		margin: 0 5px;
	}

	button {
		display: block;
		border-radius: 4px;
		border: none;
		background-color: #133980;
		color: #ffffff;
		text-transform: uppercase;
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		letter-spacing: .13em;
		text-align: center;
		margin-bottom: 5px;
	}
</style>

<div class="container">
	{#if estado}
		<div in:fade="{{delay: 250}}" out:fade="{{duration: 250}}">
			<h2>Você selecionou {estado}</h2>
			<form on:submit|preventDefault="{dimensionar}">
				<FancyInput type="number" id="consumo">Digite seu consumo de energia</FancyInput>

				<div class="buttons">
					<button on:click|preventDefault="{() => estado = ''}">Voltar</button>
					<button type="submit">Dimensionar</button>
				</div>
			</form>
			{#if dimensionamento}
				<h3 transition:fade>O resultado do seu dimensionamento foi: {dimensionamento}</h3>
			{/if}
		</div>
	{:else}
		<div out:fade="{{duration: 250}}" in:fade="{{delay: 250}}">
			<h2>Selecione o seu estado:</h2>
			<Mapa on:click="{event => estado = event.detail}" />
		</div>
	{/if}
</div>
