import * as yup from 'yup';

export const schemaExerciseForm = yup.object().shape({

    description: yup
        .string()
        .required("Por favor, digite o nome do exercício.")
        .max(150, 'A descrição do exercício é muito longa')        
});

