<script>
	import { fade } from 'svelte/transition'
	import FancyInput from '../../components/FancyInput.svelte'
	import Mapa from './_mapa.svelte'

	$: estado = ''
	$: dimensionamento = ''

	function dimensionar(event) {
		dimensionamento = event.target.consumo.value
	}

	const scrollIntoView = e => e.scrollIntoView({ behavior: 'smooth' })
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

	button {
		display: block;
		width: 100%;
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
	<div use:scrollIntoView>
		<h2>Selecione o seu estado:</h2>
		<Mapa on:click="{event => estado = event.detail}" />
	</div>

	{#if estado}
		<div in:fade="{{delay: 250}}" use:scrollIntoView>
			<h2>Você selecionou {estado}</h2>
			<form on:submit|preventDefault="{dimensionar}">
				<h3>Informe seus dados e receba os resultados do seu dimensionamento</h3>
				<FancyInput type="number" id="consumo">Digite seu consumo de energia</FancyInput>

				<FancyInput type="text" id="name">Informe seu nome</FancyInput>
				<FancyInput type="email" id="email">Informe seu email</FancyInput>
				<FancyInput type="tel" id="telefone">Informe seu telefone</FancyInput>

				<button type="submit">Dimensionar</button>
			</form>
		</div>
	{/if}

	{#if dimensionamento}
		<h2 transition:fade style="margin-top: 50px;" use:scrollIntoView>O resultado do seu dimensionamento foi: {dimensionamento}</h2>
	{/if}
</div>
