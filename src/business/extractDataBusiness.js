function extractData(codigo) {
  const extractCode = /(\d{6}|\d{5})/g;
  const extractName = /(\s(?!\d).*?\D*)/g;
  const extractDescription = /((\d{2})|(\d{2})).*(?:(\s\(cm\)))/g;
  const extractPrice = /((R\$\s)\b\s*\d+\,\d*)/g;

  const code = (codigo.match(extractCode));
  const name = (codigo.match(extractName));
  const description = (codigo.match(extractDescription));
  const price = (codigo.match(extractPrice));
  console.log(`Codigo ${code}`);
  console.log(`Nome" ${name}`);
  console.log(`Descricao ${description}`);
  console.log(`Preco ${price}`);
  const teste4 = codigo.replace(/\|\s/g, '');
  console.log(teste4);
}
/*
  \d{5}\D\d- codigo aVON

  (\d{3}|\d{2})(›|,)\d{2}-- preco

  */
