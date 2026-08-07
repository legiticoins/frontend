<script lang=ts>
     // Widgets
     import JobWidget from "./Widgets/Jobs.svelte"

     let jobs = $state<any[]>([])

</script>

<div class="w-full md:px-5 font-ui">
     <h1 class="text-mobile-title mb-5">My Jobs</h1>
     <!-- jobs Div -->
     <div class="max-h-150 h-full w-full flex flex-col content-start gap-2">

          {#if jobs.length === 0}
          <p class="opacity-30">Your created jobs appear here.</p>
          {:else}
               {#each jobs as job}
                    <!-- Pass Job Data Onto Widget -->
                    <JobWidget job={job}/>
               {/each}
          {/if}
          
     </div>
</div>


