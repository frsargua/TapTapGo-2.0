import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextField from "@mui/material/TextField";
import { Card, CardContent, Grid } from "@mui/material";
import { FunctionComponent } from "react";

interface FormThreeProps {
  changeNewEventDescription: (value: any) => void;
  newEvent: {
    eventName: string;
    date: Date;
    price: string;
    ageGroup: string;
    description: EditorState;
    maxAttendees: string;
  };
}

export const FormThree: FunctionComponent<FormThreeProps> = (props) => {
  let { changeNewEventDescription, newEvent } = props;
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  function handleChange(value) {
    setEditorState(value);
  }
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2} component="form">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Editor
                editorStyle={{ height: "300px", width: "100%" }}
                editorState={newEvent.description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={changeNewEventDescription}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
