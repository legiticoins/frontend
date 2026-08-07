<script>
     import { onMount } from "svelte"
     import WorldWidget from './Widgets/Worlds.svelte';

     let { world_token = "", uuid = "", cookies } = $props()
     let worldData = $state({});

     let status = $state("");

     // Get the world the user is adding a job for.
     onMount(async () => {
          if (uuid.length !== 0) {
               try {
                    const response = await fetch(`https://api.legiti.dev/world/${uuid}`)
                    const responseData = await response.json()
                    if (responseData) {
                         worldData = responseData;
                         // console.log(worldData)
                    }
               } catch (error) {
                    console.log(error)
               }
          }
     })

     let job_name = $state(""), job_pay = $state(0), job_type = $state("")
     async function createJob() {
          if (job_name === "" || job_pay === 0 || job_type === "") {
               status = "Information cannot be incomplete.";
               return fail;
          }
          const body = {
               id: job_name.toLowerCase().split(" ").join("-"),
               name: job_name,
               type: job_type,
               amount: job_pay,
               world_token
          }
          // console.log(body)

          try {
               const createJobResponse = await fetch(`https://wwlc.legiti.dev/api/job/create`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${cookies.authToken}`
                    },
                    body: JSON.stringify(body)
               })
          } catch (error) {
               console.log(error)
          }
          
     }

</script>


<div class="max-h-150 h-full md:w-100 flex flex-col gap-2">

     <!-- Show World Data of Currently Targetting World. -->
     {#if uuid.length > 0}
          <WorldWidget world={worldData} type="none"/>
     {/if}
     <form class="flex flex-col gap-5">
          <!-- Job Name -->
          <label class="flex flex-col">
               Enter Job Name
               <input bind:value={job_name} class="bg-black/20 dark:bg-white/20 rounded-ui p-2 text-black dark:text-white" type="text">
          </label>

          <div class="flex gap-1 w-full">
               <!-- Job Pay -->
               <label class="flex flex-1 flex-col">
                    Enter Pay
                    <input bind:value={job_pay} class="bg-black/20 dark:bg-white/20 rounded-ui p-2 text-black dark:text-white" type=number>
               </label>
               <label class="flex flex-1 flex-col">
                    Job Type
                    <select bind:value={job_type} class="flex-1 bg-black/20 dark:bg-white/20 rounded-ui p-2 text-black dark:text-white select-accent:main-dark" type="text">
                         <option class="bg-white dark:bg-black/80 text-white dark:text-white">buy</option>
                         <option class="bg-white dark:bg-black/80 text-white dark:text-white">sell</option>
                    </select>
               </label>
          </div>

          <!-- Job Name -->
          <label class="flex flex-col">
               Enter World Token
               <p class="text-[13px] opacity-50 italic">Don't know your world token? Click '+' from Your Worlds tab.</p>
               <input value={world_token} class="bg-black/20 dark:bg-white/20 rounded-ui p-2 text-black dark:text-white" type="text">
          </label>

          <div class="my-2">
               <button class="hover:cursor-pointer bg-black/20 dark:bg-white/20 rounded-ui p-2 text-black dark:text-white" onclick={() => {createJob()}}>Create Job</button>
          </div>
     </form>
</div>
