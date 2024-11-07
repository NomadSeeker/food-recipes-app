'use client';

import {useFormState} from 'react-dom';

import classes from './page.module.css';

import ImagePicker from '@/components/meals/image-picker';
import {shareMeal} from '@/lib/actions';
import MealFormSubmit from '@/components/meals/meal-form-submit';


export default function ShareMealPage() {
  //useFormState is a hook that allows us to access the state of the form and the action that will be called when the form is submitted
  //the first argument is the action that will be called when the form is submitted and the second argument is an object with the initial state of the form
  const [state, formAction] = useFormState(shareMeal, {message: null});


  //action is the function that will be called when the form is submitted
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}> 
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label='Your image' name='image'/>
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}