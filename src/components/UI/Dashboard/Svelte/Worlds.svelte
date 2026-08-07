<script>
     import { onMount } from "svelte";

     // Widgets
     import WorldWidget from "./Widgets/Worlds.svelte"

     const { data, image } = $props();

     const approvedWorlds= $state([])
     const unapprovedWorlds= $state([])

     let worldsData = $state([]);

     onMount( async () => {
          const apiString = `https://api.legiti.dev/owner/${data.userUUID}`

          // GET ALL WORLDS FROM API.LEGITI.DEV
          worldsData = await fetch(apiString).then(async response => await response.json())

          // Sort by Approved / UnApproved.
          worldsData.forEach(async (world) => {
               const response = await fetch(`https://wwlc.legiti.dev/api/world/${world.world_uuid.split("-").join("")}`, {
                    headers: {
                         Authorization: `Bearer ${data.authToken}`
                    }
               })
               const responseData = await response.json()
               if (responseData.success === true) {
                    world.wwlc = responseData
                    if (responseData.verified) {
                      approvedWorlds.push(world)
                    } else {
                      unapprovedWorlds.push(world)
                    }
               } else {
                    unapprovedWorlds.push(world)
               }
          })

          if(approvedWorlds.length !== 0) {
               // Sort Worlds so they aren't randomly positioned.
               approvedWorlds.sort()
          }
     })

</script>

<div class="w-full md:px-5 font-ui">
     <h1 class="text-mobile-title mb-5">My Worlds</h1>

     {#if approvedWorlds.length === 0}
          <details class="my-5 p-2 rounded-ui border-red-600 border bg-red-700/40 hover:cursor-pointer max-w-100">
               <summary>Your worlds must first be approved by the admins at LegitiDevs to start creating jobs.</summary>
               <h1 class="text-mobile-title my-5">World Approval</h1>
               <p>To prevent people from abusing the system and create worlds that either farm legiticoins or donate them, an approval system has been put in place.</p>
          </details>
     {/if}

     <!-- WORLDS Div -->
     <div class="max-h-150 h-full w-full flex flex-col gap-2">

          <!-- If No Worlds -->
          {#if worldsData.length === 0 && data.userUUID}
               <p class="opacity-40">Loading..</p>
          {:else if worldsData.length === 0}
               <p class="opacity-40">You aren't logged in.</p>
          {:else}
               {#if approvedWorlds.length !== 0}
                    <p class="">Approved Worlds</p>
                    <div class="flex gap-2 flex-wrap content-start">

                         {#each approvedWorlds as world}
                              <WorldWidget data={data} world={world} type="approved" />
                         {/each}
                    </div>
               {/if}
          {/if}



          <h1>Unapproved Worlds</h1>
          <div class="flex gap-2 flex-wrap content-start">
               {#each unapprovedWorlds as world}
                    <WorldWidget data={data} world={world} />
               {/each}
          </div>

     </div>
</div>
