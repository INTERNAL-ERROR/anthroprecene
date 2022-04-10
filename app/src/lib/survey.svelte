<script>
    let viewing
    import Chart from "$lib/chart.svelte";
    import StarSelect from "$lib/starSelect.svelte";
    const qs = [
        {name: "Brushing your teeth", des: "Do you find brushing your teeth just part of your normal life? If so, what rating does something normal get?", rating: null},
        {name: "Auotmatic carwashes", des: "With mechanical whirring aglore, automatic carwashes are ", rating: null}
    ]
    let results = [
        
    ];
    function update() {
        
        results = qs.map((el) => {
            return {name: el.name, rating: el.rating}
        })
        
    }
    //$: qs && update();
    async function submitSurvey () {
        update()
        alert(JSON.stringify(results))
        let res = await fetch("/api/surveySubmit", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(results)
        })
        alert(await res.text())
        viewing = true;
    }

                
    
</script>

<Chart />

{#if !viewing}
    {#each qs as q}
        <h3>{q.name}</h3>
        <p>{q.des}</p>
        <StarSelect bind:rating = {q.rating}/>
    {/each}
    <button on:click={submitSurvey}>
        Submit Survey and View Results
    </button>
{/if}
{#if viewing}
    <h1>Thanks for completing!</h1>
{/if}