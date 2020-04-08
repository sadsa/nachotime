import React from "react";
import { ReactMic, ReactMicProps, ReactMicStopEvent } from "react-mic";
import { Button } from "semantic-ui-react";
import AudioPlayer from "react-h5-audio-player";

interface IAudioRecordProps extends ReactMicProps {
    onChange(blobUrl: string): void;
}

function useAudioRecordField() {
    const [state, setState] = React.useState({
        record: false,
        playbackUrl: "",
    });

    const startRecording = React.useCallback(
        () => setState((state) => ({ ...state, record: true })),
        []
    );

    const stopRecording = React.useCallback(
        () =>
            setState((state) => ({
                ...state,
                record: false,
            })),
        []
    );

    const saveRecording = React.useCallback((playbackUrl: string) => {
        setState((state) => ({
            ...state,
            record: false,
            playbackUrl,
        }));
    }, []);

    return { state, startRecording, stopRecording, saveRecording };
}

const AudioRecordField: React.FC<IAudioRecordProps> = (props) => {
    const {
        state: { record, playbackUrl },
        startRecording,
        stopRecording,
        saveRecording,
    } = useAudioRecordField();

    const handleStop = (event: ReactMicStopEvent) => {
        const playbackUrl = URL.createObjectURL(event.blob);
        saveRecording(playbackUrl);
        props.onChange(playbackUrl);
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
            {playbackUrl ? (
                <AudioPlayer
                    src={playbackUrl}
                    autoPlay={false}
                    autoPlayAfterSrcChange={false}
                />
            ) : undefined}
        </div>
    );
};

export default AudioRecordField;
