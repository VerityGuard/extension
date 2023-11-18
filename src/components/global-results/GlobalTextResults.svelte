<script lang="ts">
    export let element: HTMLElement;
    export let score: number;

    const MAX_TEXT_LENGTH = 120;

    let truncatedText = element.textContent.slice(0, MAX_TEXT_LENGTH) + (element.textContent.length > MAX_TEXT_LENGTH ? "..." : "")

    function scrollToElement() {
        element.scrollIntoView({ behavior: "smooth" });
    }
</script>

<button class="global-text-result" on:click={scrollToElement}>
    <span class="global-text-result-content">{truncatedText}</span>
    <span class="global-text-result-score">{score}</span>
</button>

<style>
    .global-text-result {
        background-color: #fff;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 1px 4px rgba(1,1,1,.15);
        outline: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        color: #0e101a;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        column-gap: 2rem;
        word-break: break-word;
    }
    .global-text-result-content {
        text-align: left;
        grid-column: span 2 / span 2;
    }
    .global-text-result-score {
        text-align: right;
    }
</style>