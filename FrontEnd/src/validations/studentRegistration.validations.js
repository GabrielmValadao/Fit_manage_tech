import * as yup from 'yup';

export const schemaStudentRegistrationForm = yup.object().shape({
    name: yup.string().required("O nome é obrigatório").max(255, 'O nome é muito longo'),
    email: yup.string().required("O email é obrigatório").email('O email não é valido').max(255, 'O email é muito longo'),
    cpf: yup.string().required("O cpf é obrigatório").matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'O CPF deve estar no formato 000.000.000-00'),
    contact: yup.string().required('O telefone é obrigatório').max(20, 'O telefone ultrapassou a quantidade de digitos permitida'),
    dateBirth: yup.date(),
    cep: yup.string().required('O CEP é obrigatório'),
    street: yup.string().required('O logradouro é obrigatório'),
    number: yup.string().required('O número da residência é obrigatório'),
    neighborhood: yup.string().required('O bairro é obrigatório'),
    city: yup.string().required('A cidade é obrigatória'),
    state: yup.string().required('O estado é obrigatório').max(2, 'Digite apenas a sigla do seu estado'),
}) 