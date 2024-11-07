import Image from 'next/image';
import {notFound} from 'next/navigation';

import {getMeal} from '@/lib/meals';
import classes from './page.module.css';

//This function is used to generate the metadata for the page
//NextJs looks for it and runs it automatically, therefore it has to be named generateMetadata
export async function generateMetadata({params}) {

    const meal = getMeal(params.mealSlug);
   
    if(!meal)
        notFound();

    return {
        title: meal.title,
        description: meal.summary
    };
}

//The page.js receives the params object from props
//The params object contains the key which is the name of the dynamic folder in this case mealSlug and the value is the part of the url we need to search the meal
export default function MealDetailsPage({params}) {
    const meal = getMeal(params.mealSlug);

    if(!meal)
        notFound();

    meal.instructions = meal.instructions.replace(/\n/g, '<br>')

    return (
       <>
        <header className={classes.header}>
            <div className={classes.image}>
                <Image src={meal.image} alt={meal.title} fill/>
            </div>
            <div className={classes.headerText}>
                <h1>{meal.title}</h1>
                <p className={classes.creator}>
                    by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                </p>
                <p className={classes.summary}>{meal.summary}</p>
            </div>
        </header>
        <main>
            <p className={classes.instructions} dangerouslySetInnerHTML={{
                __html: meal.instructions,
            }}></p>
        </main>
       </>
    );
}