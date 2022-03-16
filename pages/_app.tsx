import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import Fonts from '@/components/fonts';

const theme = extendTheme({
  fonts: {
    heading: 'system-ui,sans-serif,CEYY',
    body: 'system-ui,sans-serif,CEYY',
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
