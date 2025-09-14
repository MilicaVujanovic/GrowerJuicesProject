const BASE_URL = 'https://ehgxj7qtmbqd7dsg4ic6uzumma0pdkhj.lambda-url.eu-north-1.on.aws';

export const JUICE_URL = BASE_URL + '/api/juices';
export const JUICE_TAGS_URL = JUICE_URL + '/tags';

export const JUICE_BY_SEARCH_URL = JUICE_URL + '/search/';
export const JUICE_BY_TAG_URL = JUICE_URL + '/tag/';
export const JUICE_BY_ID_URL = JUICE_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';

export const ORDER_NEW_FOR_CURRENT_USER_URS = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';


export const USER_UPDATE_URL = BASE_URL + '/api/users/update';
export const USER_DELETE_URL = BASE_URL + '/api/users/delete';
export const USERS_URL = BASE_URL + '/api/users';

export const ORDER_LIST_URL = ORDERS_URL + '/orders';

export const ADD_JUICE_URL = JUICE_URL + '/add';
export const UPDATE_JUICE_ID_URL = JUICE_URL + '/update';
export const DELETE_JUICE_ID_URL = JUICE_URL + '/delete';

export const ORDER_PAY_ON_DELIVERY_URL = ORDERS_URL +'/payOnDelivery';























