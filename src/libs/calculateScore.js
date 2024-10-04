const conditions = [
  {
    type: 'haveOnly',
    value: {
      meat: 'dragonMeat'
    }
  },
  {
    type: 'specificModify',
    value: {
      dragonMeat: -5
    }
  },
  {
    type: 'doNotHave',
    value: ['amalo']
  },
  {
    type: 'looseModify',
    value: {
      meat: 1
    }
  },
  {
    type: 'mustHave',
    value: ['mysticMushroom', 'rainbowMushroom']
  },
  {
    type: 'replace',
    value: {
      replace: 'meat',
      with: 'tempo',
      quantity: 1
    }
  },
  {
    type: 'doubleV',
    value: 'vegetable'
  },{
    type: 'doubleM',
    value: 'meat'
  },
  {
    type: 'doNotHaveInType',
    value: ['meat']
  }
]



 function calculatePrice(order, result) {
  
 }
