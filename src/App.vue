<template>
   <Test />
   <button @click='checkBalance'>Проверить баланс</button>
   <div>
      <span>Будет внесено: {{ depositedSum }} руб.</span>
      <button
         v-for='note in depositedMoney'
         :key='note.nominal'
         @click='addMoney(note)'
      >
         {{ note.nominal }}
      </button>
      <button @click='depositCash'>Внести</button>
   </div>
   <div>
      <input type='number' v-model='inputCash' />
      <button @click='getCash'>Снять</button>
   </div>
</template>

<script setup lang='ts'>
import Test from '@/components/Test.vue'
import { Atm } from '@/utils/atm'
import { computed, reactive, ref } from 'vue'

const depositedMoney = reactive<{ nominal: number; quantity: number }[]>([
   { nominal: 50, quantity: 0 },
   { nominal: 100, quantity: 0 },
   { nominal: 200, quantity: 0 },
   { nominal: 500, quantity: 0 },
   { nominal: 1000, quantity: 0 },
   { nominal: 2000, quantity: 0 },
   { nominal: 5000, quantity: 0 },
])

const depositedSum = computed(() =>
   depositedMoney.reduce(
      (sum, current) => sum + current.nominal * current.quantity,
      0,
   ),
)

const atm = new Atm()

const checkBalance = () => {
   return atm.checkBalance()
}

const addMoney = (money: { banknote: number; quantity: number }) => {
   ++money.quantity
}

const depositCash = () => {
   atm.depositCash(depositedMoney)
   depositedMoney.map((item) => (item.quantity = 0))
}

const inputCash = ref<number>(0)
const getCash = () => {
   atm.getCash(inputCash.value)
   inputCash.value = 0
}
</script>

<style></style>
