import React from "react";
import { ReactMic, ReactMicProps, ReactMicStopEvent } from "react-mic";
import { Button, Icon } from "semantic-ui-react";

interface IAudioRecordProps extends ReactMicProps {
    onChange(audioBlob: Blob): void;
}

function useAudioRecordField() {
    const [recording, setRecord] = React.useState(false);

    const toggleRecording = React.useCallback(() => setRecord(!recording), [recording]);

    return { recording, toggleRecording };
}

const AudioRecordField: React.FC<IAudioRecordProps> = (props) => {
    const { recording, toggleRecording } = useAudioRecordField();

    const handleStop = (event: ReactMicStopEvent) => {
        props.onChange(event.blob);
    };

    return (
        <div className="record">
            <ReactMic
                record={recording}
                className="sound-wave"
                strokeColor="green"
                backgroundColor="#ffffff"
                onStop={handleStop}
            />
            <Button
                onClick={toggleRecording}
                type="button"
                icon={recording ? "stop" : "microphone"}
                circular
                fluid
                color={recording ? "red" : undefined}
                size="massive"
            />
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
