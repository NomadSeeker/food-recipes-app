import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {    
    //this promise is not necesary, it was added for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 5000));

    //throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM meals').all();
}
//we use the ? after the were clause to avoid SQL injection
//instead using .get() because we only want one meal
export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    //we use slugify to create a slug from the title and then lower: true to make it lowercase
    meal.slug = slugify(meal.title, {lower: true});

    //we use xss to sanitize the input since it is html coming from the user
    meal.instructions = xss(meal.instructions);

    console.log(meal.image);
    //we obtain the file extension from the image
    const extension = meal.image.name.split('.').pop();

    //we create the file name using the slug and the extension
    const fileName = `${meal.slug}.${extension}`;

    //we create a stream using fs to write the image to the public folder path
    const stream = fs.createWriteStream(`public/images/${fileName}`);

    //we buffered the image with arrayBuffer, this returns a promise
    const bufferedImage = await meal.image.arrayBuffer();

    //we write the buffered image to the stream
    //since arrayBuffer returns an array that is not a buffer we need to convert it to a buffer using Buffer.from()
    //the second argument is a callback function that will be called when the writing is done or if there is an error
     stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error('Saving image failed');
        }
     });

    //since all requests for images will be sent automatically to the public folder hence we don't need to add public to the path
     meal.image =`/images/${fileName}`;

     //we insert the meal into the database
     //we use @ to indicate that the value is a parameter coming from the meal object in the run function, they have to be in the same order as the insert though
     db.prepare(`
        INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)`).run(meal);
}