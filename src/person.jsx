function Person(props) {

  /*const name = "Meraj";
  const age = 21;
  const city = "Kandy";*/
 /* const add = (a,b) => {
    return a + b;
  }*/

console.log(props);


  return (
    <div style={{ 
      border: "2px solid black",
      padding: "20px",
      margin: "12px 0 0 0 ",

     }}
     >

        <h1>Hello {props.name} </h1>
      <h2>Your age is {props.age}</h2>
      <h3>you live in {props.city}</h3>
    


    </div>
  );
}

export default Person;
//<h4>the sum when 2 + 3 is : {add(2,3)}</h4>