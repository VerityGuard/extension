<script lang="ts">
    import { onMount } from "svelte";
    import { storage } from "../storage";
    import Options from "./Options.svelte";
    let count = 0;

    onMount(() => {
        storage.get().then((storage) => (count = storage.count));
    });
</script>

<div class="box-overlay">
    <Options {count} />
</div>
<slot />

<style>
    .box-overlay {
        position: fixed;
        width: 300px;
        bottom: 16px;
        right: 16px;
        color: black;
        background-color: white;
        border: 1px solid black;
        padding: 16px;
    }
</style>
  