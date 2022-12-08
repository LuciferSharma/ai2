import {Text, Box, Tooltip} from '@chakra-ui/react';

export default function Parts({text, timestamp}) {
  return <Box margin="2" bg='gray.30' border='1px' borderColor='gray.700'>
    <Text alignContent="center">{text}</Text>
    <Text color="yellow">{parseInt((timestamp[0]/1000)/60) + ":" +parseInt((timestamp[0]/1000)%60) + " - "+ parseInt((timestamp[1]/1000)/60) +":"+ parseInt((timestamp[1]/1000)%60)}</Text>
    
  </Box>
}
