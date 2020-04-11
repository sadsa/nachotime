import React from "react";
import { ReactMic, ReactMicProps, ReactMicStopEvent } from "react-mic";
import { Button, Icon } from "semantic-ui-react";

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
        <div className="record">
            <ReactMic
                record={record}
                className="sound-wave"
                strokeColor="green"
                backgroundColor="#ffffff"
                onStop={handleStop}
            />
            {!record ? (
                <Button onClick={startRecording} type="button" icon>
                    <Icon name="play" /> Start
                </Button>
            ) : (
                <Button onClick={stopRecording} type="button" icon>
                    <Icon name="stop" /> Stop
                </Button>
            )}
            <style jsx>{`
                .record {
                    width: 100%;
                    overflow-x: hidden;
                }
                .sound-wave {
                    display: block;
                }
            `}</style>
        </div>
    );
};

export default AudioRecordField;
