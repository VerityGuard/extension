<script lang="ts">
    export let direction = 0;
</script>

<div class="divider {direction? "vertical" : "horizontal"}"></div>

<style>
    .divider {
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.06);
    }
    .divider.horizontal {
        border-width: 1px 0 0 0;
        width: 100%;
    }
    .divider.vertical {
        border-width: 0 0 0 1px;
        height: 100%;
    }
</style>