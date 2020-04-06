import React from "react";
import { ReactMic, ReactMicStopEvent } from "react-mic";
import { Button } from "semantic-ui-react";

const AudioRecordField = () => {
    const [record, setRecord] = React.useState(false);
    const startRecording = () => setRecord(true);

    const stopRecording = () => setRecord(false);

    const onData = (recordedBlob: Blob) => {
        console.log("chunk of real-time data is: ", recordedBlob);
    };

    const onStop = (event: ReactMicStopEvent) => {
        console.log("recordedBlob is: ", event.blob);
    };
    return (
        <div>
            <ReactMic
                record={record}
                className="sound-wave"
                onStop={onStop}
                onData={onData}
                strokeColor="#000000"
                backgroundColor="#FF4081"
            />
            <Button onClick={startRecording} type="button">
                Start
            </Button>
            <Button onClick={stopRecording} type="button">
                Stop
            </Button>
        </div>
    );
};

export default AudioRecordField;
