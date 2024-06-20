import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard/Dashbord.vue'
import Login from '../views/Login/Login.vue'
import ListUser from '../views/User/ListUser.vue'
import NewUser from '../views/User/NewUser.vue'
import StudentMealPlans from '@/views/Student/StudentMealPlans.vue'
import WorkoutsStudentsList from '@/views/Student/WorkoutsStudentsList.vue'
import StudentRegistration from '../views/RecepcionistaViews/StudentRegistration.vue'
import ListStudents from '../views/RecepcionistaViews/ListStudents.vue'
import ListStudentWorkout from '@/views/InstructorViews/ListStudentWorkout.vue'

import Exercises from '../views/InstructorViews/ExercisesPage.vue'
import CreateStudentWorkout from '@/views/InstructorViews/CreateStudentWorkout.vue'

import AvaliationStep01 from '@/components/AvaliationStep01.vue'
import AvaliationStep02 from '@/components/AvaliationStep02.vue'
import AvaliationStep03 from '@/components/AvaliationStep03.vue'

import Avaliation from '../views/UnitaryAvaliation.vue'

import Meal from '../views/Meal.vue'
import ActiveStudents from '@/views/ActiveStudents.vue'

import Exemplo from '../views/PaginaExemplo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },

    //perfil usuário
    {
      path: '/users',
      name: 'Listagem de usuários',
      component: ListUser
    },
    {
      path: '/users/new',
      name: 'Novo usuário',
      component: NewUser
    },
    {
      path: '/users/:id/edit',
      name: 'Editar usuário',
      component: NewUser
    },

    //perfil recepcionista
    {
      path: '/students',
      name: 'ListStudents',
      component: ListStudents
    },
    {
      path: '/students/new',
      name: 'Novo Estudante',
      component: StudentRegistration
    },

    //perfil instrutor
    {
      path: '/exercises',
      name: 'Exercises',
      component: Exercises
    },
    {
      path: '/instructor/students',
      name: 'Listagem de estudantes do instrutor',
      component: Exemplo
    },
    {
      path: '/newWorkout/:id',
      name: 'CreateWorkout',
      component: CreateStudentWorkout
    },
    {
      path: '/instructor/:id/list-workouts',
      name: 'Listagem de treinos do aluno',
      component: ListStudentWorkout
    },
    {
      path: '/updateWorkout/:studentId/:workoutId',
      name: 'UpdateWorkout',
      component: CreateStudentWorkout
    },

    //perfil nutricionista
    {
      path: '/active/students',
      name: 'Listagem de estudantes ativos',
      component: ActiveStudents
    },
    {
      path: '/dietas/:id',
      name: 'Meal',
      component: Meal
    },
    {
      path: '/avaliation/step1',
      name: 'AvaliationStep01',
      component: AvaliationStep01
    },
    {
      path: '/avaliation/step2',
      name: 'AvaliationStep02',
      component: AvaliationStep02
    },
    {
      path: '/avaliation/step3',
      name: 'AvaliationStep03',
      component: AvaliationStep03
    },

    {
      path: '/avaliation/:studentId',
      name: 'avaliation',
      component: Avaliation
    },

    //perfil aluno
    {
      path: '/student/meal-plans',
      name: 'Planos de refeições do aluno',
      component: StudentMealPlans
    },
    {
      path: '/student/workouts',
      name: 'WorkoutsStudentsList',
      component: WorkoutsStudentsList
    }
  ]
})

export default router
