 
    export const displayName = [ ( value: string ) => value.length >= 6, 'The name must have at least 6 characters'];
    export const email = [ (value: string ) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value);
        }, 'The email is not valid'];
    export const password= [ ( value: string ) => value.length >= 6, 'The password must have at least 6 characters'];

