import {Box, Heading, Tag} from '@chakra-ui/react';

import React from 'react'

export default function Topics({transcript}) {
  return (
    <div>
        <Heading size="md" color="teal" margin="2">Topics detected:</Heading>
        <Box p='3'>
            {Object.keys(transcript.iab_categories_result.summary).filter(
                topic=> transcript.iab_categories_result.summary[topic] >0.8
            ).map(topic=>(
                <Tag size="md" colorScheme="teal" variant="solid" borderRadius="full" margin='2'>
                    {topic.split('>').pop()}
                </Tag>
            ))}
        </Box>
    </div>
  )
}
