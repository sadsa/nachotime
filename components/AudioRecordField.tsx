import React from "react";
import { ReactMic, ReactMicProps, ReactMicStopEvent } from "react-mic";
import { Button } from "semantic-ui-react";

interface IAudioRecordProps extends ReactMicProps {
    onChange(audioBlob: Blob): void;
}

function useAudioRecordField() {
    const [record, setRecord] = React.useState(false);

    const startRecording = React.useCallback(() => setRecord(true), []);

    const stopRecording = React.useCallback(() => setRecord(false), []);

    return { record, startRecording, stopRecording };
}

const AudioRecordField: React.FC<IAudioRecordProps> = (props) => {
    const { record, startRecording, stopRecording } = useAudioRecordField();

    const handleStop = (event: ReactMicStopEvent) => {
        props.onChange(event.blob);
    };

    return (
        <div>
            <ReactMic
                record={record}
                className="sound-wave"
                strokeColor="#000000"
                backgroundColor="#FF4081"
                onStop={handleStop}
            />
            {!record ? (
                <Button onClick={startRecording} type="button">
                    Start
                </Button>
            ) : (
                <Button onClick={stopRecording} type="button">
                    Stop
                </Button>
            )}
        </div>
    );
};

export default AudioRecordField;
