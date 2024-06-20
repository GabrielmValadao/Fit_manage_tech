<template>
  <!-- É importante que TODO o código da sua página esteja dentro de uma div com uma classe container
        para garantir o correto funcionamento do menu -->
  <div class="container">
    <!-- TODO CONTEÚDO DA SUA PÁGINA AQUI DENTRO, NADA FORA -->

    <v-text-field
      v-model="name"
      label="Nome completo"
      type="text"
      variant="outlined"
      :error-messages="errors.name"
    >
      <!-- Input estilo padrão, não alterar variant -->
    </v-text-field>

    <v-btn
      type="submit"
      variant="elevated"
      color="grey-darken-4 text-amber"
      class="font-weight-bold"
      size="large"
    >
      <!-- Botão estilo padrão, não alterar variant, pode inverter a cor do botão com o texto além de usar as outras cores da paleta -->
    </v-btn>
  </div>
</template>

<style>
/* Espaçamentos já estão configurado  no main js, para o correto funcionamento do menu, 
nessa página você pode definir width 100% */
</style>

<script>
// Precisei criar algumas rotas para testar o menu, preferencialmente utiliza-las, se for mudar, alterar o componente do menu;
// Em todas rotas anexei esse arquivo PaginaExemplo.vue, alterar;
</script>
