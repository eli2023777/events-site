import { useState, useContext } from 'react';
import { GeneralContext } from '../App';
import axios from 'axios';


const useAPI = () => {
    const [data, setData] = useState(null);
    const [payload, setPayload] = useState('' || {});
    const [error, setError] = useState('');
    let { setApiData, setLoading } = useContext(GeneralContext);


    const callAPI = async (method = METHOD.GET_ALL, routes, payload, isBusiness, isNewUser) => {


        // Reset ApiData
        setApiData(null);

        const token = localStorage.getItem('token');
        setPayload(payload);
        let eventObj;
        let userObj;
        let loginObj;
        const API = 'http://localhost:7000';
        const newAPI = `${API}/${routes}`;

        if (payload) {
            eventObj = {
                title: payload.title,
                date: payload.date,
                time: payload.time,
                location: payload.location,
                description: payload.description,
                image: {
                    url: payload.url,
                    alt: payload.title,
                },
            };

            if (isNewUser) {

                userObj = {
                    name: {
                        first: payload.first,
                        last: payload.last,
                    },

                    isBusiness: isBusiness,

                    phone: payload.phone,
                    email: payload.email,
                    password: payload.password,


                    image: {
                        url: payload.url,
                        alt: payload.alt,
                    },

                    address: {
                        state: payload.state,
                        country: payload.country,
                        city: payload.city,
                        street: payload.street,
                        houseNumber: payload.houseNumber,
                        zip: payload.zip,
                    },
                };

            } else {
                userObj = {
                    name: {
                        first: payload.name?.first,
                        last: payload.name?.last,
                    },


                    phone: payload.phone,
                    email: payload.email,


                    image: {
                        url: payload.image?.url,
                        alt: payload.image?.alt,
                    },

                    address: {
                        state: payload.address?.state,
                        country: payload.address?.country,
                        city: payload.address?.city,
                        street: payload.address?.street,
                        houseNumber: payload.address?.houseNumber,
                        zip: payload.address?.zip,
                    },
                };
            }


            loginObj = {
                email: payload.email,
                password: payload.password,
            };
        };

        try {
            setLoading(true);
            let response;

            switch (method) {
                case METHOD.GET_ALL:
                    response = await axios.get(newAPI,
                        {
                            headers: {
                                'x-auth-token': token
                            }
                        }
                    );
                    break;

                case METHOD.GET_ONE:
                    response = await axios.get(`${newAPI}/${payload}`,
                        {
                            headers: {
                                'x-auth-token': token
                            }
                        }
                    );
                    break;

                case METHOD.GET_MY_EVENTS:
                    response = await axios.get(`${newAPI}/my-events`,
                        {
                            headers: {
                                'x-auth-token': token
                            }
                        }
                    );
                    break;

                case METHOD.CREATE:
                    response = await axios.post(newAPI,
                        routes === 'events' ? eventObj : userObj,
                        {
                            headers: {
                                'x-auth-token': token
                            }
                        }
                    );
                    break;

                case METHOD.LOG_IN:
                    response = await axios.post(newAPI,
                        loginObj,
                        {
                            headers: {
                                'x-auth-token': token
                            },
                        },
                    );
                    break;

                case METHOD.UPDATE:
                    response = await axios.put(`${newAPI}/${payload._id}`,
                        routes === 'events' ? eventObj : userObj,
                        {
                            headers: {
                                'x-auth-token': token
                            }
                        });
                    break;

                case METHOD.PATCH:
                    response = await axios.patch(`${newAPI}/${payload}`, {},
                        {
                            headers: {
                                'x-auth-token': token
                            }
                        });
                    break;


                case METHOD.DELETE:
                    response = await axios.delete(`${newAPI}/${payload}`,
                        {
                            headers: {
                                'x-auth-token': token
                            },
                        },

                    );
                    break;
            }

            setData(response.data); // Save on hook
            setApiData(response.data); // Save on Context

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    return [error, callAPI, payload, data];
}



export const METHOD = {
    GET_ALL: 'GET_ALL',
    GET_ONE: 'GET_ONE',
    GET_MY_EVENTS: 'GET_MY_EVENTS',
    CREATE: 'CREATE',
    LOG_IN: 'LOG_IN',
    UPDATE: 'UPDATE',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};




export default useAPI
