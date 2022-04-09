<script>
    
    import Star from "$lib/star.svelte"
    let stars = [
        {num: 1, title: "One Star"},
        {num: 2, title: "Two Stars"},
        {num: 3, title: "Three Stars"},
        {num: 4, title: "Four Stars"},
        {num: 5, title: "Five Stars"},
    ];

    export let rating = 0;

    
    
    function changeRating (event){
        //alert(event.detail.to)
        rating = event.detail.to;
        //alert(rating);
    }
</script>
<span class= "container">
{#each stars as star}
    <Star on:changeRating={changeRating} title = "{star.title}"  filled = "{ rating >= star.num}" num = "{star.num}" />
    
{/each}
</span>
