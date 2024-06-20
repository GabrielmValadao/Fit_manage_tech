import { describe, expect, it} from 'vitest'
import { flushPromises, mount } from "@vue/test-utils"
import AvaliationStep02 from './AvaliationStep02.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { concatId } from '@/utils/getComponent'
import { createRouter } from 'vue-router'
import { createMemoryHistory } from 'vue-router/dist/vue-router.cjs'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Testa página de avaliação", () => {
    it ("Espera-se que a tela seja renderizada", () => {
        const component = mount(AvaliationStep02)
        expect(component).toBeTruthy()
    })
    it("Espera-se que exiba 4 cards na tela", async () => {

        const component = mount(AvaliationStep02, {
            global: {
                plugins: [vuetify]
            }
        })
        await flushPromises()       
        const cards = component.findAll(concatId('card-item'))      
        expect(cards).toHaveLength(4)
    })
    it("Espera-se que as imagens svg sejam carregadas", async () => {
        const component = mount(AvaliationStep02)
        await flushPromises()
        const images = component.findAll('img')
        expect(images).toBeTruthy()
    })
    it("Espera-se que sejam carregadas 4 imagens", async () => {
        const component = mount(AvaliationStep02)
        await flushPromises()
        const images = component.findAll('img')
        expect(images).toHaveLength(4)
    })
    it("Espera-se que as imagens tenham os atributos corretos", async () => {
        const component = mount(AvaliationStep02)
        await flushPromises()
        const images = component.findAll('img')
        images.forEach((img, index) => {
        expect(img.attributes('src')).toContain(`../src/assets/avaliation-images/${getOriginalImageName(index)}`)
        expect(img.attributes('height')).toBe('150')
        expect(img.attributes('width')).toBe('150')
        expect(img.attributes('alt')).toBe(getImageAlt(index))
        })
        function getOriginalImageName(index) {
            switch (index) {
                case 0:
                    return 'front.svg';
                case 1:
                    return 'right.svg';
                case 2:
                    return 'back.svg';
                case 3:
                    return 'left.svg';
                default:
                    return '';
            }
        }
        
        function getImageAlt(index) {
            switch (index) {
                case 0:
                    return 'Homem virado para frente';
                case 1:
                    return 'Homem virado para direita';
                case 2:
                    return 'Homem virado para trás';
                case 3:
                    return 'Homem virado para esquerda';
                default:
                    return '';
            }
        }    

    })
    it("Espera-se que tenham dois botões em cada card", async () => {
        const component = mount(AvaliationStep02)
        await flushPromises()
        const cards = component.findAll('.button-container')
        expect(cards).toBeTruthy()
        cards.forEach(card => {
            const buttons = card.findAll(concatId('button'))
            expect(buttons).toHaveLength(2)
        })
    })
    it("Espera-se que ao adicionar uma foto a imagem do card mude", async () => {
        const component = mount(AvaliationStep02)
        await flushPromises()
        const cards = component.findAll('.button-container')
        
        cards.forEach(async (card) => {
            const addButton = card.find(concatId('button')) 
            await addButton.trigger('click')
            await flushPromises()
            const image = card.find('.image-container img')
            expect(image.exists()).toBeTruthy()
        })
    })
    it("Espera-se que ao clickar no botão voltar o usuário seja redirecionado para a avaliation step 1", async () => {
        const history = createMemoryHistory()
        const router = createRouter({
            history,
            routes: [
                { path: '/avaliation/step1' },
                { path: '/avaliation/step2' },
            ]
        })
        const component = mount(AvaliationStep02, {
            global: {
                plugins: [router]
            }
        })
        const backButton = component.find('.btn-back')
        await backButton.trigger('click')
        await router.isReady()
        expect(router.currentRoute.value.path).toBe('/avaliation/step1')
    })
    it("Espera-se que ao clickar no botão próximo o usuário seja redirecionado para a avaliation step 3", async () => {
        const history = createMemoryHistory()
        const router = createRouter({
            history,
            routes: [
                { path: '/avaliation/step1' },
                { path: '/avaliation/step2' },
                { path: '/avaliation/step3' } 
            ]
        })
        const component = mount(AvaliationStep02, {
            global: {
                plugins: [router]
            }
        })
        component.vm.imageLinks = [
            'blob:1',
            'blob:2',
            'blob:3',
            'blob:4'
        ]
        
        const nextButton = component.find('.btn-next')
        await nextButton.trigger('click')
        await router.isReady()
        expect(router.currentRoute.value.path).toBe('/avaliation/step3')
    })
    it("Espera-se que ao clicar no botão próximo sem todas as fotos adicionadas, o snackbar seja exibido", async () => {
        const history = createMemoryHistory()
        const router = createRouter({
            history,
            routes: [
                { path: '/avaliation/step1' },
                { path: '/avaliation/step2' },
                { path: '/avaliation/step3' } 
            ]
        })
        const component = mount(AvaliationStep02, {
            global: {
                plugins: [router]
            }
        })
        
        component.vm.imageLinks = [
            'blob:1',
            'blob:2',
            'blob:3'
        ]
        
        const nextButton = component.find('.btn-next')
        await nextButton.trigger('click')
        await router.isReady()
        expect(component.find('.custom-snackbar').exists()).toBe(true)
    })
}) 
