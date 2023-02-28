import { useContext, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from "html-react-parser";
import { Card, CardContent, Grid } from "@mui/material";
import { FunctionComponent } from "react";
import draftToHtml from "draftjs-to-html";
import { Dayjs } from "dayjs";
import { CreateEventContext } from "../../contexts/CreateEventContext";

interface FormFourProps {}

export const FormFour: FunctionComponent<FormFourProps> = () => {
  let { formFour, changeNewEventDescription } = useContext(CreateEventContext);

  const blocksFromHTML = convertFromHTML(formFour.description);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );

  function handleChange(value: EditorState) {
    setEditorState(value);
    changeNewEventDescription(
      draftToHtml(convertToRaw(value.getCurrentContent()))
    );
  }

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2} component="form">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Editor
                editorStyle={{ height: "300px", width: "100%" }}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleChange}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
