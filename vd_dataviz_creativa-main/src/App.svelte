<script>
  import * as d3 from "d3"
  import {onMount} from "svelte"

  /* Array donde guardaremos la data */
  let deportistas = []

  /* 1. Escala para edades */
  let grosor = d3.scaleLinear().range([5, 20])

  /* 2. Escala para genero */
  let colorGenero = d3
    .scaleOrdinal()
    .domain(["F", "M"])
    .range(["#ffc0cb", "#c0f9ff"])

  /* 3. Escala para continentes */
  let colorContinentes = d3
    .scaleOrdinal()
    .domain(["América", "África", "Asia", "Europa", "Oceanía"])
    .range(["#ed334e", "#000000", "#fbb132", "#009fe3", "#00963f"])

  /* 4. Escala para altura */
  let radioAltura = d3.scaleRadial()

  /* 5. Escala para medallas */
  let colorMedalla = d3.scaleOrdinal()
    .domain(["Oro", "Plata", "Bronce"])
    .range(["gold", "silver", "brown"])

  onMount(() => {
    d3.csv("./data/deportistas.csv", d3.autoType).then(data => {
      console.log(data)

      /* Actualizamos dominio con la data de edad */
      let minMaxEdad = d3.extent(data, d => d.edad)
      grosor = grosor.domain(minMaxEdad)

      /* Actualizamos dominio y rango con la data de altura */
      let minMaxAltura = d3.extent(data, d => d.altura)
      radioAltura = radioAltura.domain(minMaxAltura).range([25, 50])

      deportistas = data
    })
  })
</script>

<main>
  <div class="header">
    <img src="/images/olympics-logo.png" width="100" alt="anillos" />
    <h3 class="headline">
      <b>Triunfos Olímpicos</b>
      Medallas, alturas y continentes
    </h3>
    <p class="bajada">Explorando los logros olímpicos a través de datos</p>
  </div>

  <!-- Conedor de las entidades -->
  <div class="container">
    <!-- Iteramos la data para visualizar c/ entidad -->
    {#each deportistas as dep}
      <div class="person-container">
        <div class="medal"
          style="background-color: {colorMedalla(dep.medalla)}"
          ></div>
        <div
          class="person"
          style="border-width: {grosor(dep.edad)}px; 
        background-color:{colorGenero(dep.genero)}; 
        width: {2 * radioAltura(dep.altura)}px; 
        height: {2 * radioAltura(dep.altura)}px; 
        border-color: {colorContinentes(dep.continente)}"
        ></div>
        <p class="name">
          <b>{dep.nombre}</b>
          <br />
          {dep.continente}
        </p>
      </div>
    {/each}
  </div>
</main>

<style>
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 80px;
  }
  .headline {
    font-size: 30px;
    line-height: 1.2;
    font-weight: normal;
    text-align: center;
    margin: 20px;
  }
  .bajada {
    font-size: 18px;
    font-weight: normal;
    text-align: center;
    margin: 10px;
  }
  .headline b {
    display: block;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: end;
    margin: auto;
    flex-wrap: wrap;
    max-width: 1000px;
    gap: 30px;
    margin-bottom: 100px;
  }
  .person-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 180px 0 0;
  }
  .person {
    width: 100px;
    height: 100px;
    border: 10px solid black;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: pink;
  }
  .medal {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: gold;
    margin: 5px 0;
  }
  .name {
    font-size: 14px;
    color: rgb(65, 65, 65);
    font-weight: normal;
    text-align: center;
    margin-top: 5px;
  }
</style>
