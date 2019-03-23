const paramCreator = (obj) => {
  let param = 'search?media=music&'
    .concat(`term=${termConcat(obj.term)}&entity=song`);
  (obj.attribute && obj.attribute.length) && (param = param.concat(`&attribute=${obj.attribute}`))
  return param;
}

const termConcat = (str) => {
  return str.split(' ').join('+').toLowerCase();
}


export {
  paramCreator
}
