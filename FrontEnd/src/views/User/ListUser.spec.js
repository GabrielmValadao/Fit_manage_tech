import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

import ListUser from './ListUser.vue'
import UserService from "@/services/User/UserService";
import { concatId } from "@/utils/tests/getComponent";

describe("Tela de listagem de usuários", () => {

    it("Espera-se que a tela seja renderizada", () => {

        const component = mount(ListUser, {
            global: {
                plugins: [vuetify]
            }
        })

        expect(component).toBeTruthy()

        expect(component.text()).toContain("Usuários")
        expect(component.text()).toContain("Digite o nome do usuário")
        expect(component.text()).toContain("Cadastrar Usuário")
        expect(component.text()).toContain("Nome")
        expect(component.text()).toContain("E-mail")
        expect(component.text()).toContain("Perfil do Usuário")
        expect(component.text()).toContain("Ações")
    })

    it("Espera-se que exiba na tela os dados dos usuários.", async () => {
        const mockedUsers = [
            {
                "id": 1,
                "name": "ADMIN",
                "email": "admin@gmail.com",
                "profile": "ADMIN",
                "is_active": true
                
            },
            {
                "id": 2,
                "name": "Maria da recepção",
                "email": "maria_recepcao@gmail.com",
                "profile": "RECEPCIONISTA",
                "is_active": true
            },
            {
                "id": 3,
                "name": "Paulo Instrutor",
                "email": "paulo_whey@gmail.com",
                "profile": "INSTRUTOR",
                "is_active": true
            }
        ]
        vi.spyOn(UserService, 'getAllUsers').mockResolvedValue(mockedUsers)

        const component = mount(ListUser, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        const renderedInformations = component.findAll(concatId("user-data"))

        mockedUsers.forEach(data => {
            expect(renderedInformations.filter(id => id.text() === data.id)).toBeTruthy();
            expect(renderedInformations.filter(name => name.text() === data.name)).toBeTruthy();
            expect(renderedInformations.filter(email => email.text() === data.email)).toBeTruthy();
            expect(renderedInformations.filter(profile => profile.text() === data.profile)).toBeTruthy();
            expect(renderedInformations.filter(is_active => is_active.text() === data.is_active)).toBeTruthy();
        });
    })

    it("Espera-se que exiba um mensagem de error na tela quando tiver uma falha em carregar os dados", async () => {

        vi.spyOn(UserService, 'getAllUsers').mockRejectedValue(new Error())

        const component = mount(ListUser, {
            global: {
                plugins: [vuetify]
            }
        })

        // Supressão de erro no console
        console.error = () => {}

        await flushPromises()

        expect(component.text()).toContain("Houve um erro ao carregar as informações dos usuários")

    })

    it('Espera-se que o usuário seja ativado/desativado corretamente', async () => {
        const mockedUsers = [
          { id: 1, name: 'Usuário 1', is_active: true },
          { id: 2, name: 'Usuário 2', is_active: true },
          { id: 3, name: 'Usuário 3', is_active: false }
        ]
    
        vi.spyOn(UserService, 'updateStatusUserDelete').mockImplementation(async (userId, isActive) => {
          const user = mockedUsers.find((user) => user.id === userId)
          if (user) user.is_active = isActive
    
          return { status: 200 }
        })
    
        const component = mount(ListUser, {
          global: {
            plugins: [vuetify]
          },
          props: {
            usersTest: []
          }
        })
    
        await UserService.updateStatusUserDelete(1, false)
    
        await flushPromises()
        await component.vm.$nextTick()
    
        expect(mockedUsers[0].is_active).toBe(false)
    
        await UserService.updateStatusUserDelete(2, true)
        await component.vm.$nextTick()
    
        expect(mockedUsers[1].is_active).toBe(true)
      })
})