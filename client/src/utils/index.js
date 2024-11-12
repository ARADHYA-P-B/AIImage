import {surpriseMePrompts} from '../constants'


export function getRandomPrompt(prompt){
        const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
         const randomPromts = surpriseMePrompts[randomIndex];

         if(randomPromts === prompt)return getRandomPrompt(prompt);

         return randomPromts;
}