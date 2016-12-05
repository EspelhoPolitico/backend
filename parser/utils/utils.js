// fixme: need explanation about the variables in the replace function.
String.prototype.capitalize = function() {
  let lower = this.toLowerCase();
  return (
    lower.replace( /(^|\s)([a-z])/g , (lixo, space, initialLetter) => {
      return space + initialLetter.toUpperCase();
    })
  )
};