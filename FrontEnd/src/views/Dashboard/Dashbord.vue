<template>
  <div>
    <dashboard-admin v-if="profile === 'ADMIN'"></dashboard-admin>
    <dashboard-receptionist v-else-if="profile === 'RECEPCIONISTA'"></dashboard-receptionist>
    <dashboard-instructor v-else-if="profile === 'INSTRUTOR'"></dashboard-instructor>
    <dashboard-nutritionist v-else-if="profile === 'NUTRICIONISTA'"></dashboard-nutritionist>
    <dashboard-student v-else-if="profile === 'ALUNO'"></dashboard-student>
  </div>
</template>

<script>
import DashboardAdmin from '@/components/Dashboard/DashboardAdmin.vue';
import DashboardReceptionist from '@/components/Dashboard/DashboardReceptionist.vue';
import DashboardInstructor from '@/components/Dashboard/DashboardInstructor.vue';
import DashboardNutritionist from '@/components/Dashboard/DashboardNutritionist.vue';
import DashboardStudent from '@/components/Dashboard/DashboardStudent.vue';

export default {
  components: {
    DashboardAdmin,
    DashboardReceptionist,
    DashboardInstructor,
    DashboardNutritionist,
    DashboardStudent
  },
  data() {
    return {
      profile: localStorage.getItem('@profile'),
    };
  },
};
</script>
