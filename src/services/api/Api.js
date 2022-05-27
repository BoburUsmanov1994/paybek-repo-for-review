import React from 'react';
import {request} from "./../api";

class Api {
    static getAll = (url, config) => {
        return request.get(url, config);
    }
    static getOne = (url, config) => {
        return request.get(url, config);
    }
}

export default Api;
