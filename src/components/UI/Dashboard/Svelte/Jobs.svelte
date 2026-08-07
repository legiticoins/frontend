<script>

     // 1. GET LIST OF ALL WORLDS BY PLAYER
     // 2. ITERATE THROUGH ALL WITH WWLC API AND ONLY SELECT APPROVED WORLDS
     // 3. ITERATE THROUGH THE JOBS ARRAY.
     // 4. DISPLAY JOBS
     // 5. PROFIT

     // Widgets
     import JobWidget from "./Widgets/Jobs.svelte"
     import { onMount, untrack } from "svelte"

     let { cookies } = $props()

     let approvedWWLCWorlds = $state([])
     let approvedUserWorlds = $state([])
     let jobsArray = $derived(approvedWWLCWorlds.filter((w) => w.jobs && w.jobs.length > 0).map((w) => w.jobs));

     onMount(async () => {
          try {
               // 1. GET LIST OF ALL WORLDS BY PLAYER
               let user_uuid = cookies.userUUID;
               const userWorldsFetch = await fetch(`https://api.legiti.dev/owner/${user_uuid}`);
               const userWorlds = await userWorldsFetch.json()

               // 2. ITERATE THROUGH ALL WITH WWLC API AND ONLY SELECT APPROVED WORLDS
               userWorlds.forEach(async (world) => {
                    const wwlcWorldFetch = await fetch(`https://wwlc.legiti.dev/api/world/${world.world_uuid}`, {
                         headers: {
                              'Authorization': `Bearer ${cookies.authToken}`
                         }
                    });
                    const wwlcWorld = await wwlcWorldFetch.json();
                    // SELECT APPROVED WORLDS
                    if (wwlcWorld.verified) {
                         approvedWWLCWorlds.push(wwlcWorld)
                         approvedUserWorlds.push(world)
                    }
               })


          } catch (error) {
               console.log(error)
          }

     })
     

</script>

<div class="w-full md:px-5 font-ui">
     <h1 class="text-mobile-title mb-5">My Jobs</h1>
     <!-- jobs Div -->
     <div class="max-h-150 h-full w-full flex flex-col content-start gap-2">

          {#if jobsArray.length === 0}
          <p class="opacity-30">Your created jobs appear here.</p>
          {:else}
               {#each approvedWWLCWorlds as world, index}
                    <div class="p-2 h-full w-full flex flex-col gap-2">
                         <h1>{world.name}</h1>
                         <div class="flex gap-1 content-start flex-wrap w-full h-full">
                              {#each jobsArray[index] as job}
                                   <JobWidget job={job} />
                              {/each}
                         </div>
                    </div>
               {/each}
          {/if}

     </div>
</div>
