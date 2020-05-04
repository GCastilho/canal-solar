<script>
	import FancyInput from '../../../components/FancyInput.svelte'
	export let concessionaria

	function setConcessionaria(event) {
		concessionaria = event.target.concessionaria.value || 'não sei'
	}
</script>

<h2>Qual é a sua concessionária de energia elétrica?</h2>
<p>Essa informação é importante, mas deixe em branco se você não souber</p>

<form on:submit|preventDefault={setConcessionaria}>
	<FancyInput id="concessionaria" required={false}>
		Insira sua concessionária aqui
	</FancyInput>

	<button type="submit">Enviar</button>
	<button type="submit">Não sei minha concessionária</button>
</form>

