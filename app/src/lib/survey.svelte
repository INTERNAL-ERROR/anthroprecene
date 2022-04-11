<script>
    let viewing
    import Chart from "$lib/chart.svelte";
    import StarSelect from "$lib/starSelect.svelte";
    const qs = [
        {name: "Brushing your teeth", des: "Do you find brushing your teeth just part of your normal life? If so, what rating does something normal get?", rating: 0},
        {name: "Auotmatic carwashes", des: "With mechanical whirring aglore, automatic carwashes are ", rating: 0}
    ]
    let results = [
        
    ];
    let otherResults = [
        
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
        let rese = await res.json()
        alert(rese)
        viewing = true;
        otherResults = rese.data
        otherResults = otherResults.map(d => {return {survey: d.survey}});
        otherResults = otherResults.map(d => {
            //console.log(d.survey)
            return [...d.survey]
        });
        let temp = {};
        otherResults.forEach(el1 => {
            el1.forEach(el2 => {
                let name = el2.name.replaceAll(" ", "$");
                if(temp[name] === undefined){
                    temp[name] = []; 
                }

                temp[name] = [...temp[name], el2.rating];
                console.log("a | " + temp[name])
            })
        })
        otherResults = temp;
        console.log(otherResults)
        
        
        //console.log(otherResults)
        //console.log(otherResults)
        
    }

                
    
</script>



{#if !viewing}
    {#each qs as q}
        <h3>{q.name}</h3>
        <p>{q.des}</p>
        <StarSelect bind:rating = {q.rating}/>
    {/each}
    <button on:click={submitSurvey}>
        Submi Survey and View Results
    </button>
{/if}
{#if viewing}
    <h1>Thanks for completing!</h1>
        
        {#each qs as q}
            <p>you</p>
            {#key otherResults}
                <Chart dataIn = "{otherResults[q.name.replaceAll(' ', '$')]}" label = "o"/>
            {/key}
        {/each}
    
{/if}