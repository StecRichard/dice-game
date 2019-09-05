import axios from "axios"

export const throwDices = async (count) => {
  try {
    const response = await axios.get('https://www.random.org/integers/?num=' + count + '&min=1&max=6&col=1&base=10&format=plain&rnd=new');
    console.log(response.data)
    if(Number.isInteger(response.data)){
      return [response.data]
    } else{
      return response.data.split("\n").filter(m => m).map(m => parseInt(m));
    }
  } catch (error) {
    console.error(error);
  }
}
