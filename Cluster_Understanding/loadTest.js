const axios = require('axios');
const { performance } = require('perf_hooks');

const totalRequests = 1000;
const startTime = performance.now();

let completed = 0;
let withornot = 0;

for (let i = 0; i < totalRequests; i++) {
    axios.get('http://localhost:3000/heavy')
        .then(res => {
            completed++;
            if (completed === totalRequests) {
                const endTime = performance.now();
                if(withornot == 0){
                    console.log(`All ${totalRequests} requests completed in ${Math.round(endTime - startTime)} ms without`);
                }else{
                    console.log(`All ${totalRequests} requests completed in ${Math.round(endTime - startTime)} ms with`);
                }
            }
        })
        .catch(err => console.error(err.message));
}
