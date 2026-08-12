<script>
	let { data } = $props()
	let authToken = $state(data.authToken)

	const fonts = [
          "Nexa",
          "Flowers Kingdom",
          "Akira",
          "wordmark"
	]
	
	let randomTitleFont = fonts[Math.floor(Math.random() * fonts.length)];
	     
	$effect(() => {
	     authToken = data.authToken
	})
	
</script>

<main class="mx-5 h-full rounded-ui flex flex-4 flex-col justify-center">
	<div class="w-full h-full backdrop-blur-2xl flex flex-col justify-center">
	     <h1 class="text-mobile-title md:text-[120px] text-center">
		{#if randomTitleFont === "wordmark"}
		     <span class="font-wordmark">World Wide LegitiCoins.</span>
		{:else if randomTitleFont === "Nexa"}
               <span class="font-nexa md:text-[80px]">World Wide LegitiCoins.</span>
		{:else if randomTitleFont === "Flowers Kingdom"}
		     <span class="font-flowers-kingdom">World Wide LegitiCoins.</span>
		{:else if randomTitleFont === "Akira"}
		     <span class="font-akira md:text-[100px]">World Wide LegitiCoins.</span>
		{/if}

		</h1>
	</div>

	<div class="gap-3 flex flex-col md:flex-row w-full justify-center mt-10">
		     <a href="/dashboard/my-worlds" class="p-3 text-center duration-300 hover:scale-102 font-ui bg-white dark:bg-neutral-900 border min-w-50">
                    Dashboard
		     </a>
	</div>
</main>
