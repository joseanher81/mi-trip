import { ChangeEvent, useEffect, useMemo, useState } from "react";

export const useForm = ( initState: any, formValidations?: any ) => {
  
    const [ formData, setFormData ] = useState(initState);
    const [ formValidation, setFormValidation ] = useState<Record<string, [()=>boolean, string]>>({});

    useEffect( () => {
        createValidators();
    }, [ formData ]);
    

    const onChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const resetForm = () => setFormData({...initState});

    const createValidators = () => {

        if( formValidations === undefined ) return;
        const formCheckedValues: any = {};

        for(const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage ] = formValidations[ formField ];

            formCheckedValues[`${ formField }Valid`] = fn(formData[formField]) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
        console.log("FV " + JSON.stringify(formValidation))
    }

    const isFormValid = useMemo(() => {
        
        for(const formField of Object.keys(formValidation)) {
            if(formValidation[formField] !== null) return false;
        }
        return true;

    }, [formValidation])



    return {
        // Properties
        ...formData,
        formData,
        ...formValidation,

        // Methods
        onChange,
        resetForm,
        isFormValid
    }

}
