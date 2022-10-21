import {Text, Progress} from '@chakra-ui/react';

export default function Status({isLoading, status}) {
  return (
    <div>
        <Text>
            {isLoading 
            ? `Loading...${status || 'uploading'}...`
            : 'Upload your file'}
        </Text>
        <Progress
        size="sm"
        width={500}
        isIndeterminate={isLoading}
        colorScheme="purple"
        />
    </div>
  )
}

