<script>
     const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
     export let dataIn;
     
     import { onMount } from 'svelte';
      import Chart from 'chart.js/auto/auto.js';

      
      let portfolio;
      onMount(()=> {
    let datee = [
        (function() {
            return countOccurrences(dataIn, 0)
        })(),
        (function() {
            return countOccurrences(dataIn, 1)
        })(),
        (function() {
            return countOccurrences(dataIn, 2)
        })(),
        (function() {
            return countOccurrences(dataIn, 3)
        })(),
        (function() {
            return countOccurrences(dataIn, 4)
        })(),
        (function() {
            return countOccurrences(dataIn, 5)
        })(),
    ];
          

      const data = {
            labels: ['Zero Stars','One Stars', 'Two Stars', 'Three Stars', "Four Stars", "Five Stars"],
            datasets: [
                {
                    label: 'My First Dataset',
                    data: datee,
                    backgroundColor: ['#000000', '#B0413E', '#C9533B', '#E5E000', '#36C77A', '#519872'],
                    // hoverOffset: 4,
                    borderWidth: 0
                }
            ]
        };
        const config = {
            type: 'doughnut',
            data: data,
            options: {
                //borderRadius: '90',
                responsive: true,
                cutout: '10%',
                spacing: 0,
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 14
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: ""
                    }
                }
            }
        };
        const ctx = portfolio.getContext('2d');
        // Initialize chart using default config set
        var myChart = new Chart(ctx, config);
      })
</script>

<canvas bind:this = {portfolio} width = {400} height = {400} />

<style>
    canvas {
        max-width: 400px;
        max-height: 400px;
        margin-left: auto;
        margin-right: auto;
    }
</style>