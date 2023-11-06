<script lang="ts">
    import type { HighlightRectInterface } from "../../utils/interfaces";
    export let rect: HighlightRectInterface;
</script>

<div class="content" style="left: {rect.left}px; top: {rect.top}px; height: {rect.height}px; width: {rect.width}px;">
    <div class="background"></div>
    <div class="underline"></div>
</div>

<style>
    .underline {
        background-color: #ff99ab;
        position: absolute;
        bottom: -2px;
        width: 100%;
        height: 3px;
    }
    .background {
        opacity: 0.25;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #f27388;
    }
    .content {
        position: absolute;
        margin: 0;
        padding: 0;
    }
</style>