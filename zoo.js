class Animal {
  speak(phrase = '') {
    return `${phrase.trim()} `
      .split(/\s+/g)
      .join(` ${this.sound} `)
      .trim()
  }
}

class Lion extends Animal {
  sound = 'roar'
}

class Tiger extends Animal {
  sound = 'grrr'
}

const lion = new Lion()
console.log("I'm roar a roar lion roar")
console.log(lion.speak("I'm a lion"))
console.log(lion.speak())
console.log(lion.speak(""))
console.log(lion.speak(" "))
console.log(lion.speak(" Hi"))
console.log(lion.speak("Hi "))
console.log(lion.speak("Hi    there"))

const tiger = new Tiger()
console.log("Lions grrr suck grrr")
console.log(tiger.speak("Lions suck"))