import axios, { Axios, AxiosError } from "axios";




















































































// Apu Showed this to teach relation error handling
export async function dummy() {
    try {
        const res = await axios.get('url');
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error((error as AxiosError<{ message: string }>).response?.data.message);
    }
}

export async function testDummy(num: number) {
    try {
        const res = await isNumberEven(num);
        return res;
    } catch (error) {
        console.log('Error from inside testDummy:', error);
        throw new Error((error as Error).message);
    }
}


function isNumberEven(num: number) {
    return new Promise((resolve, reject) => {
        if (num % 2 === 0) return resolve(true);
        else reject(new Error('Number is not even'));
    })
}

// --------------------------------------------------------------