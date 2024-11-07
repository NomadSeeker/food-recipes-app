'use server';

import {redirect} from 'next/navigation';

import { saveMeal } from './meals';

function isInvalidText(text) {
    return !text || text.trim() === '';
}

//formData is an object that contains all the data that was entered into the form
    export async function shareMeal(prevState, formData) {
        
      //get the title from the input with name title
      const meal = {
        title: formData.get('title'), 
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        creator: formData.get('name'),
        image: formData.get('image'),
        creator_email: formData.get('email'),
      }
      
     if(isInvalidText(meal.title) || 
     isInvalidText(meal.summary) || 
     isInvalidText(meal.instructions) || 
     isInvalidText(meal.creator) || 
     isInvalidText(meal.creator_email) ||
     !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0) {   
        //throw new Error('Invalid input');
        return {
            message: 'Invalid input'
        };
     }

      await saveMeal(meal);
      //revalidatePath is a function that will revalidate the data of the page with the given path
      //in this case we are revalidating the data of the page with the path /meals
      //if we which to target all nested paths we use (/meals, 'layout')
      //it throws away the cached data
      revalidatePath('/meals');
      redirect('/meals');
    }