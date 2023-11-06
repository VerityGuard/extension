<script lang="ts">
    import { Divider } from "../unit/basic";
    import SelectItem from "../unit/select";
    import SwitchItem from "../unit/switches";
    import PopupSettingsHeader from "./SettingsHeader.svelte";
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
        <SelectItem text={'Model'}/>
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