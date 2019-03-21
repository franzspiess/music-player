const paramCreator = (obj) => {
  console.log(obj)
  let param = 'search?media=music&'
    .concat(`term=${termConcat(obj.term)}&entity=song`);
  (obj.attribute && obj.attribute.length) && (param = param.concat(`&attribute=${obj.attribute}`))
  console.log(param)
  return param;
}

const termConcat = (str) => {
  return str.split(' ').join('+').toLowerCase();
}

console.log(paramCreator({term:'Mark Anthony', entity:'album'}));

export {
  paramCreator
}
