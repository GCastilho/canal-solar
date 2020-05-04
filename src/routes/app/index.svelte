<script>
	import { fade } from 'svelte/transition'
	import Mapa from './_components/mapa.svelte'
	import SeletorCidade from './_components/SeletorCidade.svelte'
	import SeletorConcessionaria from './_components/SeletorConcessionaria.svelte'
	import SeletorPreco from './_components/SeletorPreco.svelte'
	import FormDadosCliente from './_components/FormDadosCliente.svelte'

	$: estado = {}
	$: cidade = ''
	$: dimensionamento = ''
	$: concessionaria = ''
	$: preco = ''

	const scrollIntoView = e => e.scrollIntoView({ behavior: 'smooth' })
</script>

<style>
	.container {
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}
</style>

<div class="container">
	<div use:scrollIntoView>
		<h1>Olá! Bem-vindo(a) ao simulador do Canal Solar</h1>
		<p>Nós vamos te ajudar a economizar na sua conta de energia. Nossa ferramenta gratuita vai analisar sua conta de energia e dimensionar o sistema de energia solar ideal para sua residência</p>
		<h2 style="margin-top: 30px;">Em qual estado você mora?</h2>
		<Mapa on:click="{event => estado = event.detail}" />
	</div>

	{#if estado.id}
		<div use:scrollIntoView>
			<SeletorCidade bind:estado={estado} bind:cidade={cidade} />
		</div>
	{/if}

	{#if cidade}
		<div use:scrollIntoView>
			<SeletorConcessionaria bind:concessionaria />
		</div>
	{/if}

	{#if concessionaria}
		<div use:scrollIntoView>
			<SeletorPreco bind:preco />
		</div>
	{/if}

	{#if preco}
		<div in:fade="{{delay: 250}}" use:scrollIntoView>
			<FormDadosCliente bind:dimensionamento />
		</div>
	{/if}

	{#if dimensionamento}
		<h2 transition:fade style="margin-top: 50px;" use:scrollIntoView>
			Resultado
		</h2>
		<p>Recomendamos para você um sistema de energia solar com as seguintes características básicas</p>
		<p>
			Potência de pico: XXXXXX kW
			Número aproximado de painéis solares: XX
			Número aproximado de inversores: XX
			Retorno do investimento: XX anos
		</p>
	{/if}
</div>
