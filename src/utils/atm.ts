import { createLogger } from 'vuex'

export class Atm {
   private availableBanknotes = [
      { nominal: 5000, quantity: 2 },
      { nominal: 2000, quantity: 2 },
      { nominal: 1000, quantity: 2 },
      { nominal: 500, quantity: 2 },
      { nominal: 200, quantity: 2 },
      { nominal: 100, quantity: 2 },
      { nominal: 50, quantity: 2 },
   ]
   private balance: number | null = null

   calculateBalance() {
      this.balance = this.availableBanknotes.reduce(
         (sum, current) => sum + current.nominal * current.quantity,
         0,
      )
   }

   checkBalance() {
      this.calculateBalance()
      console.log(this.balance)
      console.log(this.availableBanknotes)
   }

   getCash(cashRequired: number) {
      let remainedSum = cashRequired
      const output = []
      const query = []
      this.calculateBalance()
      if (!this.balance) return
      if (cashRequired <= 0) return console.log('введите сумму больше нуля')
      if (cashRequired > this.balance) return console.log('недостаточно средств в терминале')
      if (cashRequired % 50) return console.log(`таких купюр не существует, попробуйте ${cashRequired - cashRequired % 50}`)

      for (let i = 0; i < this.availableBanknotes.length; i++) {
         const banknote = this.availableBanknotes[i]
         if (remainedSum >= banknote.nominal && banknote.quantity > 0) {
            query.push(banknote)
            output.push(banknote.nominal)
            remainedSum = remainedSum - banknote.nominal
            i--
         }
      }

      if (remainedSum > 0) return console.log(`Не могу выдать такую сумму, попробуйте ${cashRequired - remainedSum}`)

      for (let banknote of query) {
         banknote.quantity--
      }
      return console.log(output)
   }

   depositCash(cashRequired: { nominal: number; quantity: number }[]) {
      for (let availableBanknote of this.availableBanknotes) {
         cashRequired.map((item) => {
            if (item.nominal === availableBanknote.nominal) {
               availableBanknote.quantity += item.quantity
            }
         })
      }
      this.checkBalance()
   }
}
