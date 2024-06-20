import * as yup from 'yup'

export const workoutSchema = yup.object().shape({
  repetitions: yup
    .number()
    .typeError('O número de repetições deve ser um número')
    .positive('O número de repetições deve ser maior que zero')
    .integer('O número de repetições deve ser um número inteiro')
    .required('O número de repetições é obrigatório'),
  weight: yup
    .number()
    .typeError('A carga deve ser um número')
    .min(0, 'A carga não pode ser negativa')
    .required('A carga é obrigatória'),
  break_time: yup
    .number()
    .typeError('O tempo de pausa deve ser um número')
    .min(0, 'O tempo de pausa não pode ser negativo')
    .max(120, 'O tempo de pausa não pode ser maior que 120 segundos')
    .required('O tempo de pausa é obrigatório')
})
