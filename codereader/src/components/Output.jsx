import { useState } from "react";
import { Box, Button, Text, background, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { color } from "framer-motion";
import '../App.css'

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="outputbg"> 
    <Box  className="outputbox">
      <div className="runcode"><Text mb={2} fontSize="lg"  style={{color:"white", fontSize:"20px" ,top:"5%",}}>
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="red"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      </div>
      <Box
      // className="outputbox"/
        // height="75vh"
        p={2}
        color={isError ? "red" : "black"}
        border="1px solid"
        // borderRadius={4}
        theme="vs-dark"
        borderColor={isError ? "white" : "white"}
        bg="153448"
        width= "100vh"
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
    // </div>
  );
};
export default Output;
