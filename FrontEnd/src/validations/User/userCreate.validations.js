import * as yup from 'yup'

export const schemaCreateUser = yup.object().shape({
  name: yup
    .string()
    .min(6, 'O nome deve ter no mínimo 6 caracteres.')
    .required('O nome é obrigatório.'),
  email: yup
    .string()
    .required('O campo email é obrigatório.')
    .email('O campo email deve conter um e-mail válido.'),
  profile: yup.string().required('O perfil é obrigatório.'),
  photo: yup
    .mixed()
    .nullable()
    .test('is-image', 'O arquivo deve ser uma imagem', (value) => {
      if (!value) return true
      const mimeTypes = ['image/jpeg', 'image/jpg', 'image/png']
      return mimeTypes.some((mimeType) => value.type.includes(mimeType))
    })
})
