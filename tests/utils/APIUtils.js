class APIUtils {

    // whoever accesing this class has to provide apicontext and loginPayload
    constructor(apicontext, loginPayload) {
        this.apiContext = apicontext //this is called instance variable
        this.loginPayload = loginPayload
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data:this.loginPayload})
        if(loginResponse.ok()){
            const jsonResponse = await loginResponse.json();
            const token = jsonResponse.token;
            return token;
        } else {
            throw new Error(`Failed to get token: ${loginResponse.status()} ${loginResponse.statusText()}`);
        }
    }

    // async createOrder(orderPayload) {
    //     let response = {};
    //     response = await this.getToken();
    //     const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    //         data:orderPayload,
    //         headers:{
    //             'Authorization': response,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     if(orderResponse.ok()){
    //         const orderResponseJson = await orderResponse.json();
    //         const orderId = orderResponseJson.orderId;
    //         console.log(`Order ID: ${orderResponseJson.orderId}`);
    //         return orderId;
    //     } else {
    //         throw new Error(`Failed to create order: ${orderResponse.status()} ${orderResponse.statusText()}`);
    //     }
    // }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data:orderPayload,
            headers:{
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        })
        if(orderResponse.ok()){
            const orderResponseJson = await orderResponse.json();
            const orderId = orderResponseJson.orderId;
            console.log(`Order ID: ${orderResponseJson.orderId}`);
            response.orderId = orderId; // attach orderId to response object This we are doing bcz we need orderId in our testcases to verify in UI
            // this response has both token and orderId now which we need in our test to login directly and verify order in UI
            return response;
        } else {
            throw new Error(`Failed to create order: ${orderResponse.status()} ${orderResponse.statusText()}`);
        }
    }



}
// common JS module.exports = {APIUtils};
export default APIUtils;



// ES modules: import APIUtils from './tests/utils/APIUtils.js';
// If you need CommonJS instead, use: const APIUtils = require('./tests/utils/APIUtils.js');


// Short summary — four behaviors:

// module.exports = {APIUtils};

// CommonJS exports an object with property APIUtils.
// Import (CJS): const { APIUtils } = require('./APIUtils');
// Import (ESM): import apiModule from './APIUtils.js'; const { APIUtils } = apiModule;
// module.exports = APIUtils;

// CommonJS exports the class/function directly.
// Import (CJS): const APIUtils = require('./APIUtils');
// Import (ESM): import APIUtils from './APIUtils.js';
// export default {APIUtils};

// ESM default export is an object { APIUtils: ... } (not a named export).
// Import (ESM): import apiModule from './APIUtils.js'; const { APIUtils } = apiModule;
// You cannot do: import { APIUtils } from './APIUtils.js'; (that expects a named export)
// export default APIUtils;

// ESM default export is the class/function itself.
// Import (ESM): import APIUtils from './APIUtils.js';
// You can also add named exports separately if needed.
// Examples:
// // CommonJS exporting object
// module.exports = { APIUtils };
// // require:
// const { APIUtils } = require('./tests/utils/APIUtils.js');

// // CommonJS exporting value
// module.exports = APIUtils;
// // require:
// const APIUtils = require('./tests/utils/APIUtils.js');

// // ESM default export object
// export default { APIUtils };
// // import:
// import apiModule from './tests/utils/APIUtils.js';
// const { APIUtils } = apiModule;

// // ESM default export value (recommended for a single class)
// export default APIUtils;
// // import:
// import APIUtils from './tests/utils/APIUtils.js';

// Recommendation: pick one module system and one export style (for a single class prefer export default APIUtils for ESM, or module.exports = APIUtils for CommonJS).

