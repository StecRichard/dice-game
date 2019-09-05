import axios from "axios"

export const throwDices = async () => {
  try {
    const response = await axios.get('https://www.random.org/integers/?num=3&min=1&max=6&col=1&base=10&format=plain&rnd=new');

    return response.data.split("\n").filter(m => m).map(m => parseInt(m));
  } catch (error) {
    console.error(error);
  }
}
