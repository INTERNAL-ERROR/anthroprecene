<script>
    let viewing
    import Chart from "$lib/chart.svelte";
    import StarSelect from "$lib/starSelect.svelte";
    const qs = [
        {name: "Brushing your teeth", des: "Do you find brushing your teeth just part of your normal life? If so, what rating does something normal get?", rating: 0},
        {name: "Auotmatic carwashes", des: "With mechanical whirring aglore, automatic carwashes are machines of wonder. Are they useful? Beautiful? Ingenious?", rating: 0},
        {name: "Programming", des: "40% banging your fingers on a keyboard, 40% banging your head on a table, 19% messing with things you don't know, 1% YES IT FINALLY WORKS! Wait why?"},
        {name: "Morning Air", des: "The air is crisp and cool in the morning, and little wind disrupts the world's waking sounds."},
        {name: "Monopoly", des: "Whether you play this with cuthroat trading or with alliances, Monopoly is a great way to spend an entire day playing boardgames. But how good is it?"},
        {name: "Cats", des: "Choose carefully."},
        {name: "Dogs", des: "Choose carefully."},
        {name: "Trees that shed like Huskies", des: "Pinecones, neddles, leaves, small branches, large branches - all deposited onto your front yard for cleaning."},
        {name: "Shakespearean Insults", des:"You cream faced loon! Luxirious Mountain Goat! You are thou art a barbarious tratior."},
        {name: "Water Activities", des: "Swimming, diving, fishing, boating, drinking water."},
        {name: "Really long books", des: "As long as the book itself is good, more is better!"},
        {name: "High Schoolers", des: "We're only 8th graders - we can still have bad opinions about foolish high schoolers - right?"},
        {name: "Summer Break", des: "Do you love it? Get bored? Can't stand being home all day long? Whatever you choose, remember you can sleep in!"},
        {name: "Cilantro", des: "Strong opinions on this one...."},
        {name: "Poetry", des: "Poetry is either enjoyed, or it is employed."},
        {name: "Middle School", des: "Choas."},
        {name: "Surveys With Too Many Questions", des: "..."}
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
        window.scrollTo(0,0)
        
        //console.log(otherResults)
        //console.log(otherResults)
        
    }

                
    
</script>


<div class = "sidebar">
    <div class = "a"><div></div></div>
    <div class = "b">
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
            <h2>Thanks for completing!</h2>
            <p>Below, you can view charts of all of the results!</p>
                
                {#each qs as q}
                    
                    {#key otherResults}
                        <h3 style = "text-align: center;">{q.name}</h3>
                        <Chart  dataIn = "{otherResults[q.name.replaceAll(' ', '$')]}" />
                    {/key}
                {/each}
            
        {/if}
    </div>
    <div class = "a"><div></div></div>
<!---a-->
</div>
<style>
    .sidebar {
        display: grid;
        grid-template-areas: "a" "b" "a";
        grid-template-columns: 1fr 4fr 1fr;
    }
    .sidebar div.a {
        grid-area: "a";
        display: flex;
        justify-content: center;
        align-items: center;

        

    }
    .sidebar div.a div {
        width: 25px;
        height: 100%;
        background: url(https://previews.123rf.com/images/vectora/vectora1702/vectora170200047/71184541-netz-von-linien-wiederholbares-muster-einfache-geometrische-textur-mit-gitter-aus-geraden-parallelen.jpg);
    }
    .sidebar div.b {
        grid-area: "b";
    }
</style>