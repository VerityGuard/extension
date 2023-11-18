<script lang="ts">
    import type { HighlightRectInterface } from "../../utils/interfaces";
    import HighlightRect from "./HighlightRect.svelte";
    export let containerRect: HighlightRectInterface;
    export let rects: HighlightRectInterface[] = [];
</script>

<div class="highlight">
    <div class="container" style="width: {containerRect.width}px; height: {containerRect.height + 2}px; top: {containerRect.top}px; left: {containerRect.left}px">
        <div class="ranges">
            {#each rects as rect}
                <HighlightRect {rect} />
            {/each}
        </div>
    </div>
</div>


<style>
    .highlight {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
    .container {
        box-sizing: content-box;
        top: 0;
        left: 0;
        position: relative;
        pointer-events: none;
        overflow: hidden;
        border: 0;
        border-radius: 0;
        padding: 0;
        margin: 0;
        z-index: 0;
    }
    .ranges {
        position: absolute;
        left: 0;
        top: 0;
    }
</style>