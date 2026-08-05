<script lang=ts>
  import { onMount } from "svelte";


     // Widgets
     import WorldWidget from "./Widgets/Worlds.svelte"
     
     const { data, image } = $props();

     const approvedWorlds= $state<any[]>([])
     const unapprovedWorlds= $state<any[]>([])
     

     let worldsData= $state<any[]>([]);
     
     onMount( async () => {
          const apiString = `https://api.legiti.dev/owner/${data.userUUID}`
          
          // GET ALL WORLDS FROM API.LEGITI.DEV
          worldsData = await fetch(apiString, {
               headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
               }
          }).then(async response => await response.json())
          
          // Sort by Approved / UnApproved.
          worldsData.forEach(async (world: any) => {
               const response = await fetch(`https://wwlc.legiti.dev/api/world/${world.world_uuid.split("-").join("")}`, {
                    headers: {
                         Authorization: `Bearer ${data.authToken}`
                    }
               }).then(async response => response.json())
               if (response.success === "true") {
                    approvedWorlds.push(world)
               } else {
                    unapprovedWorlds.push(world)
               }
          })

     })

</script>

<div class="w-full md:px-5 font-ui">
     <h1 class="text-mobile-title mb-5">My Worlds</h1>

     <details class="my-5 p-2 rounded-ui border-red-600 border bg-red-700/40 hover:cursor-pointer">
          <summary>Your worlds must first be approved by the admins at Legitidevs to start creating jobs.</summary>

          <h1 class="text-mobile-title my-5">World Approval</h1>
          <p>To prevent people from abusing the system and create worlds that either farm legiticoins or donate them, an approval system has been put in place.</p>

     </details>

     <!-- WORLDS Div -->
     <div class="max-h-150 h-full w-full flex flex-col gap-2">

          <!-- If No Worlds -->
          {#if worldsData.length === 0}
               <p class="opacity-40">Loading..</p>
          {/if}

          {#if approvedWorlds.length > 0}
               <p class="text-3xl">Approved Worlds</p>
               <div class="flex gap-2 flex-wrap content-start">

                    {#each approvedWorlds as world}
                    <WorldWidget image={image} world={world} />
                    {/each}
               </div>
          {/if}

          <p class="text-3xl">Your Worlds</p>
          <div class="flex gap-2 flex-wrap content-start">
               {#each unapprovedWorlds as world}
                    <WorldWidget image={image} world={world} />
               {/each}
          </div>

     </div>
</div>
