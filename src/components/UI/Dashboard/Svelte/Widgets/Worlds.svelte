<!-- WORLDS WIDGET -->

<script>
     import { onMount } from "svelte";
     const { world, type, data } = $props();
     
     // World Icons HREF:
     // const string = `https://raw.githubusercontent.com/jacobsjo/mcicons/refs/heads/icons/item/`

     let createJobHref = $state("")
     onMount(() => {
          if (world.wwlc) {
               createJobHref = `/dashboard/create-job?uuid=${world.wwlc.token}`
          }
     })

     async function submitForApproval(UUID, NAME) {
          console.log(UUID, NAME)
          try {
               const response = await fetch(`https://wwlc.legiti.dev/api/world/create`, {
                    method: 'POST',
                    body: {
                         uuid: UUID,
                         name: NAME
                    },
                    headers: {
                         'Authorization': `Bearer ${data.authToken}`
                    }
               }).then(async response => await response.json())
          } catch (error) {
               console.log(error)
          }

          if (response.success === true) {
               console.log(`WORLD: {UUID: ${UUID}, NAME: ${NAME}}`)
               console.log('World has been submitted for approval. Please share your world uuid with a legitidev admin.')
          }
          
     }
     
</script>

<main class="hover:cursor-pointer group aspect-square relative md:max-w-50 max-h-45 md:max-h-50 duration-300 w-full h-full border border-neutral-300 hover:border-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-300 rounded-ui shrink-0 overflow-hidden flex items-center">
     <img src="../../../../../../../src/assets/icons/block.svg" alt="placeholder" class="invert-0 dark:invert opacity-50 size-20 w-full justify-self-center">
     <div class="bottom-0 absolute p-2 duration-300 h-full flex flex-col justify-center w-full group-hover:opacity-100 opacity-100 md:opacity-0 backdrop-blur-[10px]">
          <h1 class="font-handwritten px-2 text-[150%] max-w-100 w-full text-center">{world.name}</h1>
          <div class="absolute bottom-0 left-0 w-full p-2 m-auto hover:bg-black/90 ">
               {#if type === "approved"}
                    <div class="flex gap-1">
                         <a title="Create Job" href={createJobHref} class="hover:bg-neutral-950/40 duration-100 rounded-ui">
                              <img src="../../../../../../../src/assets/icons/plus.svg" alt="create-job" class="size-10 dark:invert">
                         </a>
                    </div>
                    
               {:else if type !== "approved"}
                    <div class="flex gap-1 justify-self-center w-full">
                         <button onclick={() => submitForApproval(world.world_uuid, world.name)} title="Submit for Approval" href='/' class="duration-100 rounded-ui w-full flex gap-1 items-center hover:cursor-pointer">
                              <img src="../../../../../../../src/assets/icons/world.svg" alt="create-job" class="size-7 dark:invert">
                              <span class="text-[11px]">SUBMIT FOR APPROVAL</span>
                         </button>
                    </div>
               {/if}
               
          </div>
     </div>
</main>

