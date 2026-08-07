<script>
	let { data } = $props()
</script>

<main class="mx-5 h-full rounded-ui flex flex-1 flex-col items-center justify-center">
	<div class="w-full h-full backdrop-blur-2xl flex flex-col items-center justify-center">
		<h1 class="font-wordmark text-mobile-title md:text-[120px] text-center">
			World Wide LegitiCoins.
		</h1>
	</div>

	<div class="gap-3 flex flex-col md:flex-row w-full justify-center mt-10">
		<a
			href="/login"
			class="p-3 text-center duration-300 hover:scale-102 font-ui bg-white dark:bg-neutral-900 border min-w-50"
		>
			Login
		</a>
		<a
			href="/dashboard/my-worlds"
			class="p-3 text-center duration-300 hover:scale-102 font-ui bg-white dark:bg-neutral-900 border min-w-50"
		>
			Dashboard
		</a>
	</div>
</main>
