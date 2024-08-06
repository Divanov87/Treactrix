import Cookies from 'js-cookie';

const options = (data) => {
    const options = {
        headers: {},
        credentials: 'include',
    };

    if (data) {
        options.body = JSON.stringify(data);
        options.headers['Content-Type'] = 'application/json';
    }

    const token = Cookies.get('user');
    if (token) {
        options.headers['Authorization'] = `${token}`;
    }

    return options;
};

const request = async (method, url, data) => {
    const response = await fetch(url, {
        method,
        ...options(data),
    });

    if (response.status === 204) {
        return;
    }
    
    let result;
    if (response && typeof response == 'object') {
        result = await response.json();
    } else {
        result = await response;
    }

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');



// import Cookies from 'js-cookie';

// const options = (data, abortSignal) => {
//     const options = {
//         headers: {},
//         credentials: 'include',
//         signal: abortSignal,
//     };

//     if (data) {
//         options.body = JSON.stringify(data);
//         options.headers['Content-Type'] = 'application/json';
//     }

//     const token = Cookies.get('user');
//     if (token) {
//         options.headers['Authorization'] = `${token}`;
//     }

//     return options;
// };

// const request = async (method, url, data, abortSignal) => {
//     const response = await fetch(url, {
//         method,
//         ...options(data, abortSignal),
//     });

//     if (response.status === 204) {
//         return;
//     }

//     let result;
//     if (response && typeof response === 'object') {
//         result = await response.json();
//     } else {
//         result = await response;
//     }

//     if (!response.ok) {
//         throw result;
//     }

//     return result;
// };

// export const get = request.bind(null, 'GET');
// export const post = request.bind(null, 'POST');
// export const put = request.bind(null, 'PUT');
// export const patch = request.bind(null, 'PATCH');
// export const del = request.bind(null, 'DELETE');
