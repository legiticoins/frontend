<script lang="ts">
     import { onMount } from "svelte";
     let { data = {id: 1, job: "", fromType: "world/user", fromId: "", status: "approved/rejected/waiting", "amount": 1, time: ""}, cookies } = $props()
     let date: string = $state("");
     let status = $state("");

     onMount(() => {
          date = new Date(data.time).toLocaleString()
     })

     async function approveTransaction(transactionId: number) {
          let responseData;
          try {
               const response = await fetch(`https://wwlc.legiti.dev/api/transaction/verify/${transactionId}`, {
                    method: 'GET',
                    headers: {
                         'Authorization': `Bearer ${cookies.authToken}`
                    }
               })
               responseData = await response.json()
               console.log(responseData)
          } catch (error) {
               status = "Transaction couldn't be approved."
               console.log(error)
          }

          if (responseData && responseData.success === true) {
               status = 'Transaction has been approved!'
          } else {
               status = responseData.error
          }
     }

</script>

<details class="p-2 px-5 rounded-ui flex flex-col gap-1 dark:bg-black bg-black/10 select-none">
     <summary>
          {data.amount}LC {data.fromType == `world` ? `from ${data.fromId}` : `to ${data.fromId}`}
     </summary>
     <div>
          <h1 class="flex-1 ">{data.amount} Legiticoin(s)</h1>
          <h1 class="flex-1 capitalize">{date}</h1>
          <h1 class="flex-1 capitalize">{data.status}</h1>
          <button class="p-2 rounded-ui hover:cursor-pointer max-w-30 justify-self-center flex bg-green-700/50" onclick={() => {approveTransaction(data.id)}}>Approve</button>
     </div>
     <p class="my-2">{status}</p>
</details>
