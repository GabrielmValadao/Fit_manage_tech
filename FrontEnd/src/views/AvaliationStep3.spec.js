import { mount } from '@vue/test-utils'
import { describe, expect, it} from 'vitest'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

import AvaliationStep03 from '@/components/AvaliationStep03.vue'

describe("3ª tela do formulário de avaliação", () => {

  it("Espera-se que a tela seja renderizada", () => {
    const component = mount(AvaliationStep03, {
      global: {
        plugins: [vuetify]
    }
    })

    expect(component).toBeTruthy()
  })

  it("Espera-se que seja enviando corretamente a submissão do formulário", () => {
    const component = mount(AvaliationStep03, {
      global: {
        plugins: [vuetify]
    }
    })
    
    component.getComponent("[data-test='input-torax']").setValue("45")
    component.getComponent("[data-test='input-braco_direito']").setValue("45")
    component.getComponent("[data-test='input-braco_esquerdo']").setValue("45")
    component.getComponent("[data-test='input-cintura']").setValue("45")
    component.getComponent("[data-test='input-antebraco_direito']").setValue("45")
    component.getComponent("[data-test='input-antebraco_esquerdo']").setValue("45")
    component.getComponent("[data-test='input-abdomen']").setValue("45")
    component.getComponent("[data-test='input-quadril']").setValue("45")
    component.getComponent("[data-test='input-coxa_direita']").setValue("45")
    component.getComponent("[data-test='input-coxa_esquerda']").setValue("45")
    component.getComponent("[data-test='input-panturrilha_direita']").setValue("45")
    component.getComponent("[data-test='input-panturrilha_esquerda']").setValue("45")
    component.getComponent("[data-test='input-punho']").setValue("45")
    component.getComponent("[data-test='input-biceps_femoral_direito']").setValue("45")
    component.getComponent("[data-test='input-biceps_femoral_esquerdo']").setValue("45")

    expect(component).toBeTruthy()
  })

  it("Deve falhar na submissão do formulário com campos vazios", async () => {
    const component = mount(AvaliationStep03, {
      global: {
        plugins: [vuetify],
      },
    });

    await component.find("form").trigger("submit.prevent");

    await component.vm.$nextTick();

    const validation = await component.vm.$refs.form.validate();
    expect(validation.valid).toBe(false);

  })
  
})