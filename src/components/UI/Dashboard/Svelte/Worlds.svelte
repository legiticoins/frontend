<script lang=ts>
  import { onMount } from "svelte";


     // Widgets
     import WorldWidget from "./Widgets/Worlds.svelte"
     
     const { data } = $props();

     const approvedWorlds= $state<any[]>([])
     const unapprovedWorlds= $state<any[]>([])
     
     const apiString = `https://api.legiti.dev/owner/${data.userUUID}`
     let worldsData= $state<any[]>([]);
     
     onMount( async () => {
          // GET ALL WORLDS FROM API.LEGITI.DEV
          worldsData = await fetch(apiString, {
               headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
               }
          }).then(async response => await response.json())
          
          // Sort by Approved / UnApproved.
          worldsData.forEach(async (world: any) => {
               const response = await fetch(`https://wwlc.legiti.dev/api/world/${world.world_uuid}`).then(async response => response.json())
               if (response.success == "false") {
                    unapprovedWorlds.push(world)
               } else {
                    approvedWorlds.push(world)
               }
          })

     })

</script>

<div class="w-full md:px-5 font-ui">
     <h1 class="text-mobile-title mb-5">My Worlds</h1>

     <p class="my-5">Your worlds must first be approved by the admins at Legitidevs to start creating jobs.</p>

     <!-- WORLDS Div -->
     <div class="max-h-150 h-full w-full flex flex-col gap-2">

          <!-- If No Worlds -->
          {#if worldsData.length === 0}
               <p class="opacity-40">Loading..</p>
          {/if}

          <p>Approved Worlds</p>
          {#each approvedWorlds as world}
               <WorldWidget world={world} />
          {/each}

          <p>UnApproved Worlds</p>
          {#each unapprovedWorlds as world}
               <WorldWidget world={world} />
          {/each}

     </div>
</div>
