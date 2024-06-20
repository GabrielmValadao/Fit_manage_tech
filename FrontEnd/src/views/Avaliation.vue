<template>
    <v-layout>    
        <AvaliationStep01/>  
        <AvaliationStep02/>  
        <AvaliationStep03/>      

    </v-layout>
</template>

<script>
import AvaliationStep01 from '@/components/AvaliationStep01.vue';
import AvaliationStep02 from '@/components/AvaliationStep02.vue';
import AvaliationStep03 from '@/components/AvaliationStep03.vue';


export default {

    components: {
        AvaliationStep01,
        AvaliationStep02,
        AvaliationStep03

    }
}
</script>