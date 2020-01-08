//https://medium.com/@captaindaylight/get-a-subset-of-an-object-9896148b9c72
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
export const createInputField = field => {
  return (({type, value, onChange}) => ({type, value, onChange}))(field)
}
