import * as R from 'ramda'

export const getByValue = R.curry((value, prop, list) =>
  R.find(item => R.equals(R.prop(prop, item), value), list)
)
