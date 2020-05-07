<script>
	import { fade } from 'svelte/transition'
	import Mapa from './_components/mapa.svelte'
	import SeletorCidade from './_components/SeletorCidade.svelte'
	import SeletorConcessionaria from './_components/SeletorConcessionaria.svelte'
	import SeletorPreco from './_components/SeletorPreco.svelte'
	import FormDadosCliente from './_components/FormDadosCliente.svelte'

	$: estado = {}
	$: cidade = ''
	$: concessionaria = ''
	$: preco = ''
	$: dadosCliente = {}

	const scrollIntoView = node => node.scrollIntoView({ behavior: 'smooth' })
	const centerInScreen = node => node.style.marginBottom = `${window.innerHeight / 2}px`
</script>

<style>
	.container {
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}

	.container > * {
		margin-bottom: 70px;
	}
</style>

<div class="container" use:centerInScreen>
	<div use:scrollIntoView>
		<h1>Olá! Bem-vindo(a) ao simulador do Canal Solar</h1>
		<p>Nós vamos te ajudar a economizar na sua conta de energia. Nossa ferramenta gratuita vai analisar sua conta de energia e dimensionar o sistema de energia solar ideal para sua residência</p>
		<h2 style="margin-top: 30px;">Em qual estado você mora?</h2>
		<Mapa on:click="{event => estado = event.detail}" />
	</div>

	{#if estado.id}
		<div in:fade use:scrollIntoView>
			<SeletorCidade bind:estado_id={estado.id} bind:cidade />
		</div>
	{/if}

	{#if cidade}
		<div in:fade use:scrollIntoView>
			<SeletorConcessionaria bind:concessionaria />
		</div>
	{/if}

	{#if concessionaria}
		<div in:fade use:scrollIntoView>
			<SeletorPreco bind:preco />
		</div>
	{/if}

	{#if preco}
		<div in:fade="{{delay: 100}}" use:scrollIntoView>
			<FormDadosCliente bind:dadosCliente />
		</div>
	{/if}

	{#if dadosCliente.email}
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
