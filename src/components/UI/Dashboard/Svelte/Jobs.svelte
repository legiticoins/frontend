<script lang=ts>
     // Widgets
     import JobWidget from "./Widgets/Jobs.svelte"
     
     interface IJobData {
          id: string,
          type: string,
          amount: number,
          name: string,
          world_token: string,
     }

     const jobs: IJobData[] = $state([])

</script>

<div class="w-full md:px-5 font-ui">
     <h1 class="text-mobile-title mb-5">My Jobs</h1>
     <!-- jobs Div -->
     <div class="max-h-150 h-full w-full flex flex-wrap content-start gap-2">

          <!-- If No jobs -->
          {#if jobs.length === 0}
               <p class="opacity-40">Click the '+' icon to create a Job.</p>
          {/if}

          {#each jobs as job}
               <JobWidget />
          {/each}
          
     </div>
</div>
