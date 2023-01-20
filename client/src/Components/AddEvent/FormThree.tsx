import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from "html-react-parser";
import { Card, CardContent, Grid } from "@mui/material";
import { FunctionComponent } from "react";
import draftToHtml from "draftjs-to-html";
import { Dayjs } from "dayjs";

interface FormThreeProps {
  changeNewEventDescription: (value: any) => void;
  newEvent: {
    eventName: string;
    date: Dayjs;
    price: string;
    ageGroup: string;
    description: string;
    maxAttendees: string;
  };
}

export const FormThree: FunctionComponent<FormThreeProps> = (props) => {
  let { changeNewEventDescription, newEvent } = props;

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  function handleChange(value: EditorState) {
    setEditorState(value);
    changeNewEventDescription(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
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
          <div>{parse(newEvent.description)}</div>
        </Grid>
      </Grid>
    </>
  );
};
