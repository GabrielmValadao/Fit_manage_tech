import * as yup from 'yup';

export const schemaMealForm = yup.object().shape({
    meal_plan_id: yup
    .number()
    .integer()
    .required("O plano de alimentação é obrigatório"),
    hour: yup
    .string()
    .required("O horário de alimentação é obrigatório"),
    title: yup
    .string()
    .required("A refeição é obrigatória"),
    description: yup
    .string()
    .required("A descrição é obrigatória")
    
}) 