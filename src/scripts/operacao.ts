function expr(expr: string) {
  let normalizado = expr
    .replace(/,/g, ".")
    .replace(/[×xX]/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-");

  normalizado = normalizado.replace(
    /(\d+(?:\.\d+)?)%(\d+(?:\.\d+)?)/g,
    "($1*$2/100)"
  );

  const partes = normalizado.match(/(\d+(?:\.\d+)?|[+\-*/()])/g) || [];

  const calculo = partes.join("");

  let resultado;
  try {
    resultado = eval(calculo).toString();
  } catch {
    return "Erro :(";
  }

  resultado = resultado
    .replace(/NaN/g, "Erro :(")
    .replace(/Infinity/g, "Imensurável");

  return resultado.replace(/\./g, ",");
}
export default expr;
