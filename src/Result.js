 import React from 'react'
 import {Text, } from '@chakra-ui/react';
 import Parts from './Parts';
 import Topics from './Topics';

 export default function Result({transcript}){
    console.log(transcript);
   return (
     <div>
        <Text>{transcript.iab_categories_result.results.map((result) => {
            return <Parts text={result.text} timestamp={[result.start,result.end]} />
        })}</Text>
        <Topics transcript={transcript}/>
     </div>
   )
 }
 
