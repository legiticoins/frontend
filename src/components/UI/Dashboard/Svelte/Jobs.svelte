<script>

     // 1. GET LIST OF ALL WORLDS BY PLAYER
     // 2. ITERATE THROUGH ALL WITH WWLC API AND ONLY SELECT APPROVED WORLDS
     // 3. ITERATE THROUGH THE JOBS ARRAY.
     // 4. DISPLAY JOBS
     // 5. PROFIT

     // Widgets
     import JobWidget from "./Widgets/Jobs.svelte"
     import { onMount } from "svelte"
     
     let { cookies } = $props()
     
     let approvedWWLCWorlds = $state([])
     let approvedUserWorlds = $state([])
     let jobsArray = $state([])
     
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

               // 3. ITERATE THROUGH THE JOBS ARRAY.
               if (approvedWWLCWorlds.length > 0) {
                    approvedWWLCWorlds.forEach(async (wwlcWorld) => {

                         // if
                         // approvedWWLCWorlds looks like [ {}, {}, {}]
                         // jobsArray looks like [ [], [], []]
                         // where first element of both arrays are related.
                         if (wwlcWorld.jobs) {
                              jobsArray.push(wwlcWorld.jobs);
                         }
                         
                    });
               }
               
          } catch (error) {
               console.log(error)
          }
     })

     $inspect(approvedWWLCWorlds)
     $inspect(approvedUserWorlds)
     
</script>

<div class="w-full md:px-5 font-ui">
     <h1 class="text-mobile-title mb-5">My Jobs</h1>
     <!-- jobs Div -->
     <div class="max-h-150 h-full w-full flex flex-col content-start gap-2">

          {#if jobsArray.length === 0}
          <p class="opacity-30">Your created jobs appear here.</p>
          {:else}
               {#each approvedWWLCWorlds as world, index}
                    <h1>{approvedUserWorlds[index]}.name</h1>
                    {#each jobsArray as job}
                         <!-- Pass Job Data Onto Widget -->
                         <JobWidget job={job}/>
                    {/each}
               {/each}
          {/if}
          
     </div>
</div>


