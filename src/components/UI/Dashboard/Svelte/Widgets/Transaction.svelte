<script lang="ts">
     import { onMount } from "svelte";
     let { cookies, icons, data = {id: 1, job: "", fromType: "world/user", fromId: "", status: "approved/rejected/waiting", "amount": 1, time: ""} } = $props()
     let date: string = $state("");

     onMount(() => {
          date = new Date(data.time).toLocaleString()
     })

     async function approve(transactionID: string) {
          try {
               const response = await fetch(`https://wwlc.legiti.dev/api/user/verify/${transactionID}`, {
                    method: 'POST',
                    headers: {
                         'Authorization': `Bearer ${cookies.authToken}`
                    }
               })
               const data = await response.json()
          } catch (err) {
               console.log(error)
          }
     }
     
</script>

<main class="hidden px-5 py-2 border border-black/20 dark:border-white/20 md:flex items-center rounded-ui">
     <div class="md:grid md:grid-cols-5 flex flex-col items-center md:gap-3 md:text-center">
          <h1 class="text-left">{data.job}</h1>
          <div class="dropdown dropdown-hover">
               <div tabindex="0" role="button" class="hover:cursor-pointer">
                    <img alt="txn_info" class="size-6 dark:invert dark:opacity-50" src={icons.transactionInfoIcon}>
               </div>
               <ul tabindex="-1" class="dropdown-content menu bg-primary-light text-left dark:bg-primary-dark rounded-box z-1 p-2 min-w-50 shadow-sm">
                    <h1 class="md:block text-[13px]"><span class="text-neutral-500 text-[10px] mr-2 md:mr-1.5">from</span>{data.from}</h1>
                    <h1 class="md:block text-[13px]"><span class="text-neutral-500 text-[10px] mr-2 md:mr-1.5">for</span>{data.amount} legiticoin(s)</h1>
                    <h1 class="md:block text-[13px]"><span class="text-neutral-500 text-[10px] mr-2 md:mr-1.5">at</span>{date}</h1>
               </ul>
          </div>
          <!-- <h1 class="md:block"><span class="text-neutral-500 text-[10px] mr-2 md:mr-1.5">from</span>{data.from}</h1> -->
          <!-- <h1 class="md:block"><span class="text-neutral-500 text-[10px] mr-2 md:mr-1">$</span>{data.amount} legiticoin(s)</h1> -->
          <!-- <h1 class="md:block"><span class="text-neutral-500 text-[10px] mr-2 md:mr-1.5">at</span>{date}</h1> -->
     </div>
     <div class="ml-auto flex gap-1 items-center">
          {#if data.status === "waiting"}
               <button onclick={() => {approve(data.id)}} class="flex gap-1 bg-primary-light hover:cursor-pointer dark:bg-primary-dark p-2 rounded-ui"> <img alt="icons" style="filter: brightness(0) saturate(100%) invert(75%) sepia(91%) saturate(407%) hue-rotate(76deg) brightness(88%) contrast(92%);" class=" size-6" src={icons.transactionApproveIcon}> <span class="hidden md:block">Approve</span></button>
          {:else if data.status === "approved"}
               <img alt="icons" style="filter: brightness(0) saturate(100%) invert(75%) sepia(91%) saturate(407%) hue-rotate(76deg) brightness(88%) contrast(92%);" class="size-6" src={icons.transactionApproveIcon}>
          {/if}
     </div>
</main>

<!-- MOBILE -->
<main class="md:hidden px-5 py-2 border border-black/20 dark:border-white/20 flex items-center rounded-ui">
     <div class="md:grid md:grid-cols-5 flex items-center gap-2 md:gap-2 md:text-center">
          <h1 class="text-left text-[18px]">{data.job}</h1>
          <div class="dropdown">
               <div tabindex="0" role="button" class="hover:cursor-pointer">
                    <img alt="txn_info" class="size-6 dark:invert dark:opacity-50" src={icons.transactionInfoIcon}>
               </div>
               <ul tabindex="-1" class="dropdown-content menu bg-primary-light text-left dark:bg-black rounded-box z-1 p-2 min-w-50 shadow-sm">
                    <h1 class="md:block text-[13px]"><span class="text-neutral-500 text-[10px] mr-2 md:mr-1.5">from</span>{data.from}</h1>
                    <h1 class="md:block text-[13px]"><span class="text-neutral-500 text-[10px] mr-2 md:mr-1.5">for</span>{data.amount} legiticoin(s)</h1>
                    <h1 class="md:block text-[13px]"><span class="text-neutral-500 text-[10px] mr-2 md:mr-1.5">at</span>{date}</h1>
               </ul>
          </div>
          
     </div>
     <div class="ml-auto flex gap-1 items-center">
          {#if data.status === "waiting"}
               <button onclick={() => {approve(data.id)}} class="flex gap-1 bg-primary-light hover:cursor-pointer dark:bg-primary-dark p-2 rounded-ui"> <img alt="icons" style="filter: brightness(0) saturate(100%) invert(75%) sepia(91%) saturate(407%) hue-rotate(76deg) brightness(88%) contrast(92%);" class=" size-6" src={icons.transactionApproveIcon}> <span class="hidden md:block">Approve</span></button>
          {:else if data.status === "approved"}
               <img alt="icons" style="filter: brightness(0) saturate(100%) invert(75%) sepia(91%) saturate(407%) hue-rotate(76deg) brightness(88%) contrast(92%);" class="size-6" src={icons.transactionApproveIcon}>
          {/if}
     </div>
</main>