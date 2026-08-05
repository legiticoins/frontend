<script lang="ts">
     import { onMount } from "svelte";
     import Transaction from "./Widgets/Transaction.svelte";

     const { title, data } = $props();
     let transactions = $state<any[]>([
          {id: 1, job: "Mow Lawns", fromType: "world", fromId: "", status: "approved", "amount": 1, time: "2026-08-05T14:39:16.122Z"}
     ])

     onMount( async () => {
          const userData = await fetch(`https://wwlc.legiti.dev/api/user/${data.userUUID.split("-").join("")}`).then(async response => await response.json())
          if (userData.transactions && userData.transactions.length > 0) {
               transactions = userData.transactions
          }
     })
     
</script>

<div class="w-full md:px-5 font-ui">
     <h1 class="text-mobile-title mb-5">{title}</h1>

     {#if transactions.length === 0}
          <p class="opacity-40">You haven't made a transaction.. yet..</p>
     {/if}

     <div class="flex flex-col gap-1">
          {#each transactions as transaction}
               <Transaction data={transaction}/>
          {/each}
     </div>

</div>