<script lang=ts>
     // Widgets
     import WorldWidget from "./Widgets/Worlds.svelte"
     
     interface IWorldData {
          uuid: string,
          name: string
     }

     const worlds: IWorldData[] = $state([])
     
</script>

<div class="w-full md:px-5 font-ui">
     <h1 class="text-mobile-title mb-5">My Worlds</h1>
     <!-- WORLDS Div -->
     <div class="max-h-150 h-full w-full flex flex-wrap content-start gap-2">

          <!-- If No Worlds -->
          {#if worlds.length === 0}
               <p class="opacity-40">Click the '+' icon to create a World Record.</p>
          {/if}

          {#each worlds as world}
               <WorldWidget />
          {/each}
          
     </div>
</div>
