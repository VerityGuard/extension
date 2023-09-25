<script lang="ts">
    import cssVariables from "../../../utils/cssVariables";
    const VARIABLE_NAME = 'spinner-color';
    const VARIABLE_VALUE = '#99EDC3';
</script>

<span use:cssVariables={{[VARIABLE_NAME]: VARIABLE_VALUE}} class="loader"></span>

<style>
    .loader {
        width: 48px;
        height: 48px;
        border: 3px solid var(--spinner-color);
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
</style>