<script>
    import Header from "$lib/header.svelte"
    import Survey from '$lib/survey.svelte';
</script>




<Header />

{import.meta.env.VITE_ENV_TYPE} hi

<a href = "/login">login!</a>
<a href = "/blah">blah blah blah</a>
<br />

<Survey/>