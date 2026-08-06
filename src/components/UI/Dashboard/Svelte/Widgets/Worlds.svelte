<!-- WORLDS WIDGET -->

<script>
     const { world, image } = $props();

     // World Icons HREF:
     // const string = `https://raw.githubusercontent.com/jacobsjo/mcicons/refs/heads/icons/item/`
     
</script>

<main class="hover:cursor-pointer group aspect-square relative md:max-w-100 max-h-45 md:max-h-50 duration-300 w-full h-full border rounded-ui shrink-0 overflow-hidden">
     <!-- <img src={string + world.icon + ".png"} alt="placeholder"> -->
     <div class="bottom-0 absolute p-2 duration-300 w-full group-hover:opacity-100 opacity-100 md:opacity-0 dark:bg-black/95 light:bg-white/99">
          <h1>[{world.version}] {world.name}</h1>
     </div>
</main>   