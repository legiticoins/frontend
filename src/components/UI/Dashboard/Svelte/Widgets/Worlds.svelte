<!-- WORLDS WIDGET -->

<script>
     const { world, image } = $props();
     
     // World Icons HREF:
     // const string = `https://raw.githubusercontent.com/jacobsjo/mcicons/refs/heads/icons/item/`
     
</script>

<main class="hover:cursor-pointer group aspect-square relative md:max-w-50 max-h-45 md:max-h-50 duration-300 w-full h-full border border-neutral-300 hover:border-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-300 rounded-ui shrink-0 overflow-hidden flex items-center">
     <img src="../../../../../../../src/assets/icons/block.svg" alt="placeholder" class="invert-0 dark:invert opacity-50 size-20 w-full justify-self-center">
     <div class="bottom-0 absolute p-2 duration-300 h-full flex items-center justify-center w-full group-hover:opacity-100 opacity-100 md:opacity-0 backdrop-blur-[10px]">
          <h1 class="font-handwritten px-2 text-[150%] max-w-100 w-full text-center">{world.name}</h1>
     </div>
</main>   
