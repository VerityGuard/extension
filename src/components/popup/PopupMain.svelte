<script lang="ts">
    import { Divider } from "../unit/basic";
    import SelectItem from "../unit/select";
    import SwitchItem from "../unit/switches";
    import PopupSettingsHeader from "./SettingsHeader.svelte";

    async function getModels() {
        const MODELS_URL = `${process.env.BASE_API_URL}/${process.env.MODEL_PATH}`;

        const res = await fetch(MODELS_URL, {
            credentials: 'include',
            method: "GET",
        });

        if (!res.ok) {
            const response = await res.json();
            console.error(response);
        }

        const models = await res.json();

        return models;
    }
    
    const models = getModels();
</script>

<div class="main">
    <div class="settings">
        <PopupSettingsHeader />

        <SwitchItem text={"Lorem Ipsum is simply dummy text of the printing"} />
        <Divider />
        <SwitchItem text={"Lorem Ipsum is simply dummy text of the printing"} />
        <Divider />
        <SelectItem text={'Task'}/>
        <Divider />
        <SelectItem text={'Model'} options={models}/>
    </div>
</div>

<style>
    .main {
        padding-top: 18px;
        padding-left: 32px;
        flex-grow: 1;
        overflow-y: auto;
        overflow-x: hidden;
        color: #0e101a;
    }
    .settings {
        width: 284px;
    }
</style>