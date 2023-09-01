import MUIRichTextEditor from "mui-rte";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import Card from "@mui/material/Card";

export default function Description(props) {

  const myTheme = createTheme({
    // Set up your custom MUI theme here
  });

  return (
    <>
      <Card className="description">
        <ThemeProvider theme={myTheme}>
          <MUIRichTextEditor
            label="Blaster description..."
            toolbar={false}
            readOnly={true}
            defaultValue={props.descText}
            controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "numberList", "bulletList", "quote", "code", "clear"]}
          />
        </ThemeProvider>
      </Card>
    </>
  );
}