<template>     
     <div>
    <div class="header pb-8 pt-4">
      <b-container fluid>
        <span class="mask bg-primary opacity-8"></span>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col md="12" class="order-xl-1">
         <BasicQuestion/>
        </b-col>
      </b-row>
    </b-container>
  </div>
  
</template>

<script>
import BasicQuestion from '@/components/BasicQuestion/BasicQuestion.vue';
export default {
components: {
      BasicQuestion,
    
    },
}
</script>

<style scoped>
</style>
