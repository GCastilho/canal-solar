<script>
	export let concessionaria
</script>

<h2>Qual é a sua concessionária de energia elétrica?</h2>
<p>Essa informação é importante, mas deixe em branco se você não souber</p>
<p>insira box de concessionária aqui</p>
<button on:click="{() => concessionaria = 'não sei'}">Não sei minha concessionária</button>
