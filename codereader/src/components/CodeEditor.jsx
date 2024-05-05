import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import '../App.css'
import Noteitem from "./Noteitem";

const CodeEditor = (props) => {
// console.log("hiihii");


  const editorRef = useRef();
  const [value, setValue] = useState("");
const {description}=props;

  const [language, setLanguage] = useState("java");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };
  const onChange=(value)=>{
    setValue(description);

  }

  return (
    <Box className="editorbox">
      <HStack spacing={4} >
        <Box >
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            // height="75vh"
            // width="100vh"
            
            className="editor"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={description} 
            onChange={onChange}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};
export default CodeEditor;
