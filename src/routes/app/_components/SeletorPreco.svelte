<script>
	export let preco
</script>

<p>
	Verificamos nosso banco de dados e percebemos que você paga R$ 1,00/kWh (ou seja, R$1,00 por cada quilowatt-hora consumido na sua residência). Isso é muito dinheiro! Se você tiver sua conta de luz em mãos, verifique se o valor que encontramos em nosso banco de dados está correto. Se você preferir, digite no campo abaixo o valo atualizado com sua última conta de luz.
</p>
<button on:click="{() => preco = 1}">Next</button>
