<script>
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
    function submitSurvey () {
        update()
        alert(JSON.stringify(results))
        fetch("/api/surveySubmit", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(results)
        })
    }
    
</script>

{#each qs as q}
    <h3>{q.name}</h3>
    <p>{q.des}</p>
    <StarSelect bind:rating = {q.rating}/>
{/each}
<button on:click={submitSurvey}>
    Submit Survey and View Results
</button>