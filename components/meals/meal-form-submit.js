'use client';

import {useFormStatus} from 'react-dom';

export default function MealFormSubmit() {
    //useFormStatus is a hook that allows us to access the status of the form
    //it returns an object with the status of the form
    //we destructure the object to get the status pending of the form
    const {pending} = useFormStatus();

    return (
        <button disabled={pending}>
            {pending ? 'Submitting...' : 'Share Meal'}
            
        </button>
    );
}