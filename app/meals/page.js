import {Suspense} from 'react';
import Link from 'next/link';

import MealsGrid from '@/components/meals/meals-grid';
import classes from './page.module.css';
import {getMeals} from '@/lib/meals';

export const metadata = {
    title: 'All Meals',
    description: 'Borse the delicous meals hared by our community'
};

//this function can be set to async directly if necessary. This is allowed in Next.js since these are server components
async function FetchMeals() {
    const meals = await getMeals();
    return <MealsGrid meals={meals}/>
}
export default function Meals() {
    
    //Suspense is used to handle the loading state of the FetchMeals component
    //Is the same thing that loading.js does, but suspense is more granular
    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals, created <spa className={classes.highlight}>by you</spa></h1>
                <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href='meals/share'>
                        Share your favorite recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <FetchMeals />
                </Suspense>
                
            </main>
        </>
    );
}